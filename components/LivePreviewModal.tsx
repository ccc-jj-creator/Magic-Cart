import React, { useState, useEffect } from 'react';
import type { Product, FunnelStep } from '../types';
import { XIcon, CheckIcon, ShieldCheckIcon } from './icons';

interface LivePreviewModalProps {
    mainProduct: Product;
    orderBumpProduct: Product | null;
    funnelSteps: FunnelStep[];
    onClose: () => void;
}

type PreviewStep = 'checkout' | 'confirmation' | { stepIndex: number; type: 'upsell' | 'downsell' };

const LivePreviewModal: React.FC<LivePreviewModalProps> = ({ mainProduct, orderBumpProduct, funnelSteps, onClose }) => {
    const [step, setStep] = useState<PreviewStep>('checkout');
    const [isBumpChecked, setIsBumpChecked] = useState(false);
    const [acceptedOffers, setAcceptedOffers] = useState<Product[]>([]);


    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    const total = mainProduct.price + (isBumpChecked && orderBumpProduct ? orderBumpProduct.price : 0);

    const handlePayment = () => {
        const purchased = [mainProduct];
        if (isBumpChecked && orderBumpProduct) {
            purchased.push(orderBumpProduct);
        }
        setAcceptedOffers(purchased);

        if (funnelSteps.length > 0) {
            setStep({ stepIndex: 0, type: 'upsell' });
        } else {
            setStep('confirmation');
        }
    };
    
    const handleDecision = (accepted: boolean) => {
        if (typeof step === 'string') return; // Should not happen on this screen

        const { stepIndex, type } = step;
        const currentFunnelStep = funnelSteps[stepIndex];
        
        if (accepted) {
            const product = type === 'upsell' ? currentFunnelStep.upsellProduct : currentFunnelStep.downsellProduct;
            if (product) {
                setAcceptedOffers(prev => [...prev, product]);
            }
        }
        
        // Determine next step
        if (type === 'upsell') {
            if (!accepted && currentFunnelStep.downsellProduct) {
                setStep({ stepIndex, type: 'downsell' });
                return;
            }
        }
        
        const nextStepIndex = stepIndex + 1;
        if (funnelSteps[nextStepIndex]) {
            setStep({ stepIndex: nextStepIndex, type: 'upsell' });
        } else {
            setStep('confirmation');
        }
    };

    const renderContent = () => {
        if (step === 'checkout') {
            return <CheckoutPage 
                mainProduct={mainProduct}
                orderBumpProduct={orderBumpProduct}
                isBumpChecked={isBumpChecked}
                setIsBumpChecked={setIsBumpChecked}
                total={total}
                onPay={handlePayment}
            />;
        }
        if (step === 'confirmation') {
            return <ConfirmationPage purchasedProducts={acceptedOffers} />;
        }
        if (typeof step === 'object') {
            const { stepIndex, type } = step;
            const currentFunnelStep = funnelSteps[stepIndex];
            const productToShow = type === 'upsell' ? currentFunnelStep.upsellProduct : currentFunnelStep.downsellProduct;

            if (productToShow) {
                return <UpsellPage 
                    upsellProduct={productToShow}
                    onDecision={handleDecision}
                    isDownsell={type === 'downsell'}
                />
            }
        }
        return <ConfirmationPage purchasedProducts={acceptedOffers} />;
    };
    
    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="w-full max-w-4xl h-[80vh] bg-gray-800 rounded-xl shadow-2xl flex flex-col" onClick={e => e.stopPropagation()}>
                {/* Browser Chrome */}
                <div className="flex-shrink-0 bg-gray-900/80 rounded-t-xl p-3 flex items-center gap-2 border-b border-gray-700">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div className="flex-grow bg-gray-700/50 text-gray-400 text-sm rounded-md px-3 py-1 text-center select-none">
                       https://whop.com/checkout/{mainProduct.id}/
                    </div>
                    <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
                        <XIcon />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-grow overflow-y-auto bg-gray-900">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};


interface CheckoutPageProps {
    mainProduct: Product;
    orderBumpProduct: Product | null;
    total: number;
    onPay: () => void;
    isBumpChecked: boolean;
    setIsBumpChecked: (c: boolean) => void;
}

const CheckoutPage: React.FC<CheckoutPageProps> = 
({ mainProduct, orderBumpProduct, total, onPay, isBumpChecked, setIsBumpChecked }) => {
    return (
        <div className="max-w-xl mx-auto p-8 text-white">
            <h1 className="text-3xl font-bold text-center mb-6">Complete Your Purchase</h1>
            
            {/* Order Summary */}
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <div className="flex items-center gap-4">
                    <img src={mainProduct.imageUrl} alt={mainProduct.name} className="w-20 h-20 rounded-md object-cover bg-gray-700" />
                    <div>
                        <h3 className="font-bold text-white text-lg">{mainProduct.name}</h3>
                        <p className="text-gray-400 font-mono">${mainProduct.price.toFixed(2)}/mo</p>
                    </div>
                </div>
                <div className="border-t border-gray-700 my-4"></div>
                
                {/* Order Bump */}
                {orderBumpProduct && (
                    <div className="bg-indigo-900/20 border border-indigo-500/30 rounded-lg p-4">
                        <div className="flex items-start gap-4">
                            <input
                                id="order-bump"
                                type="checkbox"
                                checked={isBumpChecked}
                                onChange={() => setIsBumpChecked(!isBumpChecked)}
                                className="mt-1 h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                            />
                            <div className="flex-grow">
                                <label htmlFor="order-bump" className="font-bold text-indigo-300 cursor-pointer">YES! I want this special one-time offer.</label>
                                <p className="text-sm text-gray-300 mt-1">Add <span className="font-semibold">{orderBumpProduct.name}</span> for just ${orderBumpProduct.price.toFixed(2)}!</p>
                            </div>
                        </div>
                    </div>
                )}

                <div className="flex justify-between items-center mt-4 text-xl font-bold">
                    <span>Total:</span>
                    <span>${total.toFixed(2)}</span>
                </div>
            </div>

            {/* Payment Form */}
            <div className="mt-6 space-y-4">
                 <input type="email" placeholder="Email Address" className="w-full bg-gray-700 p-3 rounded-md border border-gray-600 focus:ring-indigo-500 focus:border-indigo-500" />
                 <input type="text" placeholder="Card Number" className="w-full bg-gray-700 p-3 rounded-md border border-gray-600 focus:ring-indigo-500 focus:border-indigo-500" />
                 <div className="flex gap-4">
                    <input type="text" placeholder="MM / YY" className="w-1/2 bg-gray-700 p-3 rounded-md border border-gray-600 focus:ring-indigo-500 focus:border-indigo-500" />
                    <input type="text" placeholder="CVC" className="w-1/2 bg-gray-700 p-3 rounded-md border border-gray-600 focus:ring-indigo-500 focus:border-indigo-500" />
                 </div>
            </div>
            
            <button onClick={onPay} className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-lg py-4 rounded-lg transition-all">
                Pay ${total.toFixed(2)}
            </button>

            <div className="text-center mt-4 text-xs text-gray-500 flex items-center justify-center gap-2">
                <ShieldCheckIcon /> Secure Checkout
            </div>
        </div>
    );
};

const UpsellPage: React.FC<{ upsellProduct: Product, onDecision: (accepted: boolean) => void, isDownsell?: boolean }> = ({ upsellProduct, onDecision, isDownsell = false }) => {
    return (
        <div className="max-w-2xl mx-auto p-8 text-white text-center flex flex-col items-center justify-center h-full">
            <h2 className="text-lg font-semibold text-indigo-400">{isDownsell ? "One Last Chance..." : "WAIT! Your order is not complete..."}</h2>
            <h1 className="text-4xl font-extrabold mt-2">{isDownsell ? "A Special Offer Just For You" : "One Last Thing..."}</h1>
            <p className="mt-4 text-gray-300 max-w-lg">Get exclusive access to <span className="font-bold">{upsellProduct.name}</span>. This is your chance to get personalized advice to maximize your results.</p>
            
            <div className="my-8 p-6 bg-gray-800 rounded-lg border border-gray-700">
                <img src={upsellProduct.imageUrl} alt={upsellProduct.name} className="w-24 h-24 rounded-md object-cover bg-gray-700 mx-auto" />
                <h3 className="text-xl font-bold mt-4">{upsellProduct.name}</h3>
                <p className="text-3xl font-bold text-indigo-400 mt-2">${upsellProduct.price.toFixed(2)}</p>
            </div>
            
            <div className="w-full max-w-md space-y-3">
                <button onClick={() => onDecision(true)} className="w-full bg-green-600 hover:bg-green-700 text-white font-bold text-lg py-4 rounded-lg transition-all">
                    Yes, Add To My Order!
                </button>
                <button onClick={() => onDecision(false)} className="w-full text-gray-400 hover:text-white text-sm py-2 rounded-lg transition-all">
                    No, thank you. I'll pass on this offer.
                </button>
            </div>
        </div>
    )
}

const ConfirmationPage: React.FC<{ purchasedProducts: Product[] }> = ({ purchasedProducts }) => (
    <div className="max-w-xl mx-auto p-8 text-white text-center flex flex-col items-center justify-center min-h-full">
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-6">
            <CheckIcon className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold">Thank You!</h1>
        <p className="mt-2 text-gray-300">Your order is complete. You have purchased:</p>
        <div className="w-full my-8 bg-gray-800 rounded-lg border border-gray-700 text-left divide-y divide-gray-700">
             {purchasedProducts.map(product => (
                 <div key={product.id} className="flex items-center gap-4 p-4">
                    <img src={product.imageUrl} alt={product.name} className="w-16 h-16 rounded-md object-cover bg-gray-700" />
                    <div>
                        <h3 className="font-bold text-white text-lg">{product.name}</h3>
                        <p className="text-gray-400 font-mono">${product.price.toFixed(2)}</p>
                    </div>
                </div>
             ))}
        </div>
        <p className="text-sm text-gray-500">This is a simulation. No real purchase was made.</p>
    </div>
);


export default LivePreviewModal;