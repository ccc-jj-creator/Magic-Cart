import React, { useState } from 'react';
import type { Product, FunnelStep } from '../types';
import {
    SettingsIcon, CreditCardIcon, ArrowUpIcon, BarChartIcon,
    ShieldCheckIcon, LinkIcon, ArrowLeftIcon, ZapIcon, ExternalLinkIcon,
    EyeIcon, TrashIcon, CornerDownRightIcon
} from './icons';
import LivePreviewModal from './LivePreviewModal';
import ProductSelectionModal from './ProductSelectionModal';


interface ProductSettingsProps {
    product: Product;
    allProducts: Product[];
    onBack: () => void;
}

type SettingsTab = 'general' | 'checkout' | 'offers' | 'automations' | 'analytics' | 'integrations' | 'team';

const ProductSettings: React.FC<ProductSettingsProps> = ({ product, allProducts, onBack }) => {
    const [activeTab, setActiveTab] = useState<SettingsTab>('offers');
    const [isPreviewing, setIsPreviewing] = useState(false);
    
    const [orderBump, setOrderBump] = useState<Product | null>(null);
    const [funnelSteps, setFunnelSteps] = useState<FunnelStep[]>([]);

    const [isSelectingProduct, setIsSelectingProduct] = useState(false);
    const [selectionType, setSelectionType] = useState<{type: 'orderBump' | 'upsell' | 'downsell', stepId?: string} | null>(null);

    const handleOpenSelector = (type: 'orderBump' | 'upsell' | 'downsell', stepId?: string) => {
        setSelectionType({ type, stepId });
        setIsSelectingProduct(true);
    };
    
    const handleProductSelected = (selectedProduct: Product) => {
        if (!selectionType) return;

        if (selectionType.type === 'orderBump') {
            setOrderBump(selectedProduct);
        } else if (selectionType.type === 'upsell') {
            const newStep: FunnelStep = {
                id: crypto.randomUUID(),
                upsellProduct: selectedProduct,
                downsellProduct: null,
            };
            setFunnelSteps(prev => [...prev, newStep]);
        } else if (selectionType.type === 'downsell' && selectionType.stepId) {
            setFunnelSteps(prev => prev.map(step => 
                step.id === selectionType.stepId
                    ? { ...step, downsellProduct: selectedProduct }
                    : step
            ));
        }
        
        setIsSelectingProduct(false);
        setSelectionType(null);
    };

    const handleRemoveOrderBump = () => setOrderBump(null);
    const handleRemoveStep = (stepId: string) => {
        setFunnelSteps(prev => prev.filter(step => step.id !== stepId));
    };
    const handleRemoveDownsell = (stepId: string) => {
        setFunnelSteps(prev => prev.map(step => 
            step.id === stepId
                ? { ...step, downsellProduct: null }
                : step
        ));
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'general': return <GeneralSettings />;
            case 'checkout': return <CheckoutDesignSettings onPreview={() => setIsPreviewing(true)} />;
            case 'offers': return (
                <OffersSettings 
                    orderBump={orderBump}
                    funnelSteps={funnelSteps}
                    onAddOrderBump={() => handleOpenSelector('orderBump')}
                    onRemoveOrderBump={handleRemoveOrderBump}
                    onAddUpsell={() => handleOpenSelector('upsell')}
                    onAddDownsell={(stepId) => handleOpenSelector('downsell', stepId)}
                    onRemoveStep={handleRemoveStep}
                    onRemoveDownsell={handleRemoveDownsell}
                    onPreview={() => setIsPreviewing(true)} 
                />
            );
            case 'automations': return <AutomationsSettings />;
            case 'analytics': return <FunnelAnalyticsSettings />;
            case 'integrations': return <IntegrationSettings />;
            case 'team': return <TeamSettings />;
            default: return (
                 <OffersSettings 
                    orderBump={orderBump}
                    funnelSteps={funnelSteps}
                    onAddOrderBump={() => handleOpenSelector('orderBump')}
                    onRemoveOrderBump={handleRemoveOrderBump}
                    onAddUpsell={() => handleOpenSelector('upsell')}
                    onAddDownsell={(stepId) => handleOpenSelector('downsell', stepId)}
                    onRemoveStep={handleRemoveStep}
                    onRemoveDownsell={handleRemoveDownsell}
                    onPreview={() => setIsPreviewing(true)} 
                />
            );
        }
    };

    return (
        <div>
            {isPreviewing && (
                <LivePreviewModal 
                    mainProduct={product}
                    orderBumpProduct={orderBump}
                    funnelSteps={funnelSteps}
                    onClose={() => setIsPreviewing(false)}
                />
            )}
            {isSelectingProduct && (
                <ProductSelectionModal
                    isOpen={isSelectingProduct}
                    onClose={() => setIsSelectingProduct(false)}
                    onProductSelect={handleProductSelected}
                    products={allProducts}
                    currentProductId={product.id}
                    title={selectionType?.type === 'orderBump' ? 'Select an Order Bump' : selectionType?.type === 'downsell' ? 'Select a Downsell Product' : 'Select an Upsell Product'}
                />
            )}
            <div className="flex items-center mb-8">
                <button onClick={onBack} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mr-4 bg-gray-800/50 hover:bg-gray-700/50 px-3 py-2 rounded-md text-sm">
                    <ArrowLeftIcon />
                    Back to Dashboard
                </button>
            </div>
            <header className="text-center mb-12">
                 <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-600">
                    {product.name}
                </h1>
                <p className="mt-4 text-lg text-gray-300 max-w-3xl mx-auto">
                    Manage high-conversion funnels and automations for this product.
                </p>
            </header>

            <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
                <aside className="md:w-1/4 lg:w-1/5">
                    <nav className="flex flex-col space-y-2">
                        <SettingsSidebarButton
                            label="Offers"
                            icon={<ArrowUpIcon />}
                            isActive={activeTab === 'offers'}
                            onClick={() => setActiveTab('offers')}
                        />
                         <SettingsSidebarButton
                            label="Checkout Design"
                            icon={<CreditCardIcon />}
                            isActive={activeTab === 'checkout'}
                            onClick={() => setActiveTab('checkout')}
                        />
                        <SettingsSidebarButton
                            label="Automations"
                            icon={<ZapIcon />}
                            isActive={activeTab === 'automations'}
                            onClick={() => setActiveTab('automations')}
                        />
                        <SettingsSidebarButton
                            label="Funnel Analytics"
                            icon={<BarChartIcon />}
                            isActive={activeTab === 'analytics'}
                            onClick={() => setActiveTab('analytics')}
                        />
                        <SettingsSidebarButton
                            label="Integrations"
                            icon={<LinkIcon />}
                            isActive={activeTab === 'integrations'}
                            onClick={() => setActiveTab('integrations')}
                        />
                        <SettingsSidebarButton
                            label="Team"
                            icon={<ShieldCheckIcon />}
                            isActive={activeTab === 'team'}
                            onClick={() => setActiveTab('team')}
                        />
                         <SettingsSidebarButton
                            label="General"
                            icon={<SettingsIcon />}
                            isActive={activeTab === 'general'}
                            onClick={() => setActiveTab('general')}
                        />
                    </nav>
                </aside>
                <main className="flex-1">
                    {renderContent()}
                </main>
            </div>
        </div>
    );
};

