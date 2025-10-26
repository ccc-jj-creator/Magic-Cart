import React from 'react';
import ProductCard from './ProductCard';
import type { Product } from '../types';

interface ProductListProps {
  products: Product[];
  onManageProduct: (product: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onManageProduct }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map(product => (
                <ProductCard key={product.id} product={product} onManageProduct={onManageProduct} />
            ))}
        </div>
    );
};

export default ProductList;