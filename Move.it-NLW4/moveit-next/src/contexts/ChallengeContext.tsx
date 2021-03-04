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
    experiencePorcent: number,
    levelUp: () => void, 
    newChallenge: () => void,
    activeChallenge: Challenge,
    addExperience: (number) => void
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


    function levelUp(){
      setLevel(level + 1 );
    }

    function newChallenge(){
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallengeIndex];
        setActiveChallenge(challenge);   
    }

    function addExperience(newExp: number){ 
        let exp     = currentExperience +  newExp;
        console.log(exp);
        if(exp > 600){
            exp - 600;
        }
        const porcent = (exp / 600 ) * 100; 
        setExperiencePorcent(porcent);
        setCurrentExperience(exp); 
    }


    return(
     <ChallengeContext.Provider 
       value={{
           level,
           currentExperience,
           challengesCompleted,
           experiencePorcent,
           levelUp,
           newChallenge,
           activeChallenge,
           addExperience
        }}>
       {children}    
     </ChallengeContext.Provider>
  );
}