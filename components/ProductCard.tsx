import React, { useState } from 'react';
import type { Product } from '../types';

interface ProductCardProps {
    product: Product;
    onManageProduct: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onManageProduct }) => {
    const [isEnabled, setIsEnabled] = useState(false);

    const handleToggle = () => {
        setIsEnabled(prev => !prev);
    };

    return (
        <div className={`bg-gray-800/50 p-5 rounded-lg border backdrop-blur-sm transition-all duration-300 flex flex-col justify-between ${isEnabled ? 'border-indigo-500 shadow-indigo-500/10 shadow-lg' : 'border-gray-700'}`}>
            <div>
                <div className="flex items-center gap-4">
                    <img src={product.imageUrl} alt={product.name} className="w-20 h-20 rounded-md object-cover bg-gray-700" />
                    <div>
                        <h3 className="font-bold text-white text-lg">{product.name}</h3>
                        <p className="text-gray-400 font-mono">${product.price.toFixed(2)}/mo</p>
                    </div>
                </div>
            </div>
            <div className="mt-5 flex items-center justify-between">
                <span className="text-sm font-medium text-gray-300">
                    {isEnabled ? 'Features: Active' : 'Features: Inactive'}
                </span>
                <button
                    onClick={handleToggle}
                    className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500 ${isEnabled ? 'bg-indigo-600' : 'bg-gray-600'}`}
                    aria-pressed={isEnabled}
                >
                    <span
                        className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-300 ${isEnabled ? 'translate-x-6' : 'translate-x-1'}`}
                    />
                </button>
            </div>
             {isEnabled && (
                <div className="mt-4 border-t border-gray-700 pt-4">
                     <button 
                        onClick={() => onManageProduct(product)}
                        className="w-full text-center bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md transition-colors text-sm"
                     >
                        Manage Funnels
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProductCard;
