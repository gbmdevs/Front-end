import styles from '../styles/components/ChallengeBox.module.css';

export function ChallengeBox(){
    return(
        <div className={styles.challengBoxContainer}>
            <div className={styles.challengNotActive}>
              <strong>Finalize um ciclo para receber um desafio</strong>
              <p>
                   <img src="icons/level-up.svg" alt="Level up"/>
                   Avance de level completando desafios.
              </p>
            </div>
        </div>
    )
}