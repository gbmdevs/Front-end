
import { useState , useEffect, useContext} from 'react';
import { ChallengeContext } from '../contexts/ChallengeContext';
import styles from '../styles/components/CountDown.module.css';

// Estudar Isso
let countdownTimeOut: NodeJS.Timeout;

export function CountDown(){
    const { newChallenge } = useContext(ChallengeContext);
  
    const [time, setTime ] = useState(0.05 * 60);
    const [isActive, setActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60 ;

    // Estudar Isso abaixo
    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

    function startCountDown(){
        setActive(true);
    }

    function resetCountDown(){
       clearTimeout(countdownTimeOut);
       setActive(false);
       setTime(0.05 * 60);
    }
    

    // Estudar isso abaixo 
    useEffect(() => {
        if(isActive && time > 0){
           countdownTimeOut =  setTimeout(() => {
            setTime(time - 1);
            }, 1000);
        } else if (isActive && time == 0){
            setHasFinished(true);
            setActive(false);
            newChallenge();
        }
    }, [isActive, time]);

    
      // Estudar If ternario
     

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