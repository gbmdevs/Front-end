import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import { FiArrowLeft }     from 'react-icons/fi';

// AXIOS
import api from '../../services/api';

import './style.css';
// Imagens
import logoImg from '../../assets/logo.svg';

export default function Register(){
    // A variavel 'e' significa que é o evento acionado * 
    // Inicializa as Variaveis
    const [name     , setName]     = useState(''); 
    const [email    , setEmail]    = useState(''); 
    const [whatsapp , setWhatsapp] = useState(''); 
    const [city     , setCity]     = useState(''); 
    const [uf       , setUf]       = useState(''); 
    
    async function handleEvent(e){ 
     // Evita o Recarregamento de Pagina - Estudar Depois! 
        e.preventDefault();
    const data = {
            name,
            email,
            whatsapp,
            city,
            uf
    };
     
    // Area de Requisição POST - /ongs
      try{
         const response = await api.post('ongs', data); 
         alert(`Seu ID de acesso é: ${response.data.id}` ); 
      }catch(err) {
          console.log(err);
         alert('Errp no cadastro, tente novamente!');
      }

   }
    
    
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
                
                <form onSubmit={handleEvent}>
                     <input placeholder="Nome da Ong"
                      value={name}
                      onChange={e => setName(e.target.value)}
                     />

                     <input type="email"    placeholder="E-mail" 
                      value={email}
                      onChange={e => setEmail(e.target.value)}                     
                     />

                     <input placeholder="Whatsapp" 
                      value={whatsapp}
                      onChange={e => setWhatsapp(e.target.value)}
                     
                     />
                      <div className="input-group">
                          <input placeholder="Cidade"
                           value={city}
                           onChange={e => setCity(e.target.value)}
                          />

                          <input placeholder="UF" style={{ width: 80 }}
                           value={uf}
                           onChange={e => setUf(e.target.value)}
                          />
                      
                      </div>
                      <button type="submit" className="button">Cadastrar</button> 
                </form>
            </div>
        </div>
    );
}