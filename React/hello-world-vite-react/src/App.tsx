import { useState } from 'react' 
import './App.css'
import Index from './pages/Index'
import Login from './pages/Login'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";

const isAuthenticated = () => {
  /*const token = localStorage.getItem('token');
  console.log(token);
  return (!token) ? false : true;*/
  return true;
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
            <ProtectedRoute>
              <Layout>
                <Index />
              </Layout>
            </ProtectedRoute> 
          }/>
          <Route path="*" element={<Index />} />
       </Routes> 
    </BrowserRouter>
  )
}

export default App
