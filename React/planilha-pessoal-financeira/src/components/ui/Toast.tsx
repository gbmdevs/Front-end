import { Toaster } from 'react-hot-toast';

export const Toast = () => {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        success: {
          style: {
            background: '#10b981',
            color: 'white',
            padding: '16px',
          },
          iconTheme: {
            primary: 'white',
            secondary: '#10b981',
          },
        },
        error: {
          style: {
            background: '#ef4444',
            color: 'white',
            padding: '16px',
          },
          iconTheme: {
            primary: 'white',
            secondary: '#ef4444',
          },
        },
        warning: {
          style: {
            background: '#f59e0b',
            color: 'white',
            padding: '16px',
          },
          iconTheme: {
            primary: 'white',
            secondary: '#f59e0b',
          },
        },
      }}
    />
  );
};