import React from 'react';

//Paginas
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

import {BrowserRouter,Route,Routes} from 'react-router-dom';


function RoutesApp(){
    return(
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login/>} />
        <Route path="dashboard" element={<Dashboard/>} />
      </Routes>
    </BrowserRouter>);
}


export default RoutesApp;