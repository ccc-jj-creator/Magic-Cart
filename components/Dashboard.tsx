import React from 'react';
import ProductList from './ProductList';

const Dashboard: React.FC = () => {
    return (
        <div className="mt-12">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-white">Your Whop Products</h2>
                <p className="text-gray-400 max-w-2xl mx-auto mt-4">
                   Activate Magic Cart for your products below. Once enabled, you can manage upsells, funnels, and automations that will be deployed directly to your product on Whop.
                </p>
            </div>
            <ProductList />
        </div>
    );
};

export default Dashboard;