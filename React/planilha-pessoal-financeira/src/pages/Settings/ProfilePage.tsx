import { useState, ChangeEvent, FormEvent } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Save, User, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const ProfilePage = () => {
  const { currentUser } = useAuth();
  
  const [name, setName] = useState(currentUser?.name || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  
  const handleProfileSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);
    
    // In a real app, you would update the user's profile here
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setMessage({
      type: 'success',
      text: 'Profile updated successfully!'
    });
    
    setIsSubmitting(false);
  };
  
  const handlePasswordSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (newPassword !== confirmPassword) {
      setMessage({
        type: 'error',
        text: 'New passwords do not match.'
      });
      return;
    }
    
    if (newPassword.length < 6) {
      setMessage({
        type: 'error',
        text: 'New password must be at least 6 characters long.'
      });
      return;
    }
    
    setIsSubmitting(true);
    setMessage(null);
    
    // In a real app, you would update the user's password here
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setMessage({
      type: 'success',
      text: 'Password updated successfully!'
    });
    
    // Reset form
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    
    setIsSubmitting(false);
  };
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Profile Settings</h1>
      </div>
      
      {message && (
        <div 
          className={`p-4 rounded-md ${
            message.type === 'success' 
              ? 'bg-success-50 border border-success-200 text-success-700' 
              : 'bg-danger-50 border border-danger-200 text-danger-700'
          }`}
        >
          {message.text}
        </div>
      )}
      
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Profile Information */}
        <div className="card p-6">
          <h2 className="text-lg font-medium mb-6">Profile Information</h2>
          
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 text-2xl border-4 border-white shadow-md">
              {currentUser?.name.charAt(0)}
            </div>
          </div>
          
          <form onSubmit={handleProfileSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input"
                required
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input"
                required
              />
            </div>
            
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary btn-lg w-full flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={20} className="mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={20} className="mr-2" />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
        
        {/* Password Change */}
        <div className="card p-6">
          <h2 className="text-lg font-medium mb-6">Change Password</h2>
          
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Current Password
              </label>
              <input
                id="currentPassword"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="input"
                required
              />
            </div>
            
            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="input"
                required
              />
            </div>
            
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm New Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="input"
                required
              />
            </div>
            
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary btn-lg w-full flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={20} className="mr-2 animate-spin" />
                    Updating...
                  </>
                ) : (
                  'Change Password'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfilePage;