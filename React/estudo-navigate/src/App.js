import './App.css';

import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';


// Paginas
import LoginPage from './pages/Login';
import MainPage from './pages/MainPage';

const  App = () => {
  return (
     <Router>
       <Routes>
           <Route path="/"     element={<LoginPage/>}/>
           <Route path="/dashboard" element={<MainPage/>}/>
       </Routes>     
     </Router>
  );
}

export default App;
