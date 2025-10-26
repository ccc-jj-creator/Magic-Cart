import React, { useState, useEffect } from 'react';
import { CheckIcon } from './icons';

interface IntegrationCardProps {
    icon: React.ReactNode;
    name: string;
    description: string;
    isPrimary?: boolean;
}

const IntegrationCard: React.FC<IntegrationCardProps> = ({ icon, name, description, isPrimary = false }) => {
    const [apiKey, setApiKey] = useState('');
    const [isConnected, setIsConnected] = useState(isPrimary);
    const [isLoading, setIsLoading] = useState(false);
    
    useEffect(() => {
      // Whop is connected by default in this simulation
      setIsConnected(isPrimary);
    }, [isPrimary]);

    const handleConnect = (e: React.FormEvent) => {
        e.preventDefault();
        if (!apiKey.trim()) return;
        setIsLoading(true);
        setTimeout(() => {
            setIsConnected(true);
            setIsLoading(false);
        }, 1000); // Simulate network request
    };

    return (
        <div className={`bg-gray-800/50 p-6 rounded-lg border backdrop-blur-sm flex flex-col justify-between ${isPrimary ? 'border-indigo-500' : 'border-gray-700'}`}>
            <div>
                <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-lg bg-gray-700/50">
                        {icon}
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white">{name}</h3>
                        <p className="text-gray-400 mt-1 text-sm">{description}</p>
                    </div>
                </div>
            </div>
            <div className="mt-6">
                {isConnected ? (
                     <div className="flex items-center justify-center gap-2 text-center text-green-400 font-semibold bg-green-500/10 border border-green-500/20 px-4 py-2 rounded-md">
                        <CheckIcon />
                        <span>Connected</span>
                    </div>
                ) : (
                    <form onSubmit={handleConnect} className="flex flex-col sm:flex-row items-center gap-3">
                        <input
                            type="text"
                            value={apiKey}
                            onChange={(e) => setApiKey(e.target.value)}
                            placeholder="Enter API Key..."
                            className="flex-grow w-full bg-gray-900/50 text-white placeholder-gray-500 border border-gray-600 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                            aria-label={`${name} API Key`}
                        />
                        <button
                            type="submit"
                            disabled={isLoading || !apiKey.trim()}
                            className="w-full sm:w-auto px-4 py-2 font-bold rounded-md transition-all duration-200 text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                        >
                            {isLoading ? (
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) : 'Connect'}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default IntegrationCard;
