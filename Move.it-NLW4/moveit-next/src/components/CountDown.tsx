
import { useState , useEffect, useContext} from 'react';
import { ChallengeContext } from '../contexts/ChallengeContext';
import { CountDownContext } from '../contexts/CountDownContext';
import styles from '../styles/components/CountDown.module.css';


export function CountDown(){

    const {hasFinished, 
              isActive,
               minutes,
               seconds,
         startCountDown,
         resetCountDown
          } = useContext(CountDownContext);


    // Estudar Isso abaixo
    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');


    return(
        <div> 
      <div className={styles.countdownContainer}>
         <div>
           <span>{minuteLeft}</span>
           <span>{minuteRight}</span>
         </div>
         <span>:</span>
         <div>
           <span>{secondLeft}</span>
           <span>{secondRight}</span>
         </div>
         

         
      </div>

      { hasFinished ? (
        <button 
        disabled
        className={styles.countdownButton}
        >Ciclo Encerrado</button>
        ) : (
          <>
          { isActive ? (
            <button type="button" 
             className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
             onClick={resetCountDown}
             >
             Abandonar Ciclo
            </button>         
           ) : (
             <button type="button" 
              className={styles.countdownButton}
              onClick={startCountDown}
            >
             Iniciar Ciclo
           </button>
           )}
          </>
        )}      
      </div>
      
    );
}