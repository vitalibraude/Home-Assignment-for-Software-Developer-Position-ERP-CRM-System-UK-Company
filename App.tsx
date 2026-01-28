
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';

const CustomersPage = () => (
  <div className="flex flex-col items-center justify-center h-full text-slate-500">
    <h2 className="text-xl font-bold">ניהול לקוחות</h2>
    <p>עמוד זה בבנייה (Demo)</p>
  </div>
);

const OrdersPage = () => (
  <div className="flex flex-col items-center justify-center h-full text-slate-500">
    <h2 className="text-xl font-bold">הזמנות רכש</h2>
    <p>עמוד זה בבנייה (Demo)</p>
  </div>
);

const SettingsPage = () => (
  <div className="flex flex-col items-center justify-center h-full text-slate-500">
    <h2 className="text-xl font-bold">הגדרות מערכת</h2>
    <p>עמוד זה בבנייה (Demo)</p>
  </div>
);

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/customers" element={<CustomersPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
