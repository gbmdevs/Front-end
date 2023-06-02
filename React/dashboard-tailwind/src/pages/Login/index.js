import React, { Component } from "react";

//import api from "../../services/api";
import {Container, Form} from'./styles'; 

import Logo from '../../assets/airbnb.svg';

import { useNavigate } from "react-router-dom";

class  Login extends Component {
    

    state = {
        email: "",
        senha: "",
        error: ""
    };

    teste = () => {
        
         let navigate = useNavigate();
         navigate('/dashboard');
    }
    
handleSignIn = async e => {
    console.log("Envior")
    e.preventDefault();
    const { email,senha} = this.state;
    if(!email || !senha){
        this.setState({error: "Preenche email e senha para continuar."});
    }else{
        try{
            //const response = await api.post("/login",{email,senha});
            //console.log(response);            
            this.teste();
        }catch(err){
            console.log(err);
            this.setState({error: "Houve um problema na autenticação"});
        }
    }
    console.log(email + senha);
}

render() {
    return (
    <Container>
        <Form onSubmit={this.handleSignIn}>
            <img src={Logo} alt="Airbnb logo"/>
            {this.state.error && <p>{this.state.error}</p>}
            <input type="text" placeholder="Nome de usuário" onChange={e => this.setState({email: e.target.value})}></input>
            <input type="text" placeholder="Senha" onChange={e => this.setState({ senha: e.target.value})}></input>
            <button type="submit">Entrar</button>
        </Form>
    </Container>);
  }

}


export default Login;