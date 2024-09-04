import './App.css'; 

import { BrowserRouter as Router, Route, Navigate, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';

function App() {

  const isAuthenticated = () => {
    //return localStorage.getItem('token') !== null;
    return true;
  };

  return ( 
    
    <Router>
      <Routes>
        <Route exact path="/login" element={<Login/>} />
        <Route exact path="/dashboard" element={isAuthenticated() ? <Dashboard/>: <Navigate replace to="/login" />} />
        <Route path="*" element={<Navigate replace to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
