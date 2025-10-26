import React from 'react';
import ProductList from './ProductList';
import type { Product } from '../types';

interface DashboardProps {
  products: Product[];
  onManageProduct: (product: Product) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ products, onManageProduct }) => {
    return (
        <div className="mt-12">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-white">Your Whop Products</h2>
                <p className="text-gray-400 max-w-2xl mx-auto mt-4">
                   Activate Magic Cart for your products below. Once enabled, you can manage upsells, funnels, and automations that will be deployed directly to your product on Whop.
                </p>
            </div>
            <ProductList products={products} onManageProduct={onManageProduct} />
        </div>
    );
};

export default Dashboard;