import React from 'react';

//Paginas
import Login from './pages/Login';

import {BrowserRouter,Route,Routes} from 'react-router-dom';

function RoutesApp(){
    return(
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login/>} />
      </Routes>
    </BrowserRouter>);
}


export default RoutesApp;