// --- Reusable Components ---
const SettingsSidebarButton: React.FC<{ label: string; icon: React.ReactNode; isActive: boolean; onClick: () => void }> = ({ label, icon, isActive, onClick }) => (
    <button onClick={onClick} className={`group flex items-center gap-3 w-full px-3 py-2.5 rounded-md text-left text-sm font-medium transition-colors ${isActive ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-800/60 hover:text-white'}`}>
        {icon}
        <span>{label}</span>
    </button>
);

const SettingsCard: React.FC<{ title: string; description: string; children: React.ReactNode, actionButton?: React.ReactNode }> = ({ title, description, children, actionButton }) => (
    <div className="bg-gray-800/50 border border-gray-700 rounded-lg mb-8">
        <div className="p-6 border-b border-gray-700 flex justify-between items-start">
            <div>
                <h3 className="text-xl font-bold text-white">{title}</h3>
                <p className="text-gray-400 mt-1">{description}</p>
            </div>
            {actionButton && <div className="ml-4 flex-shrink-0">{actionButton}</div>}
        </div>
        <div className="p-6">
            {children}
        </div>
    </div>
);


const InputField: React.FC<{ label: string; type?: string; placeholder?: string; defaultValue?: string | number, readOnly?: boolean }> = ({ label, type = 'text', placeholder, defaultValue, readOnly = false }) => (
    <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">{label}</label>
        <input 
          type={type} 
          placeholder={placeholder} 
          defaultValue={defaultValue} 
          readOnly={readOnly}
          className={`w-full bg-gray-900/50 text-white placeholder-gray-500 border border-gray-600 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition ${readOnly ? 'opacity-70 cursor-not-allowed' : ''}`} 
        />
    </div>
);

