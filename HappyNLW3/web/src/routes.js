import React from 'react';
import {BrowserRouter,Switch, Route} from 'react-router-dom';

/* Pages */
import Landing from './pages/Landing.js'
import Orphanages from './pages/Orphanages.js'

function Routes(){
    return(
     <BrowserRouter>
        <Route path="/" exact component={Landing} />
        <Route path="/app" component={Orphanages} />
     </BrowserRouter>
    );
}

export default Routes;