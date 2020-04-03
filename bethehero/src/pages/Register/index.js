import React from 'react';
import {Link} from 'react-router-dom';
import { FiArrowLeft }     from 'react-icons/fi';

import './style.css';
// Imagens
import logoImg from '../../assets/logo.svg';

export default function Register(){
    return ( 
        <div className="register-container">
            <div className="content">
                <section>
                  <img src={logoImg} alt="be the hero "/>
                  <h1>Cadastro</h1>
                  <p>Faça seu Cadastro, entre na plataforma e ajude pessoas 
                     a encontrar casos da sua Ong.
                  </p>
                  <Link to="/" className="backlink">
                    <FiArrowLeft size={16} color="#E02041" />   Voltar para o Logon
                  </Link>
                
                </section>
                
                <form>
                     <input placeholder="Nome da Ong" />
                     <input type="email"    placeholder="E-mail"/>
                     <input placeholder="Whatapp" />
                      <div className="input-group">
                          <input placeholder="Cidade"/>
                          <input placeholder="UF" style={{ width: 80 }} />
                      
                      </div>
                      <button type="submit" className="button">Cadastrar</button> 
                </form>
            </div>
        </div>
    );
}