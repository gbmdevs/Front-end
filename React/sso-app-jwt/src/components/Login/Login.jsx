import React,{useState} from 'react';  
import { useNavigate} from 'react-router-dom';
import axios from "axios";

  const API = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: true,
  })


const Login = () => { 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async(e) => {
        e.preventDefault(); 
        try{
           const response = await API.post('/auth/login',{
              email,password
           });
           localStorage.setItem('token', response.data.token);
           navigate('/dashboard');
        }catch(error){ 
          if (error.response && error.response.data) { 
            setError(error.response.data.message);  // Supondo que o backend retorne um campo "message"
          } else{ 
            setError("Falha de comunicação com o servidor");
          }
        }
         
    }
    return (
        <div className="App">
            <form className='form-control' onSubmit={handleLogin}>
          <div>
            <label htmlFor="username">Usuario</label>
            <input type='text' id = 'username' onChange={(e) => setEmail(e.target.value)} required/>
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type='text' id = 'password' onChange={(e) => setPassword(e.target.value)} required />
          </div>
            <button disabled = {!email && !password ? true : false}>Submit</button>
          </form>
          
         <div className='error'>{error}</div>
        </div>        
     
    )
};

export default Login;
