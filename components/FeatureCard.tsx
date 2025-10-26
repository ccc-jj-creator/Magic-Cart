
import React from 'react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 backdrop-blur-sm transition-all duration-300 hover:border-indigo-500 hover:bg-gray-800">
      <div className="flex items-center justify-center h-12 w-12 rounded-full bg-indigo-600/20 text-indigo-400 mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
};

export default FeatureCard;
