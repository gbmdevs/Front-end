import React, { useState } from 'react';
import { Link , useHistory } from 'react-router-dom';
import { FiArrowLeft} from 'react-icons/fi';

//Axios api para requisição
import api from '../../services/api';

import logoImg from '../../assets/logo.svg'
import './style.css';

export default function NewIncident(){
     const [title , setTitle ]            = useState(''); 
     const [description, setDescription]  = useState('');
     const [value, setValue]              = useState('');
     const history   = useHistory();
     const ongId     = localStorage.getItem('ongID');

   async function handleEvent(e){
      e.preventDefault();
      
      const data = {
        title,
        description,
        value
      };

      console.log(data,ongId);
      try{
        await api.post('incidents',data, {
          headers: { 
            Authorization: ongId
          }
        });
        alert('Incidente Cadastrado com Sucesso!');
        history.push('/profile');
      }catch(err){
        alert('Erro ao cadastrar Incidente!');
      }
      

    }
  
    return(       
    <div className="new-incident">
    <div className="content">
        <section>
          <img src={logoImg} alt="be the hero "/>
          <h1>Cadastrar Novo Caso</h1> .
          <p> Descreva o caso detalhadamente 
              para que um heŕoi possa resolve-lo !
          </p>
          
          <Link to="/profile" className="backlink">
            <FiArrowLeft size={16} color="#E02041" />   Voltar para Home
          </Link>
        
        </section>
        
        <form onSubmit={handleEvent}>
             <input placeholder="Titulo do Caso" 
               value = {title}
               onChange = {e => setTitle(e.target.value)}
             />
             <textarea placeholder="Descrição" 
               value = {description}
               onChange = {e => setDescription(e.target.value)}
             
             />
             <input placeholder="Valor em Reais" 
               value = { value }
               onChange = { e => setValue(e.target.value)}
             />       
             <button type="submit" className="button">Cadastrar</button> 
        </form>
    </div>
</div>
    );
}



