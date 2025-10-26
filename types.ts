export interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
}

// FIX: Add SessionStatus type for VoiceAgent component state.
export type SessionStatus = 'idle' | 'connecting' | 'connected' | 'closing' | 'error';

// FIX: Add Transcript interface for VoiceAgent conversation history.
export interface Transcript {
  id: number;
  source: 'user' | 'model';
  text: string;
}
