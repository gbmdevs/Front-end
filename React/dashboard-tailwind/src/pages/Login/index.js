import React, { Component } from "react";

import {Container, Form} from'./styles'; 

import Logo from '../../assets/airbnb.svg';

class Login extends Component {
    state = {
        username: "",
        senha: "",
        error: "Não foi possivel realizar o cadastro"
    };


handleSignIn = async e => {
    console.log("Envior")
    e.preventDefault();
    const { username,senha } = this.state;
    console.log(username + senha);
}

render() {
    return (
    <Container>
        <Form onSubmit={this.handleSignIn}>
            <img src={Logo} alt="Airbnb logo"/>
            {this.state.error && <p>{this.state.error}</p>}
            <input type="text" placeholder="Nome de usuário" onChange={e => this.setState({username: e.target.value})}></input>
            <input type="text" placeholder="Senha"></input>
            <button type="submit">Entrar</button>
        </Form>
    </Container>);
  }

}


export default Login;