const ToggleSwitch: React.FC<{ label?: string; enabled: boolean; setEnabled: (e: boolean) => void }> = ({ label, enabled, setEnabled }) => (
    <div className="flex items-center justify-between">
        {label && <span className="text-sm font-medium text-gray-300">{label}</span>}
        <button
            onClick={() => setEnabled(!enabled)}
            className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-300 ${enabled ? 'bg-indigo-600' : 'bg-gray-600'}`}
        >
            <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-300 ${enabled ? 'translate-x-6' : 'translate-x-1'}`} />
        </button>
    </div>
);

const LivePreviewButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
    <button onClick={onClick} className="flex items-center gap-2 text-sm font-semibold text-white bg-gray-700/50 hover:bg-gray-700 px-4 py-2 rounded-md transition-colors">
        <EyeIcon />
        <span>Live Preview</span>
    </button>
);


// --- Settings Content Components ---

const GeneralSettings: React.FC = () => (
    <SettingsCard title="Product Details" description="Basic product information is synced from Whop and cannot be edited here. This provides context for the funnels you are building.">
        <div className="space-y-6">
            <InputField label="Product Name" defaultValue="Satoshi's Secret Algo" readOnly />
            <InputField label="Price" type="number" defaultValue="99.99" readOnly />
            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                <textarea readOnly rows={4} className="w-full bg-gray-900/50 text-white placeholder-gray-500 border border-gray-600 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition opacity-70 cursor-not-allowed" defaultValue="The leading algorithm for crypto market analysis..."></textarea>
            </div>
        </div>
    </SettingsCard>
);

