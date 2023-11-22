import './App.css';

import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';

// Paginas
import MainPage from './pages/MainPage';
import Login from './components/Login/Login';
import useToken from './components/Token/useToken';

const  App = () => {
   
  const {token, setToken} = useToken();
  
  if(!token){
    return <Login setToken={setToken}/>
  }

  return (
     <Router>
       <Routes>
           <Route path="/"     element={<MainPage/>}/>
           <Route path="/dashboard" element={<MainPage/>}/>
       </Routes>     
     </Router>
  );
}

export default App;
