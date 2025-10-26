import React, { useState } from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Integrations from './components/Integrations';
import Login from './components/Login';

export type Page = 'dashboard' | 'integrations';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [page, setPage] = useState<Page>('dashboard');

  const handleLogin = () => {
    setIsAuthenticated(true);
    setPage('dashboard');
  };
  
  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans antialiased">
      <main className="container mx-auto px-4 py-8 md:py-16">
        <Header activePage={page} onNavigate={setPage} onLogout={handleLogout} />
        {page === 'dashboard' ? <Dashboard /> : <Integrations />}
      </main>
      <footer className="text-center py-6 text-gray-500 text-sm">
        <p>Magic Cart Feature Enhancement Strategy | Powered by Gemini</p>
      </footer>
    </div>
  );
};

export default App;