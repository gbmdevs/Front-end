import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';
import DashboardPage from './pages/Dashboard/DashboardPage';
import ExpensesPage from './pages/Expenses/ExpensesPage';
import AddExpensePage from './pages/Expenses/AddExpensePage';
import CategoriesPage from './pages/Settings/CategoriesPage';
import ProfilePage from './pages/Settings/ProfilePage';
import StocksPage from './pages/Stocks/StocksPage';
import MonthlyBillsPage from './pages/Bills/MonthlyBillsPage';
import { Toast } from './components/ui/Toast';

function App() {
  return (
    <AuthProvider>
      <Toast />
      <Router>
        <Routes>
          {/* Auth Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/expenses" element={<ExpensesPage />} />
            <Route path="/expenses/add" element={<AddExpensePage />} />
            <Route path="/stocks" element={<StocksPage />} />
            <Route path="/bills" element={<MonthlyBillsPage />} />
            <Route path="/settings/categories" element={<CategoriesPage />} />
            <Route path="/settings/profile" element={<ProfilePage />} />
          </Route>
          
          {/* Redirect root to dashboard or login based on auth status */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          
          {/* Catch all - redirect to dashboard */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;