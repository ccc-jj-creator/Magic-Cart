
import React, { useState, useRef, useCallback } from 'react';
import { GoogleGenAI, LiveSession, LiveServerMessage, Modality, Blob as GenAIBlob } from "@google/genai";
import type { SessionStatus, Transcript } from '../types';
import { UserIcon, BotIcon } from './icons';

// --- Knowledge Base & System Instruction ---
const KNOWLEDGE_BASE = `
**Product: Magic Cart**
A comprehensive digital sales platform built on Whop.

**Core Features:**
1.  **Whop-Native Upsells & Bundles:** Allows sellers to create one-click upsells, down-sells, and product bundles within the Whop checkout. This is crucial for increasing Average Order Value (AOV).
2.  **Behavior-Driven Automation:** Sellers can build marketing automation (emails, Discord alerts) triggered by user actions like cart abandonment, product views, or purchases. It's like having a marketing expert working 24/7.
3.  **High-Conversion Funnel Blueprints:** Pre-built, customizable funnel templates inspired by top platforms like ClickFunnels. These guide customers through a planned sales journey, from lead magnet to final purchase.

**Frequently Asked Questions (FAQ):**
- **Q: How does this differ from just selling on Whop?**
  - **A:** Magic Cart adds a powerful layer of marketing automation and conversion optimization tools on top of Whop's core e-commerce functionality, designed to maximize revenue for serious sellers.
- **Q: Is it difficult to set up?**
  - **A:** Not at all. We provide simple blueprints and a user-friendly interface. For more complex setups, our integration specialists can help.
- **Q: What integrations are possible?**
  - **A:** We support key integrations with platforms like Stripe for payments, Discord for community engagement, and Zapier to connect with thousands of other apps.
`;

const SYSTEM_INSTRUCTION = `You are a friendly, knowledgeable, and slightly persuasive AI assistant for Magic Cart. Your primary goal is to answer user questions based on the provided Knowledge Base and then proactively schedule a 15-minute discovery call with a Magic Cart integration specialist.

**Your Persona:** Confident, helpful, and an expert on the Magic Cart platform. You are not just a Q&A bot; you are a consultant.

**Your Task:**
1.  Listen carefully to the user's questions.
2.  Provide concise and accurate answers using the Knowledge Base below.
3.  After answering one or two questions, or if the user shows significant interest, smoothly transition to booking a call.

**Example Transition:** "That's an excellent question. To really dive into how these funnels could be tailored for your specific products, I recommend a quick, free 15-minute chat with one of our integration specialists. They can map out a strategy for you. Would you be open to that?"

**Do not be pushy, but be clear about the value of the call.** Keep your spoken answers clear and relatively short.

---
**KNOWLEDGE BASE:**
${KNOWLEDGE_BASE}
---
`;


// --- Audio Utility Functions ---
function encode(bytes: Uint8Array) {
    let binary = '';
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
}

function decode(base64: string) {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
}

async function decodeAudioData(data: Uint8Array, ctx: AudioContext, sampleRate: number, numChannels: number): Promise<AudioBuffer> {
    const dataInt16 = new Int16Array(data.buffer);
    const frameCount = dataInt16.length / numChannels;
    const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);
    for (let channel = 0; channel < numChannels; channel++) {
        const channelData = buffer.getChannelData(channel);
        for (let i = 0; i < frameCount; i++) {
            channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
        }
    }
    return buffer;
}

function createBlob(data: Float32Array): GenAIBlob {
    const l = data.length;
    const int16 = new Int16Array(l);
    for (let i = 0; i < l; i++) {
        int16[i] = data[i] * 32768;
    }
    return {
        data: encode(new Uint8Array(int16.buffer)),
        mimeType: 'audio/pcm;rate=16000',
    };
}


