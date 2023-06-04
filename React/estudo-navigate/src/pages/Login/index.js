import React, { useState } from "react";

import Logo from '../../assets/airbnb.svg';
import {Container, Form} from './styles';
import api from "../../services/api";

import { useNavigate } from "react-router-dom";


const LoginPage = () => {
   const navigate = useNavigate(); 

   const [formData,setFormData] = useState({
        email: '',
        senha: '',
        error: ''
   })

   // Mudar os campos do formulario
   const handleFieldChange = (e) =>{
      setFormData({ ...formData, [e.target.name]: e.target.value})
   };

   const handleLogin = async (e) =>{
        e.preventDefault();
        try{
            if(!formData.email || !formData.senha){
                setFormData({...formData, error: 'Email/Senha não preenchidos'});
                setTimeout(() => {
                    setFormData({ ...formData, error: '' });
                }, 2000);
                return;
            }else{
                const response = await api.post("/login",formData);
                console.log(response);
                navigate("/dashboard");
            }

        }catch(err){
            setFormData({...formData, error: 'Houve um problema na autenticação'});
        }
     
   }
    

   return (     
    <Container>
      <Form onSubmit={handleLogin}>
        <img src={Logo} alt="Airbnb logo"/>
        {formData.error && <p>{formData.error}</p>}
        <input type="text" placeholder="Nome de usuário" value={formData.email} name="email" onChange={handleFieldChange}></input>
        <input type="text" placeholder="Senha" name="senha" value={formData.senha} onChange={handleFieldChange}></input>
        <button type="submit">Entrar</button>
      </Form>
    </Container>
   );

};

export default LoginPage;