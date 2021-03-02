
import { useState , useEffect} from 'react';
import styles from '../styles/components/CountDown.module.css';

export function CountDown(){
    
    const [time, setTime ] = useState(25 * 60);
    const [isActive, setActive] = useState(false);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60 ;

    // Estudar Isso abaixo
    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

    function startCountDown(){
        setActive(true);
    }

    function resetCountDown(){
       setActive(false)
    }
    

    // Estudar isso abaixo 
    useEffect(() => {
        if(isActive && time > 0){
            setTimeout(() => {
            setTime(time - 1);
            }, 1000);
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

      
      </div>
      
    );
}