// --- TranscriptItem Component ---
interface TranscriptItemProps {
    source: 'user' | 'model';
    text: string;
}
const TranscriptItem: React.FC<TranscriptItemProps> = ({ source, text }) => {
    const isUser = source === 'user';
    return (
        <div className={`flex items-start gap-3 my-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
            {!isUser && <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center"><BotIcon className="w-5 h-5 text-white" /></div>}
            <div className={`max-w-md p-3 rounded-lg ${isUser ? 'bg-indigo-600 text-white rounded-br-none' : 'bg-gray-700 text-gray-200 rounded-bl-none'}`}>
                <p className="text-sm">{text}</p>
            </div>
            {isUser && <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center"><UserIcon className="w-5 h-5 text-white" /></div>}
        </div>
    );
};

// --- VoiceAgent Component ---
const VoiceAgent: React.FC = () => {
    const [status, setStatus] = useState<SessionStatus>('idle');
    const [transcripts, setTranscripts] = useState<Transcript[]>([]);
    
    const sessionPromiseRef = useRef<Promise<LiveSession> | null>(null);
    const inputAudioContextRef = useRef<AudioContext | null>(null);
    const outputAudioContextRef = useRef<AudioContext | null>(null);
    const scriptProcessorRef = useRef<ScriptProcessorNode | null>(null);
    const mediaStreamSourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
    const micStreamRef = useRef<MediaStream | null>(null);
    
    const currentInputTranscriptionRef = useRef('');
    const currentOutputTranscriptionRef = useRef('');
    const nextAudioStartTimeRef = useRef(0);
    const audioSourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());

    const cleanup = useCallback(() => {
        scriptProcessorRef.current?.disconnect();
        mediaStreamSourceRef.current?.disconnect();
        micStreamRef.current?.getTracks().forEach(track => track.stop());
        inputAudioContextRef.current?.close();
        outputAudioContextRef.current?.close();

        scriptProcessorRef.current = null;
        mediaStreamSourceRef.current = null;
        micStreamRef.current = null;
        inputAudioContextRef.current = null;
        outputAudioContextRef.current = null;
        sessionPromiseRef.current = null;
    }, []);

    const handleStopSession = useCallback(async () => {
        setStatus('closing');
        if (sessionPromiseRef.current) {
            try {
                const session = await sessionPromiseRef.current;
                session.close();
            } catch (e) {
                console.error("Error closing session:", e);
            }
        }
        cleanup();
        setStatus('idle');
        setTranscripts(prev => [...prev, {id: Date.now(), source: 'model', text: 'Conversation ended.'}]);
    }, [cleanup]);

    const handleStartSession = useCallback(async () => {
        setStatus('connecting');
        setTranscripts([]);
        currentInputTranscriptionRef.current = '';
        currentOutputTranscriptionRef.current = '';

        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            micStreamRef.current = stream;

            outputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
            if (outputAudioContextRef.current.state === 'suspended') {
                 await outputAudioContextRef.current.resume();
            }
            outputAudioContextRef.current.createGain();

            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
            sessionPromiseRef.current = ai.live.connect({
                model: 'gemini-2.5-flash-native-audio-preview-09-2025',
                config: {
                    responseModalities: [Modality.AUDIO],
                    speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } } },
                    systemInstruction: SYSTEM_INSTRUCTION,
                    inputAudioTranscription: {},
                    outputAudioTranscription: {},
                },
                callbacks: {
                    onopen: () => {
                        setStatus('connected');
                        inputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
                        mediaStreamSourceRef.current = inputAudioContextRef.current.createMediaStreamSource(stream);
                        scriptProcessorRef.current = inputAudioContextRef.current.createScriptProcessor(4096, 1, 1);
                        
                        scriptProcessorRef.current.onaudioprocess = (audioProcessingEvent) => {
                            const inputData = audioProcessingEvent.inputBuffer.getChannelData(0);
                            const pcmBlob = createBlob(inputData);
                            sessionPromiseRef.current?.then((session) => {
                                session.sendRealtimeInput({ media: pcmBlob });
                            });
                        };
                        
                        mediaStreamSourceRef.current.connect(scriptProcessorRef.current);
                        scriptProcessorRef.current.connect(inputAudioContextRef.current.destination);
                    },
                    onmessage: async (message: LiveServerMessage) => {
                        if (message.serverContent?.inputTranscription) {
                            currentInputTranscriptionRef.current += message.serverContent.inputTranscription.text;
                        }
                        if (message.serverContent?.outputTranscription) {
                            currentOutputTranscriptionRef.current += message.serverContent.outputTranscription.text;
                        }
                        if (message.serverContent?.turnComplete) {
                            const userInput = currentInputTranscriptionRef.current.trim();
                            const modelOutput = currentOutputTranscriptionRef.current.trim();
                            
                            setTranscripts(prev => {
                                let newTranscripts = [...prev];
                                if (userInput) newTranscripts.push({ id: Date.now(), source: 'user', text: userInput });
                                if (modelOutput) newTranscripts.push({ id: Date.now() + 1, source: 'model', text: modelOutput });
                                return newTranscripts;
                            });

                            currentInputTranscriptionRef.current = '';
                            currentOutputTranscriptionRef.current = '';
                        }
                        if (message.serverContent?.interrupted) {
                            for (const source of audioSourcesRef.current.values()) {
                                source.stop();
                                audioSourcesRef.current.delete(source);
                            }
                            nextAudioStartTimeRef.current = 0;
                        }

                        const audioData = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
                        if (audioData && outputAudioContextRef.current) {
                            nextAudioStartTimeRef.current = Math.max(nextAudioStartTimeRef.current, outputAudioContextRef.current.currentTime);
                            const audioBuffer = await decodeAudioData(decode(audioData), outputAudioContextRef.current, 24000, 1);
                            const source = outputAudioContextRef.current.createBufferSource();
                            source.buffer = audioBuffer;
                            source.connect(outputAudioContextRef.current.destination);
                            
                            source.addEventListener('ended', () => { audioSourcesRef.current.delete(source); });
                            
                            source.start(nextAudioStartTimeRef.current);
                            nextAudioStartTimeRef.current += audioBuffer.duration;
                            audioSourcesRef.current.add(source);
                        }
                    },
                    onclose: () => {
                        cleanup();
                        setStatus('idle');
                    },
                    onerror: (e) => {
                        console.error("Session error:", e);
                        setStatus('error');
                        cleanup();
                    },
                },
            });

        } catch (error) {
            console.error("Failed to start session:", error);
            setStatus('error');
            cleanup();
        }
    }, [cleanup]);
    
    const isConversationActive = status === 'connected' || status === 'connecting';

    const getButtonContent = () => {
        switch (status) {
            case 'idle':
            case 'error':
                return 'Start Conversation';
            case 'connecting':
                return 'Connecting...';
            case 'connected':
                return 'Stop Conversation';
            case 'closing':
                return 'Stopping...';
        }
    };

    const getStatusIndicator = () => {
        switch (status) {
            case 'connected':
                return <><span className="relative flex h-3 w-3"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span></span> Connected</>;
            case 'connecting':
                 return <><span className="relative flex h-3 w-3"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-500"></span></span> Connecting</>;
            case 'error':
                 return <><span className="relative flex h-3 w-3"><span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span></span> Error</>;
            default:
                 return <><span className="relative flex h-3 w-3"><span className="relative inline-flex rounded-full h-3 w-3 bg-gray-500"></span></span> Idle</>;
        }
    }

    return (
        <div className="max-w-3xl mx-auto bg-gray-800/50 border border-gray-700 rounded-lg shadow-2xl p-4 sm:p-6 backdrop-blur-sm">
            <div className="flex flex-col sm:flex-row items-center justify-between mb-4 gap-4">
                <div className="flex items-center gap-3 text-sm text-gray-300">
                    {getStatusIndicator()}
                </div>
                 <button 
                    onClick={isConversationActive ? handleStopSession : handleStartSession}
                    disabled={status === 'connecting' || status === 'closing'}
                    className={`px-6 py-3 font-bold rounded-lg transition-all duration-300 text-white flex items-center gap-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed ${isConversationActive ? 'bg-red-600 hover:bg-red-700' : 'bg-indigo-600 hover:bg-indigo-700'}`}
                >
                    {getButtonContent()}
                </button>
            </div>
            <div className="h-80 bg-gray-900/70 rounded-md p-4 overflow-y-auto flex flex-col-reverse">
                <div className="flex flex-col">
                    {transcripts.length === 0 && status !== 'error' && (
                        <div className="flex flex-col items-center justify-center h-full text-gray-500">
                             <p>{status === 'connecting' ? 'Connecting to voice agent...' : 'Conversation transcript will appear here...'}</p>
                        </div>
                    )}
                     {status === 'error' && (
                        <div className="flex flex-col items-center justify-center h-full text-red-400">
                             <p>An error occurred. Please try again.</p>
                        </div>
                    )}
                    {transcripts.map((t) => (
                        <TranscriptItem key={t.id} source={t.source} text={t.text} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default VoiceAgent;