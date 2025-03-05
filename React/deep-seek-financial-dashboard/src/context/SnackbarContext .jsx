import React, { createContext, useState } from 'react';

import { Snackbar, Alert } from '@mui/material'; 

export const SnackbarContext = createContext();

export const SnackbarProvider = ({ children }) => {
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success', // 'success', 'error', 'warning', 'info'
    });

    const showSnackbar = (message, severity = 'success') => {
        setSnackbar({ open: true, message, severity });
    };
    
    const hideSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };  

    return (
       <SnackbarContext.Provider value={{ showSnackbar, hideSnackbar }}>
        {children}
        <Snackbar
        open={snackbar.open}
        autoHideDuration={4000} // Auto-hide after 6 seconds
        onClose={hideSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={hideSnackbar} severity={snackbar.severity} variant="filled">
          {snackbar.message}
        </Alert>
      </Snackbar>
       </SnackbarContext.Provider>
    )
}