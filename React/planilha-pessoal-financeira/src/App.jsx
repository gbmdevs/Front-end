import { useState } from 'react'
import { BrowserRouter as Router,Routes,Route,Navigate} from 'react-router-dom'  
import LoginPage from './pages/Auth/LoginPage';
import DashboardPage from './pages/Dashboard/DashboardPage';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute  from './components/auth/ProtectedRoute';

function App() {
  const [count, setCount] = useState(0)

  return (
    <AuthProvider>
     <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          {/* Rotas protegidas - Autenticadas */}
          <Route element={<ProtectedRoute />}>
             <Route path="/dashboard" element={<DashboardPage />} />
          </Route>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          {/* */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
     </Router>
    </AuthProvider>
  )
}

export default App
