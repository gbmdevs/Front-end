import { useState } from 'react' 
import './App.css'
import Index from './pages/Index'
import Login from './pages/Login'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";

const isAuthenticated = () => {
  // For demo purposes, let's just check localStorage
  // In a real app, this would validate tokens, etc.
  return true; // For now, let's consider users always authenticated to make testing easier
};

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  return isAuthenticated() ? <>{children}</> : <Navigate to="/login" replace />;
};


const App = () => { 
  return (
    <BrowserRouter>
    
       <Routes> 
          <Route path="/login" element={<Login />} />
          <Route path="/" element={
            <Layout>
            <ProtectedRoute>
               <Index />
            </ProtectedRoute>
            </Layout>
          }/>
          <Route path="*" element={<Index />} />
       </Routes> 
    </BrowserRouter>
  )
}

export default App
