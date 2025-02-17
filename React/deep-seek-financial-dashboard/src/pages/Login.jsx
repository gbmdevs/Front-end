import React, { useState } from 'react';
import { TextField, Button, Typography, Paper } from '@mui/material'; 
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../routes';
import { post } from '../utils/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await post(ROUTES.USERS.LOGIN, { email, password });
      console.log("antes token"+response)
      console.log('Response Data (Stringified):', JSON.stringify(response.data, null, 2));
      const { token } = response.data;
      console.log("Token: "+ token)
      console.log("Antes")

      // Store the token in localStorage
      localStorage.setItem('token', token);
      
      console.log("foi:")

      // Redirect to the dashboard
      navigate('/');
    } catch (err) {
      setError('Invalid email or password');
    }
  };


  return (
    <Paper style={{ padding: '20px', maxWidth: '400px', margin: '50px auto' }}>
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <TextField
        fullWidth
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        margin="normal"
      />
      <Button
        fullWidth
        variant="contained"
        color="primary" 
        onClick={handleLogin}
        style={{ marginTop: '20px' }}
      >
        Login
      </Button>
    </Paper>
  );
};

export default Login;