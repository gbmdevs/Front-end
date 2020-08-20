import React           from 'react';
import { render }      from 'react-dom';

import logoImg         from '../../assets/images/logo.svg'
import landingImg      from '../../assets/images/landing.svg'

//Icones
import studyIcon       from '../../assets/images/icons/study.svg'
import giveClassesIcon from '../../assets/images/icons/give-classes.svg'
import purpleHeart     from '../../assets/images/icons/purple-heart.svg'


function Landing(){
    return (
        <div  id="page-lading">
            <div id="page-lading-content" className="container">
                <div className="logo-container">
                    <img src={logoImg} alt="Proffy" />
                    <h2> Sua plataforma de estudos online</h2>
                </div>
                   <img src={landingImg} alt="Plataforma de Estudos" className="hero-image"/>
                <div className="buttons-container">
                      <a href="" className="study">
                         <img src={studyIcon} alt=""/>
                         Estudar
                      </a>
                      <a href="" className="study">
                         <img src={giveClassesIcon} alt=""/>
                         Estudar
                      </a>
                </div>
                <span className="total-connections">
                    Total de 200 Conexões já realizadas. <img src={purpleHeart} alt="Coração Roxo"/>
                </span>
            </div>
        </div>
    );
}

export default Landing;