import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from 'pages/Home';
import NotFound from 'pages/NotFound';

const drawerWidth = 140;  

function App() {
  return (  
    <Router>
      <div style={{ display: 'flex'  }}>
      <Sidebar/>      
      <div
          style={{
            flexGrow: 1,
            padding: '20px',
            marginLeft: `${drawerWidth}px`, // Ajuste para não sobrepor o menu
          }}>
            <Routes>
               <Route path="/login" />
               <Route path="/" element={<Home />} />
               <Route path="*" element={<NotFound />} />
            </Routes>
         </div>
      </div>
    </Router>
  );
}

export default App;
