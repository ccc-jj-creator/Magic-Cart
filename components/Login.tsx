import React from 'react';
import FeatureCard from './FeatureCard';
import { DollarSignIcon, ZapIcon, FilterIcon, WhopIcon } from './icons';

const features = [
  {
    icon: <DollarSignIcon />,
    title: 'Whop-Native Upsells & Bundles',
    description: 'Implement one-click upsells, down-sells, and product bundles directly within the Whop checkout flow to maximize average order value.'
  },
  {
    icon: <ZapIcon />,
    title: 'Behavior-Driven Automation',
    description: 'Create automated marketing sequences based on user behavior, triggering emails, Discord messages, or special offers automatically.'
  },
  {
    icon: <FilterIcon />,
    title: 'High-Conversion Funnel Blueprints',
    description: 'Leverage proven funnel strategies from top platforms, all optimized and pre-configured for the Whop ecosystem.'
  }
];

interface LoginProps {
    onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 font-sans antialiased">
            <main className="container mx-auto px-4 py-8 md:py-16">
                 <header className="text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-600">
                        Magic Cart Feature Enhancement Strategy
                    </h1>
                    <p className="mt-4 text-lg text-gray-300 max-w-3xl mx-auto">
                        Integrating high-conversion funnels and automation to redefine digital sales on the Whop platform.
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-12">
                    {features.map((feature, index) => (
                        <FeatureCard
                            key={index}
                            icon={feature.icon}
                            title={feature.title}
                            description={feature.description}
                        />
                    ))}
                </div>

                <div className="my-16 text-center">
                    <button 
                        onClick={onLogin}
                        className="bg-indigo-600 text-white font-bold text-lg px-8 py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 shadow-lg flex items-center gap-3 mx-auto"
                    >
                        <WhopIcon className="h-6 w-6" />
                        Connect with Whop to Get Started
                    </button>
                    <p className="text-xs text-gray-500 mt-3 max-w-sm mx-auto">
                        In a real application, this would redirect you to Whop for secure authentication before granting you access to your dashboard.
                    </p>
                </div>
            </main>
            <footer className="text-center py-6 text-gray-500 text-sm">
                <p>Magic Cart Feature Enhancement Strategy | Powered by Gemini</p>
            </footer>
        </div>
    );
};

export default Login;