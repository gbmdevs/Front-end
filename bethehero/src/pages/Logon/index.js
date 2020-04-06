import React, { useState }     from 'react'
import { Link, useHistory }  from 'react-router-dom'
import {FiLogIn} from 'react-icons/fi';


// API das Requisições
import api from '../../services/api';

//Images
import Heroes   from '../../assets/heroes.png';
import logoImg  from '../../assets/logo.svg';

import './style.css'

export default function Logon(){
    const [id , setId] = useState('');
    const history      = useHistory();

   async function handleEvent(e){
        e.preventDefault();
 
        try{
          
        const response = await api.post('/session', { id });
 
        localStorage.setItem('ongID', id);
        localStorage.setItem('ongName', response.data.name);
        history.push('/profile');   

        }catch(err){
          alert('Erro na Requisição ao Logon');
        }

    }
    
    return(
        <div className="logon-container">
            <section className="form">
              <img src={logoImg} alt="Be the Hero"></img>
            <form onSubmit={handleEvent}>
                <h1>Faça seu logon</h1>
                <input placeholder="Sua ID"
                  onChange={e => setId(e.target.value)}
                  value={id}
                />
                <button className="button" type="submit" >Entrar</button>
                <Link className="backlink" to="/register">
                    <FiLogIn size={16} color="#E02041" /> Não tenho Cadastro
                </ Link>
            </form>         
            </section>           
            <img src={Heroes} alt="Heroes" />
        </div>
    );
}