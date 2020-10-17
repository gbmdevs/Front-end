import React from 'react';
import {BrowserRouter,Switch, Route} from 'react-router-dom';

/* Pages */
import Landing from './pages/Landing.js'
import OrphanagesMap from './pages/OrphanagesMap.js'

function Routes(){
    return(
     <BrowserRouter>
        <Route path="/" exact component={Landing} />
        <Route path="/app" component={OrphanagesMap} />
     </BrowserRouter>
    );
}

export default Routes;