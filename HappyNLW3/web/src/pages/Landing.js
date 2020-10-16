import React from 'react';

/*  Estilização Pagina Landing */
import '../styles/pages/landing.css';

/* Icones - react-icons */
import {FiArrowRight} from 'react-icons/fi';


/* Imagens */

import logoImg from '../images/logo.svg';


function Landing(){
  return (
    <div id="page-landing"> 
    <div className="content-wrapper">
        <img src={logoImg} alt="Happy" />
        <main>
          <h1> Leve a felicidade para o mundo.</h1>
          <p>Visite orfanatos e mude o dia de muitas crianças.</p>
        </main>

        <div className="location">
             <strong>Distrito Federal</strong>
             <span>Sobradinho</span>
        </div>
        <a href="#" className="enter-app">
           <FiArrowRight size={26} color="rgba(0 , 0 , 0 , 0.6)" />
        </a>
    </div>
 </div>
  );
}

export default Landing;