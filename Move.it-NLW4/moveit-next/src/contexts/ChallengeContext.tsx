import { createContext, ReactNode, useState } from 'react';
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
    resetChallenge: () => void

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

    function levelUp(){
      setLevel(level + 1 );
    }

    function newChallenge(){
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallengeIndex];
        setActiveChallenge(challenge);   
    }

    function resetChallenge(){
        setActiveChallenge(null);
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
           resetChallenge
        }}>
       {children}    
     </ChallengeContext.Provider>
  );
}