import React, { useState } from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Integrations from './components/Integrations';
import Login from './components/Login';
import ProductSettings from './components/ProductSettings';
import type { Product } from './types';


export type Page = 'dashboard' | 'integrations';

// Mock data simulating a fetch from the Whop API, now at the top level
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
    {
      id: 'offer_1',
      name: 'The Ultimate Guide to Trading Psychology',
      price: 29.99,
      imageUrl: 'https://via.placeholder.com/150/9b59b6/FFFFFF?text=eBook'
    },
    {
      id: 'offer_2',
      name: '1-on-1 Strategy Session',
      price: 249.00,
      imageUrl: 'https://via.placeholder.com/150/34495e/FFFFFF?text=Call'
    }
];


const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [page, setPage] = useState<Page>('dashboard');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [products] = useState<Product[]>(mockProducts);

  const handleLogin = () => {
    setIsAuthenticated(true);
    setPage('dashboard');
  };
  
  const handleLogout = () => {
    setIsAuthenticated(false);
    setSelectedProduct(null); // Clear selected product on logout
  };
  
  const handleManageProduct = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleBackToDashboard = () => {
    setSelectedProduct(null);
    setPage('dashboard');
  }

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans antialiased">
      <main className="container mx-auto px-4 py-8 md:py-16">
        {selectedProduct ? (
          <ProductSettings product={selectedProduct} allProducts={products} onBack={handleBackToDashboard} />
        ) : (
          <>
            <Header activePage={page} onNavigate={setPage} onLogout={handleLogout} />
            {page === 'dashboard' ? <Dashboard products={products} onManageProduct={handleManageProduct} /> : <Integrations />}
          </>
        )}
      </main>
      <footer className="text-center py-6 text-gray-500 text-sm">
        <p>Magic Cart Feature Enhancement Strategy | Powered by Gemini</p>
      </footer>
    </div>
  );
};

export default App;