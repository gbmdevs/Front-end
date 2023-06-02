import './App.css';

import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';

// Paginas
import LoginPage from './pages/Login';
import DashboardPage from './pages/Dashboard';

const  App = () => {
  return (
     <Router>
       <Routes>
           <Route path="/"     element={<LoginPage/>}/>
           <Route path="/dashboard" element={<DashboardPage/>}/>
       </Routes>     
     </Router>
  );
}

export default App;
