import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";  // Your Login page component
import Home from "./pages/Home";  // Your Home page component
import Products from "./pages/Products";
import ProductManagement from "./pages/dashboard/product-management";
import OrderManagement from "./pages/dashboard/OrderManagement";

// Lazy load MainLayout
const MainLayout = lazy(() => import('./components/layout/Interface/MainLayout'));
const DashboardLayout = lazy(() => import('./components/layout/Dashboard/DefaultLayout'));

const App = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/products" element={<Products />} />
          </Route>
          <Route element={< DashboardLayout/>}>
            <Route path="/dashboard/products" element={<ProductManagement />} />
            <Route path="/dashboard/orders" element={<OrderManagement />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
