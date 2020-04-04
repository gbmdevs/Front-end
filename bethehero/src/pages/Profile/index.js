import React  from 'react'
import { Link } from 'react-router-dom';
import { FiPower , FiTrash2 } from 'react-icons/fi';

// Axios
import api from '../../services/api';

import './style.css';

// Imagens
import LogoImg from '../../assets/logo.svg';


export default function Profile(){
     
    async function handleEvent(e){
      e.preventDefault();
      
      const response = await api.get('ongs');
      
      /*
      response.data.map(data => {
         console.log(data.id);
      }) ; */
      
       
       
    }

    return( 
       <div className="profile-container" >
           <header>
              <img src={LogoImg} alt="Be the Hero" />
              <span>Bem vinda, APAD</span>
              <Link className="button" 
                 to="/incidents/new">Cadastrar novo caso</Link>
              <button type="button">
                  <FiPower size={18} color="#E02041" />
              </button>
           </header>

       <h1>Casos Cadastrados</h1>    
       <ul> 
           <li>
               <strong>Caso:</strong>
               <p>Caso teste</p>
               <strong>Descrição</strong>
               <p>Descrição Teste</p>
               <strong>Valor</strong>
               <p>R$ 120 Pro Mozão Designer</p>
               <button type="button">
                   <FiTrash2 size={20} color="#a8a8b3" />
               </button>
           </li>

           <li>
               <strong>Caso:</strong>
               <p>Caso teste</p>
               <strong>Descrição</strong>
               <p>Descrição Teste</p>
               <strong>Valor</strong>
               <p>R$ 120 Mangas</p>
               <button type="button">
                   <FiTrash2 size={20} color="#a8a8b3" />
               </button>
           </li>
     
           <li>
               <strong>Caso:</strong>
               <p>Caso teste</p>
               <strong>Descrição</strong>
               <p>Descrição Teste</p>
               <strong>Valor</strong>
               <p>R$ 120 Mangas</p>
               <button type="button">
                   <FiTrash2 size={20} color="#a8a8b3" />
               </button>
           </li>
        
           <li>
               <strong>Caso:</strong>
               <p>Caso teste</p>
               <strong>Descrição</strong>
               <p>Descrição Teste</p>
               <strong>Valor</strong>
               <p>R$ 120 Mangas</p>
               <button type="button">
                   <FiTrash2 size={20} color="#a8a8b3" />
               </button>
           </li>
       </ul>
       </div>
    );
}