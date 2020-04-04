import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft} from 'react-icons/fi';


import logoImg from '../../assets/logo.svg'
import './style.css';

export default function NewIncident(){
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
        
        <form>
             <input placeholder="Titulo do Caso" />
             <textarea placeholder="Descrição" />
             <input placeholder="Valor em Reais" />       
             <button type="submit" className="button">Cadastrar</button> 
        </form>
    </div>
</div>
    );
}



