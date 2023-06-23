import React from "react";

import {ScaleIcon,ArrowPathRoundedSquareIcon,CheckCircleIcon} from "@heroicons/react/24/outline";

const Statements = [
    {id:"accountBalance","name":"accountBalance","amount":14500,"icon":<ScaleIcon/>},
    {id:"accountBalance","name":"accountBalance","amount":14500,"icon":<ArrowPathRoundedSquareIcon/>},
    {id:"accountBalance","name":"accountBalance","amount":14500,"icon":<CheckCircleIcon/>}
];


const Overview = () => {
    return(
       <div>
         <h1 className="text-xl font-bold text-gray-900">Overview</h1>        
       <div className="flex space-x-8">
         {Statements.map(statement => 
           <div key={statement.id} className="grid grid-cols-1 border border-gray-200 rounded-lg w-[360px] bg-white shadow-md">
             <div className="flex space-x-4 items-center py-4">
                <div className="text-gray-400 w-14 h-14 px-4">{statement.icon}</div>
                <div className="flex flex-col">
                    <div className="text-sm text-gray-600 font-light">{statement.name}</div>
                    <div className="text-gray-800 font-bold">{statement.amount}</div>
                </div>
             </div>
             <button className="text-pink-600 flex items-start bg-pink-50 pl-4 ">View all</button> 
           </div>
          )}
       </div>
       </div> 
    );
}

export default Overview;