const CheckoutDesignSettings: React.FC<{ onPreview: () => void }> = ({ onPreview }) => (
    <SettingsCard 
        title="Checkout Design" 
        description="Control the final step of the sale. Choose a high-conversion template to reduce friction and build trust."
        actionButton={<LivePreviewButton onClick={onPreview} />}
    >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* Standard Template Preview */}
            <div className="text-center">
                <div className="bg-gray-900/70 p-3 rounded-lg border-2 border-indigo-500 cursor-pointer aspect-[3/4] flex flex-col">
                    <div className="flex-grow space-y-2">
                         <div className="h-3 bg-gray-700 rounded-sm w-full"></div>
                         <div className="h-10 bg-gray-600 rounded"></div>
                         <div className="h-3 bg-gray-700 rounded-sm w-3/4"></div>
                         <div className="h-5 bg-gray-700 rounded w-full mt-4"></div>
                         <div className="h-5 bg-gray-700 rounded w-full"></div>
                    </div>
                    <div className="h-6 bg-indigo-500 rounded mt-4"></div>
                </div>
                <p className="mt-2 text-sm font-bold text-white">Standard Template</p>
                <p className="text-xs text-indigo-400">Selected</p>
            </div>
            {/* Popup Modal Preview */}
             <div className="text-center">
                <div className="bg-gray-900/70 p-3 rounded-lg border border-gray-600 hover:border-indigo-500 cursor-pointer aspect-[3/4] flex items-center justify-center relative overflow-hidden">
                    {/* Background page representation */}
                    <div className="absolute inset-0 bg-gray-800/50 blur-[2px] z-0"></div>
                     <div className="w-4/5 h-3/5 bg-gray-700 rounded-md shadow-lg z-10 flex flex-col p-2 space-y-2">
                        <div className="h-8 bg-gray-600 rounded"></div>
                        <div className="h-4 bg-gray-600 rounded w-full"></div>
                        <div className="h-4 bg-gray-600 rounded w-full"></div>
                        <div className="h-5 bg-indigo-600 rounded mt-auto"></div>
                    </div>
                </div>
                <p className="mt-2 text-sm font-medium text-gray-300">Popup Modal</p>
            </div>
            {/* Embedded Form Preview */}
            <div className="text-center">
                <div className="bg-gray-900/70 p-3 rounded-lg border border-gray-600 hover:border-indigo-500 cursor-pointer aspect-[3/4] flex flex-col">
                    {/* Surrounding page content */}
                    <div className="h-2 bg-gray-700 rounded w-3/4 mb-1"></div>
                    <div className="h-2 bg-gray-700 rounded w-1/2 mb-3"></div>
                    {/* The embedded form */}
                    <div className="bg-gray-800 p-2 rounded-md border border-gray-700 flex-grow space-y-2">
                        <div className="h-8 bg-gray-600 rounded"></div>
                        <div className="h-4 bg-gray-700 rounded w-full"></div>
                        <div className="h-5 bg-indigo-600 rounded mt-auto"></div>
                    </div>
                    {/* More surrounding content */}
                    <div className="h-2 bg-gray-700 rounded w-3/4 mt-3"></div>
                    <div className="h-2 bg-gray-700 rounded w-full mt-1"></div>
                </div>
                <p className="mt-2 text-sm font-medium text-gray-300">Embedded Form</p>
            </div>
        </div>
        <div className="mt-6">
            <InputField label="Custom Accent Color" type="color" defaultValue="#6366F1" />
            <p className="text-xs text-gray-500 mt-2">This branding applies to all Magic Cart checkout pages and offers for this product.</p>
        </div>
    </SettingsCard>
);


interface OffersSettingsProps {
    orderBump: Product | null;
    funnelSteps: FunnelStep[];
    onAddOrderBump: () => void;
    onRemoveOrderBump: () => void;
    onAddUpsell: () => void;
    onAddDownsell: (stepId: string) => void;
    onRemoveStep: (stepId: string) => void;
    onRemoveDownsell: (stepId: string) => void;
    onPreview: () => void;
}

