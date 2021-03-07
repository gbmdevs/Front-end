import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengeContext } from "./ChallengeContext";




interface CountDownContextData{
    minutes: number,
    seconds: number,
    hasFinished: boolean,
    isActive: boolean,
    startCountDown: () => void,
    resetCountDown: () => void
}

interface CountDownProviderProps{
    children: ReactNode;
}



export const CountDownContext = createContext( {} as CountDownContextData);


export function CountDownProvider({children}: CountDownProviderProps ){
    
    // Estudar Isso
    let countdownTimeOut: NodeJS.Timeout;

    const { newChallenge } = useContext(ChallengeContext);
  
    const [time, setTime ] = useState(0.05 * 60);
    const [isActive, setActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60 ;

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
        <CountDownContext.Provider value=
          {{
           minutes,
           seconds,
           hasFinished,
           isActive,
           startCountDown,
           resetCountDown
          }}
        >
             {children}
        </CountDownContext.Provider>
    )
} 
