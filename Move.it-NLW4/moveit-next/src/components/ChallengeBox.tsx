import { useContext } from 'react';
import { ChallengeContext } from '../contexts/ChallengeContext';
import styles from '../styles/components/ChallengeBox.module.css';

export function ChallengeBox(){
    
    const contextData = useContext(ChallengeContext);

    const hasChallengeActive = true;

    console.log(contextData);

    return(
        <div className={styles.challengeBoxContainer}>

         { hasChallengeActive ? (
             <div className={styles.challengeActive}>
                 <header>Ganhe 400 xp</header>
                 <main>
                     <img src="icons/body.svg" alt="Body"/>
                     <strong>Novo Desafio</strong>
                     <p>Levante e faça uma caminhada de 3 minutos</p>
                 </main>
                 <footer>
                     <button type='button'
                             className={styles.challengeFailedButton}
                     > Falhei    
                     </button>
                     <button type='button'
                             className={styles.challengeSuccessedButton}
                     > Completei
                     </button>
                 </footer>
             </div>
          ) : ( 
             <div className={styles.challengeNotActive}>
               <strong>Finalize um ciclo para receber um desafio</strong>
               <p>
                   <img src="icons/level-up.svg" alt="Level up"/>
                   Avance de level completando desafios.
               </p>
              </div>
          )}

        </div>
    )
}