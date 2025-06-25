import React, { createContext, useState, useContext, useEffect } from 'react';
import { User } from '../types/User';

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

// Create context with a default value
const AuthContext = createContext<AuthContextType>({} as AuthContextType);

// Custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Mock user data for demo purposes
  const mockUsers = [
    { id: '1', name: 'Demo User', email: 'demo@example.com', password: 'password123' }
  ];
  
  useEffect(() => {
    // Check for saved user in local storage
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);
  
  // For demo purposes, we'll use local storage to simulate authentication
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Find user with matching credentials
    const user = mockUsers.find(u => u.email === email && u.password === password);
    
    if (user) {
      // Remove password from stored user
      const { password, ...secureUser } = user;
      setCurrentUser(secureUser as User);
      localStorage.setItem('currentUser', JSON.stringify(secureUser));
    } else {
      throw new Error('Invalid email or password');
    }
    
    setIsLoading(false);
  };
  
  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user already exists
    if (mockUsers.some(u => u.email === email)) {
      throw new Error('User with this email already exists');
    }
    
    // Create new user (in a real app, this would be an API call)
    const newUser = { id: String(Date.now()), name, email, password };
    mockUsers.push(newUser);
    
    // Save user without password
    const { password: _, ...secureUser } = newUser;
    setCurrentUser(secureUser as User);
    localStorage.setItem('currentUser', JSON.stringify(secureUser));
    
    setIsLoading(false);
  };
  
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };
  
  const value = {
    currentUser,
    isAuthenticated: !!currentUser,
    isLoading,
    login,
    register,
    logout
  };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};