import { Action } from '@ngrx/store'; 

class Decremnet implements Action{
    readonly type = 'Decrement'
}

class Increment implements Action{
    readonly type = 'Increment'
}

const INITIAL_STATE = {
    counter: 0
}
 
 export const reducer = (state = INITIAL_STATE, action: Action) =>{
   switch(action.type){
       case 'Decrement':
         return { ...state, counter: state.counter - 1}
       case 'Increment':
         return { ...state, counter: state.counter + 2}
   }
}
