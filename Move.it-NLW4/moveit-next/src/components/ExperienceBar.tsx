import { useContext, useState } from 'react';
import { ChallengeContext } from '../contexts/ChallengeContext';
import styles from '../styles/components/ExperienceBar.module.css'; 
  

export function ExperienceBar(){

    const { currentExperience , experiencePorcent } = useContext(ChallengeContext); 

    return(
      <header className={styles.experienceBar}>
          <span>0 xp</span>
          <div>
               <div style={{width: `${experiencePorcent}%`}} />
               <span className={styles.currentExperience} style={{ left: `${experiencePorcent}%`}}>{currentExperience} xp</span>
          </div>
          <span>600 xp</span>
      </header>
    );
}