const OffersSettings: React.FC<OffersSettingsProps> = ({ orderBump, funnelSteps, onAddOrderBump, onRemoveOrderBump, onAddUpsell, onAddDownsell, onRemoveStep, onRemoveDownsell, onPreview }) => (
    <SettingsCard 
        title="The AOV Engine: Bumps, Upsells & Downsells" 
        description="Increase average order value with one-click, post-purchase offers. This is the core revenue-multiplying feature of Magic Cart."
        actionButton={<LivePreviewButton onClick={onPreview} />}
    >
        <div className="space-y-6">
            <div>
                <h4 className="font-bold text-white">Order Bump</h4>
                <p className="text-sm text-gray-400">An irresistible offer presented directly on the checkout page.</p>
                {orderBump ? (
                    <OfferCard 
                        offer={orderBump} 
                        type="Order Bump" 
                        onRemove={() => onRemoveOrderBump()} 
                    />
                ) : (
                    <button onClick={onAddOrderBump} className="mt-2 text-sm text-indigo-400 hover:text-indigo-300 font-semibold">+ Add Order Bump</button>
                )}
            </div>
             <div className="border-t border-gray-700 pt-6">
                <h4 className="font-bold text-white">One-Click Post-Purchase Flow</h4>
                <p className="text-sm text-gray-400">A sequence of offers presented after the initial purchase is complete.</p>
                 <div className="space-y-6 mt-4">
                    {funnelSteps.map((step, index) => (
                        <div key={step.id} className="bg-gray-900/30 p-4 rounded-lg border border-gray-700/50">
                            <OfferCard 
                                offer={step.upsellProduct} 
                                type={`Upsell #${index + 1}`} 
                                onRemove={() => onRemoveStep(step.id)} 
                            />
                            <div className="pl-8 mt-4">
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <CornerDownRightIcon className="h-5 w-5" />
                                    <span>If customer rejects upsell...</span>
                                </div>
                                <div className="pl-6 mt-2">
                                    {step.downsellProduct ? (
                                        <OfferCard
                                            offer={step.downsellProduct}
                                            type="Downsell Offer"
                                            onRemove={() => onRemoveDownsell(step.id)}
                                        />
                                    ) : (
                                        <button onClick={() => onAddDownsell(step.id)} className="text-sm text-indigo-400 hover:text-indigo-300 font-semibold">+ Add Downsell</button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="border-t border-gray-700 pt-4 mt-6">
                    <button onClick={onAddUpsell} className="text-sm text-indigo-400 hover:text-indigo-300 font-semibold">+ Add Funnel Step (Upsell)</button>
                </div>
            </div>
        </div>
    </SettingsCard>
);

const OfferCard: React.FC<{ offer: Product; type: string; onRemove: () => void; }> = ({ offer, type, onRemove }) => {
    const [isEnabled, setIsEnabled] = useState(true);

    return (
        <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
                <img src={offer.imageUrl} alt={offer.name} className="w-16 h-16 rounded-md object-cover bg-gray-700" />
                <div>
                    <span className="text-xs font-semibold uppercase text-indigo-400 tracking-wider">{type}</span>
                    <p className="font-bold text-white">{offer.name}</p>
                    <p className="text-sm text-gray-400 font-mono">${offer.price.toFixed(2)}</p>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <ToggleSwitch enabled={isEnabled} setEnabled={setIsEnabled} />
                <button onClick={onRemove} className="text-gray-500 hover:text-red-400 transition-colors p-1" aria-label="Remove offer">
                    <TrashIcon />
                </button>
            </div>
        </div>
    );
};


const AutomationsSettings: React.FC = () => (
    <SettingsCard title="The Safety Net: Cart Abandonment & Recovery" description="Automatically follow up with visitors who begin checkout but don't complete their purchase. This is an effortless way to recover lost revenue.">
        <div className="space-y-6">
            <ToggleSwitch label="Enable Cart Abandonment Automations" enabled={true} setEnabled={() => {}} />
            <InputField label="Send recovery email after (minutes)" type="number" defaultValue="60" />
            <p className="text-sm text-gray-400">You can configure more advanced triggers (e.g., Discord DMs) in the main 'Integrations' tab.</p>
        </div>
    </SettingsCard>
);

const FunnelAnalyticsSettings: React.FC = () => (
     <SettingsCard title="The Proof: Funnel Analytics" description="Isolate the ROI from your funnels. This dashboard tracks the direct revenue lift, conversion rates, and recovered sales generated by Magic Cart.">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="bg-gray-900/50 p-4 rounded-lg">
                <p className="text-sm text-gray-400">AOV Lift</p>
                <p className="text-2xl font-bold text-green-400">+ $28.50</p>
            </div>
            <div className="bg-gray-900/50 p-4 rounded-lg">
                <p className="text-sm text-gray-400">Upsell Take-Rate</p>
                <p className="text-2xl font-bold text-white">18.2%</p>
            </div>
            <div className="bg-gray-900/50 p-4 rounded-lg">
                <p className="text-sm text-gray-400">Recovered Carts</p>
                <p className="text-2xl font-bold text-white">12</p>
            </div>
        </div>
        <div className="mt-6 p-6 bg-gray-900/50 rounded-md border border-gray-700 text-center">
            <BarChartIcon className="h-8 w-8 mx-auto text-gray-500" />
            <p className="mt-2 text-lg font-semibold">Detailed charts and metrics will be displayed here.</p>
            <p className="text-sm text-gray-400">This proves the value of your funnels at a glance.</p>
        </div>
    </SettingsCard>
);


const WebhookInput: React.FC<{
    label: string;
    placeholder: string;
    helpers: { name: string; url: string }[];
}> = ({ label, placeholder, helpers }) => (
    <div>
        <InputField label={label} placeholder={placeholder} />
        <div className="flex items-center gap-4 mt-2">
            <span className="text-xs text-gray-500">Quick links:</span>
            {helpers.map(helper => (
                <a 
                    key={helper.name}
                    href={helper.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 hover:underline"
                >
                    {helper.name}
                    <ExternalLinkIcon className="h-3 w-3" />
                </a>
            ))}
        </div>
    </div>
);

const IntegrationSettings: React.FC = () => (
     <SettingsCard title="Product-Specific Integrations & Webhooks" description="Connect your funnel events to the rest of your stack. When an event happens (like an upsell purchase), we'll send a message to the URLs you provide.">
        <div className="space-y-6">
            <WebhookInput 
                label="Webhook for 'Order Bump Purchased'"
                placeholder="https://yourapi.com/webhook/bump-purchased"
                helpers={[
                    { name: 'Discord', url: 'https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks' },
                    { name: 'Zapier', url: 'https://zapier.com/apps/webhook/integrations' }
                ]}
            />
             <WebhookInput 
                label="Webhook for 'Upsell Purchased'"
                placeholder="https://yourapi.com/webhook/upsell-purchased"
                helpers={[
                     { name: 'Discord', url: 'https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks' },
                    { name: 'Zapier', url: 'https://zapier.com/apps/webhook/integrations' }
                ]}
            />
            <WebhookInput 
                label="Webhook for 'Cart Recovered'"
                placeholder="https://yourapi.com/webhook/cart-recovered"
                helpers={[
                     { name: 'Discord', url: 'https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks' },
                    { name: 'Zapier', url: 'https://zapier.com/apps/webhook/integrations' }
                ]}
            />
        </div>
        <div className="border-t border-gray-700 pt-6 mt-6">
            <h4 className="font-bold text-white">API Access</h4>
            <p className="text-sm text-gray-400">Use the Magic Cart API to build custom integrations for your funnels.</p>
            <button className="mt-2 text-sm text-indigo-400 hover:text-indigo-300">View API Documentation</button>
        </div>
    </SettingsCard>
);

const TeamSettings: React.FC = () => (
    <SettingsCard title="Team Permissions" description="Invite team members and manage their access to this product's funnels without giving them access to your entire Whop account.">
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-grow">
                    <InputField label="Invite Team Member by Email" placeholder="team@example.com" />
                </div>
                <div className="sm:w-1/3">
                    <label className="block text-sm font-medium text-gray-300 mb-2">Role</label>
                    <select className="w-full bg-gray-900/50 text-white border border-gray-600 rounded-md px-3 py-2 text-sm">
                        <option>Viewer (Can see analytics)</option>
                        <option>Editor (Can edit funnels)</option>
                        <option>Admin (Full access)</option>
                    </select>
                </div>
            </div>
            <button className="w-full sm:w-auto px-4 py-2 font-bold rounded-md transition-all duration-200 text-white bg-indigo-600 hover:bg-indigo-700">Send Invite</button>
        </div>
    </SettingsCard>
);

export default ProductSettings;