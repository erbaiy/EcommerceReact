import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";  // Your Login page component
import Home from "./pages/Home";  // Your Home page component
import Products from "./pages/Products";
import ProductManagement from "./pages/dashboard/product-management";
import OrderManagement from "./pages/dashboard/OrderManagement";
import Statistics from "./pages/dashboard/statistics";

// Lazy load MainLayout
const MainLayout = lazy(() => import('./components/layout/Interface/MainLayout'));
const DashboardLayout = lazy(() => import('./components/layout/Dashboard/DefaultLayout'));

// Import AuthGuard
import AuthGuard from './guard/AuthGuard';

const App = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* Public routes */}
            <Route path="/login" element={<Login />} />
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route 
            path="/products" 
            element={
              <AuthGuard >
                <Products />
              </AuthGuard>
            }
          />      
              </Route>


          {/* Protected routes */}
          <Route element={<DashboardLayout />}>
            <Route 
              path="/dashboard/products" 
              element={
                <AuthGuard requiredRole="admin">
                  <ProductManagement />
                </AuthGuard>
              } 
            />
            <Route 
              path="/dashboard/orders" 
              element={
                <AuthGuard requiredRole="admin">
                  <OrderManagement />
                </AuthGuard>
              }
            />
            <Route 
              path="/dashboard/statistics" 
              element={
                <AuthGuard requiredRole="admin">
                  <Statistics />
                </AuthGuard>
              } 
            />
          
            
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
