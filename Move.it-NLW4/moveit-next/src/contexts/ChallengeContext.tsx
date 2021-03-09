import { createContext, ReactNode, useEffect, useState } from 'react';
import challenges from '../../challenges.json';

interface Challenge { 
    type: 'body' | 'eye',
    description: string,
    amount: number
}


interface ChallengeContextData{ 
    level: number,
    currentExperience: number,
    challengesCompleted: number,
    experienceToNextLevel: number,
    levelUp: () => void, 
    newChallenge: () => void,
    activeChallenge: Challenge,
    resetChallenge: () => void,
    completeChallenge: () => void
}

interface ChallengeProviderProps{
    children: ReactNode;
}

export const ChallengeContext = createContext({} as ChallengeContextData);

export function ChallengeProvider({ children}: ChallengeProviderProps){

    const [ level , setLevel]                             = useState(1);
    const [ currentExperience, setCurrentExperience]      = useState(0);
    const [ challengesCompleted, setChallengesCompleted ] = useState(0);
    const [ activeChallenge, setActiveChallenge]          = useState(null);
    const [ experiencePorcent , setExperiencePorcent]     = useState(0);

    // Log - Experiencia utilizadas em RPG - Estudar
    const experienceToNextLevel  = Math.pow((level + 1 ) * 4 , 2)


    // Array vazio, a função so sera executado uma unica vez quando o componente for exibido em tela
    useEffect(() => {
      Notification.requestPermission();
    }, []);


    function levelUp(){
      setLevel(level + 1 );
    }

    function newChallenge(){
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallengeIndex];
        setActiveChallenge(challenge);   

        // Ta na pasta public
        new Audio('/notification.mp3').play();

        if(Notification.permission === 'granted'){
           new Notification('Novo desafio 🎉',{
             body: `Valendo ${challenge.amount}xp!`
           }
        );
        }
    }

    function resetChallenge(){
        setActiveChallenge(null);
    }

    function completeChallenge(){
        if(!activeChallenge){
            return;
        }

        const { amount }    = activeChallenge;

        let finalExperience = currentExperience + amount;

        if(finalExperience >= experienceToNextLevel ){
            finalExperience = finalExperience - experienceToNextLevel;
            levelUp();
        }
        
        setCurrentExperience(finalExperience);
        setActiveChallenge(null);
        setChallengesCompleted(challengesCompleted + 1);

    } 
 


    return(
     <ChallengeContext.Provider 
       value={{
           level,
           currentExperience,
           challengesCompleted,
           experienceToNextLevel,
           levelUp,
           newChallenge,
           activeChallenge,
           resetChallenge,
           completeChallenge
        }}>
       {children}    
     </ChallengeContext.Provider>
  );
}