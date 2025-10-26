import React from 'react';
import ProductCard from './ProductCard';
import type { Product } from '../types';

// Mock data simulating a fetch from the Whop API
const mockProducts: Product[] = [
    {
        id: 'prod_1',
        name: 'Satoshi\'s Secret Algo',
        price: 99.99,
        imageUrl: 'https://via.placeholder.com/150/8A2BE2/FFFFFF?text=Algo',
    },
    {
        id: 'prod_2',
        name: 'Crypto Mastermind Course',
        price: 499.00,
        imageUrl: 'https://via.placeholder.com/150/3498DB/FFFFFF?text=Course',
    },
    {
        id: 'prod_3',
        name: 'NFT Signals Group',
        price: 49.99,
        imageUrl: 'https://via.placeholder.com/150/F1C40F/000000?text=NFT',
    },
    {
        id: 'prod_4',
        name: 'Pro Forex Community',
        price: 75.00,
        imageUrl: 'https://via.placeholder.com/150/2ECC71/FFFFFF?text=Forex',
    },
];


const ProductList: React.FC = () => {
    // In a real app, you'd fetch this data:
    // const [products, setProducts] = useState<Product[]>([]);
    // useEffect(() => { fetchProducts().then(setProducts); }, []);
    const products = mockProducts;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map(product => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
};

export default ProductList;
