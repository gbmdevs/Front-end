import React from "react";

import {ArrowPathRoundedSquareIcon,CheckCircleIcon, BanknotesIcon} from "@heroicons/react/24/outline";
import MainHeading from "../MainHeading";

const Statements = [
    {id:"contaItau","name":"Conta ITI - Itau","amount": "R$ 14.500","icon":<BanknotesIcon/>},
    {id:"bancoInter","name":"Banco Inter","amount": "R$ 0,0","icon":<ArrowPathRoundedSquareIcon/>},
    {id:"accountBalance","name":"accountBalance","amount":14500,"icon":<CheckCircleIcon/>}
];


const Overview = () => {
    return(
       <div>
       <MainHeading title="Resumo"/>   
       <div className="lg:flex lg:space-x-8 mt-4 sm:grid sm:gap-y-4">
         {Statements.map(statement => 
           <div key={statement.id} className="grid grid-cols-1 border border-gray-200 rounded-lg w-[360px] bg-white shadow-md">
             <div className="flex space-x-4 items-center py-4">
                <div className="text-gray-400 w-14 h-14 px-4 flex items-center">{statement.icon}</div>
                <div className="flex flex-col">
                    <div className="text-sm text-gray-600 font-light">{statement.name}</div>
                    <div className="text-green-800 font-bold">{statement.amount}</div>
                </div>
             </div>
             <button className="text-indigo-600 hover:text-indigo-800 flex items-start bg-indigo-50 pl-4 py-2">Detalhar</button> 
           </div>
          )}
       </div>
       </div> 
    );
}

export default Overview;