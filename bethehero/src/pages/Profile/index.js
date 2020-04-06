import React , { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { FiPower , FiTrash2 } from 'react-icons/fi';

// Axios
import api from '../../services/api';

import './style.css';

// Imagens
import LogoImg from '../../assets/logo.svg';


export default function Profile(){
    
    const [ incidents , setIncidents] = useState([]);
    const ongName = localStorage.getItem('ongName');   
    const ongId   = localStorage.getItem('ongID');
    
 // Estudar essa Parte abaixo   
    useEffect(() => {
       api.get('profile', {
           headers: { 
               Authorization: ongId,       
           }
       }).then(response => {
               setIncidents(response.data); 
    })
   }, [ongId]);

    return( 
       <div className="profile-container" >
           <header>
              <img src={LogoImg} alt="Be the Hero" />
              <span>Bem vinda, {ongName} </span>
              <Link className="button" 
                 to="/incidents/new">Cadastrar novo caso</Link>
              <button type="button">
                  <FiPower size={18} color="#E02041" />
              </button>
           </header>

       <h1>Casos Cadastrados</h1>    
       <ul> 
            {incidents.map( index => (
              <li key={index.id}>
                 <strong>Caso:</strong>
                   <p>{index.title}</p>
                 <strong>Descrição</strong>
                   <p>{index.description}</p>
                 <strong>Valor</strong>
                   <p>R$ {index.value}</p>
                 <button type="button">
                   <FiTrash2 size={20} color="#a8a8b3" />
                 </button>
              </li>  
            ))}
           
       </ul>
       </div>
    );
}