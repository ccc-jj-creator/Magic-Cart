import React from 'react';
import IntegrationCard from './IntegrationCard';
import { WhopIcon, DiscordIcon, ZapierIcon, RetellAIIcon } from './icons';

const integrations = [
    {
        name: 'Whop',
        description: 'The core integration. Connect your Whop account to sync products and enable our powerful sales tools.',
        icon: <WhopIcon className="h-10 w-10 text-white" />,
        isPrimary: true,
    },
    {
        name: 'Discord',
        description: 'Integrate with your Discord server to send automated messages, assign roles, and manage your community.',
        icon: <DiscordIcon />,
    },
    {
        name: 'Zapier',
        description: 'Link Magic Cart to thousands of other apps and automate workflows between them with Zapier.',
        icon: <ZapierIcon />,
    },
    {
        name: 'Retell AI',
        description: 'For advanced, low-latency voice conversations, connect your own Retell AI account. You carry the cost, we provide the integration.',
        icon: <RetellAIIcon />,
    }
];

const Integrations: React.FC = () => {
    return (
        <div className="mt-12">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-white">Connect Your Tools</h2>
                <p className="text-gray-400 max-w-2xl mx-auto mt-4">
                    Supercharge your Magic Cart experience by integrating with the platforms you already use and love.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {integrations.map(integration => (
                    <IntegrationCard 
                        key={integration.name}
                        name={integration.name}
                        description={integration.description}
                        icon={integration.icon}
                        isPrimary={integration.isPrimary}
                    />
                ))}
            </div>
        </div>
    );
};

export default Integrations;