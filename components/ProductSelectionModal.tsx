import React, { useState, useMemo } from 'react';
import type { Product } from '../types';
import { XIcon, SearchIcon } from './icons';

interface ProductSelectionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onProductSelect: (product: Product) => void;
    products: Product[];
    currentProductId: string;
    title: string;
}

const ProductSelectionModal: React.FC<ProductSelectionModalProps> = ({
    isOpen,
    onClose,
    onProductSelect,
    products,
    currentProductId,
    title,
}) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredProducts = useMemo(() => {
        return products
            .filter(p => p.id !== currentProductId)
            .filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }, [products, currentProductId, searchTerm]);

    if (!isOpen) return null;

    const handleSelect = (product: Product) => {
        onProductSelect(product);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="w-full max-w-2xl bg-gray-800 rounded-xl shadow-2xl flex flex-col" onClick={e => e.stopPropagation()}>
                <header className="flex-shrink-0 p-4 flex items-center justify-between border-b border-gray-700">
                    <h2 className="text-xl font-bold text-white">{title}</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
                        <XIcon />
                    </button>
                </header>
                
                <div className="p-4 border-b border-gray-700">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <SearchIcon />
                        </div>
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            placeholder="Search products..."
                            className="w-full bg-gray-900/50 text-white placeholder-gray-400 border border-gray-600 rounded-md pl-10 pr-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                            autoFocus
                        />
                    </div>
                </div>

                <div className="flex-grow overflow-y-auto p-4 max-h-[60vh]">
                    {filteredProducts.length > 0 ? (
                        <ul className="space-y-2">
                            {filteredProducts.map(product => (
                                <li key={product.id}>
                                    <button 
                                        onClick={() => handleSelect(product)}
                                        className="w-full text-left flex items-center gap-4 p-3 rounded-md hover:bg-gray-700/50 transition-colors"
                                    >
                                        <img src={product.imageUrl} alt={product.name} className="w-12 h-12 rounded-md object-cover bg-gray-700 flex-shrink-0" />
                                        <div className="flex-grow">
                                            <p className="font-semibold text-white">{product.name}</p>
                                            <p className="text-sm text-gray-400 font-mono">${product.price.toFixed(2)}</p>
                                        </div>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="text-center py-12 text-gray-500">
                            <p>No products found.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductSelectionModal;
