import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Expenses from './pages/Expenses';
import Login from './pages/Login';
import MinimalLayout from './layouts/MinimalLayout';
import MainLayout from './layouts/MainLayout';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router> 
      <Routes>
        <Route
          path="/login"
          element={
            <MinimalLayout>
              <Login />
            </MinimalLayout>
          }/>
          <Route element={<ProtectedRoute />}>
          <Route
            path="/"
            element={
              <MainLayout>
                <Dashboard />
              </MainLayout>
            }
          />
          <Route
            path="/expenses"
            element={
              <MainLayout>
                <Expenses />
              </MainLayout>
            }
          />
                    <Route
            path="/dashboard"
            element={
              <MainLayout>
                <Dashboard />
              </MainLayout>
            }
          />
          </Route>
      {/* 
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div style={{ flex: 1 }}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/expenses" element={<Expenses />} />
            <Route path="/reports" element={<Reports />} />
          </Routes>
        </div>
      </div>*/} 
      </Routes>
    </Router>
  );
}

export default App;