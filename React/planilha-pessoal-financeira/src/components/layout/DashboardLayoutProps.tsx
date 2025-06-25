import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  CreditCard, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  User, 
  ChevronDown,
  Plus,
  Bell,
  TrendingUp,
  Receipt
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  
  // Mock notifications for demo
  const notifications = [
    { id: 1, title: 'New expense added', message: 'Grocery shopping - $45.99', time: '2 minutes ago', unread: true },
    { id: 2, title: 'Budget alert', message: 'Dining budget at 80%', time: '1 hour ago', unread: true },
    { id: 3, title: 'Category update', message: 'Added new category "Travel"', time: '2 days ago', unread: false },
  ];
  
  const navItems = [
    { icon: <LayoutDashboard size={20} />, name: 'Dashboard', path: '/dashboard' },
    { icon: <CreditCard size={20} />, name: 'Expenses', path: '/expenses' },
    { icon: <TrendingUp size={20} />, name: 'Stock Market', path: '/stocks' },
    { icon: <Receipt size={20} />, name: 'Monthly Bills', path: '/bills' },
    { icon: <Settings size={20} />, name: 'Categories', path: '/settings/categories' },
  ];
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  const isActivePath = (path: string) => {
    return location.pathname === path || 
           (path !== '/dashboard' && location.pathname.startsWith(path));
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Toaster position="top-right" />
      
      {/* Top navigation */}
      <header className="bg-white border-b border-gray-200 z-30">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and mobile menu button */}
            <div className="flex items-center">
              <button
                onClick={toggleSidebar}
                className="lg:hidden p-2 rounded-md text-gray-500 hover:text-gray-900 focus:outline-none"
              >
                {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <div className="flex items-center flex-shrink-0 ml-4 lg:ml-0">
                <span className="text-xl font-bold text-primary-600">ExpenseTrack</span>
              </div>
            </div>
            
            {/* Right section */}
            <div className="flex items-center">
              {/* Add expense button */}
              <button 
                onClick={() => navigate('/expenses/add')}
                className="mr-4 btn btn-primary btn-sm lg:btn-md flex items-center"
              >
                <Plus size={18} className="mr-1" />
                <span className="hidden sm:inline">Add Expense</span>
              </button>
              
              {/* Notifications */}
              <div className="relative mr-4">
                <button
                  onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                  className="p-2 text-gray-500 hover:text-gray-900 focus:outline-none relative"
                >
                  <Bell size={20} />
                  {notifications.some(n => n.unread) && (
                    <span className="absolute top-1 right-1 w-2 h-2 bg-primary-500 rounded-full"></span>
                  )}
                </button>
                
                <AnimatePresence>
                  {isNotificationsOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
                    >
                      <div className="p-4 border-b border-gray-200">
                        <h3 className="text-sm font-semibold">Notifications</h3>
                      </div>
                      <div className="max-h-96 overflow-y-auto">
                        {notifications.map(notification => (
                          <div
                            key={notification.id}
                            className={`p-4 border-b border-gray-100 hover:bg-gray-50 ${
                              notification.unread ? 'bg-primary-50' : ''
                            }`}
                          >
                            <div className="flex items-start">
                              <div className="flex-1">
                                <p className="text-sm font-medium text-gray-900">
                                  {notification.title}
                                </p>
                                <p className="text-sm text-gray-600 mt-1">
                                  {notification.message}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                  {notification.time}
                                </p>
                              </div>
                              {notification.unread && (
                                <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="p-4 border-t border-gray-200">
                        <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                          Mark all as read
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              {/* Profile dropdown */}
              <div className="relative">
                <button 
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="flex items-center text-sm rounded-full focus:outline-none"
                >
                  <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700">
                    {currentUser?.name.charAt(0)}
                  </div>
                  <span className="hidden md:flex items-center ml-2">
                    <span className="text-sm font-medium">{currentUser?.name}</span>
                    <ChevronDown size={16} className="ml-1" />
                  </span>
                </button>
                
                <AnimatePresence>
                  {isProfileMenuOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50"
                    >
                      <div className="py-1">
                        <button
                          onClick={() => {
                            navigate('/settings/profile');
                            setIsProfileMenuOpen(false);
                          }}
                          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <User size={16} className="mr-2" />
                          Profile
                        </button>
                        <button
                          onClick={handleLogout}
                          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <LogOut size={16} className="mr-2" />
                          Logout
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      <div className="flex-grow flex">
        {/* Sidebar for desktop */}
        <aside className="hidden lg:block lg:w-64 bg-white border-r border-gray-200">
          <div className="h-full flex flex-col px-4 py-6">
            <nav className="flex-1 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`flex items-center px-3 py-2 w-full rounded-md text-sm font-medium transition-colors ${
                    isActivePath(item.path)
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.name}
                </button>
              ))}
            </nav>
            
            <div className="mt-auto pt-4 border-t border-gray-200">
              <button
                onClick={handleLogout}
                className="flex items-center px-3 py-2 w-full rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              >
                <LogOut size={20} className="mr-3" />
                Logout
              </button>
            </div>
          </div>
        </aside>
        
        {/* Mobile sidebar */}
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 z-20 bg-gray-800 bg-opacity-50"
              onClick={toggleSidebar}
            >
              <motion.aside
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'tween' }}
                className="absolute top-0 left-0 w-64 h-full bg-white"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="h-full flex flex-col px-4 py-6">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xl font-bold text-primary-600">ExpenseTrack</span>
                    <button
                      onClick={toggleSidebar}
                      className="p-2 rounded-md text-gray-500 hover:text-gray-900 focus:outline-none"
                    >
                      <X size={24} />
                    </button>
                  </div>
                  
                  <nav className="flex-1 space-y-1">
                    {navItems.map((item) => (
                      <button
                        key={item.path}
                        onClick={() => {
                          navigate(item.path);
                          setIsSidebarOpen(false);
                        }}
                        className={`flex items-center px-3 py-2 w-full rounded-md text-sm font-medium transition-colors ${
                          isActivePath(item.path)
                            ? 'bg-primary-50 text-primary-700'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                      >
                        <span className="mr-3">{item.icon}</span>
                        {item.name}
                      </button>
                    ))}
                  </nav>
                  
                  <div className="mt-auto pt-4 border-t border-gray-200">
                    <button
                      onClick={handleLogout}
                      className="flex items-center px-3 py-2 w-full rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    >
                      <LogOut size={20} className="mr-3" />
                      Logout
                    </button>
                  </div>
                </div>
              </motion.aside>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Main content */}
        <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;