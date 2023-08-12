import React from "react";
import MainHeading from "../MainHeading";
import { BanknotesIcon } from "@heroicons/react/24/outline";
import {NumericFormat}  from 'react-number-format';

const Transactions =  [
  {id: 1,"name": "testes","amount": 7000.00,"status": "success","date":"27/06/2023 18:34"},
  {id: 2,"name": "testes","amount": 7000.00,"status": "success","date":"27/06/2023 18:34"},
  {id: 3,"name": "testes","amount": 7000.00,"status": "success","date":"27/06/2023 18:34"},
  {id: 4,"name": "testes","amount": 7000.00,"status": "success","date":"27/06/2023 18:34"}
];


const Activity = () => {
    return (
      <div>
         <MainHeading title="Atividades"/>
         <div className="mt-4 w-full border rouded-md border-gray-200 bg-white">
            <table className="table-auto flex flex-col divide-y-2">
               <thead className="px-6 py-4 bg-indigo-50">
                 <tr className="text-gray-900 text-sm font-medium grid grid-cols-5">
                    <td className="col-span-2 ">Transacoes</td>
                    <td className="col-span-1 grid justify-items-end pr-2">Valor</td>
                    <td className="col-span-1 grid justify-items-center">Status</td>
                    <td className="col-span-1 grid justify-items-end">Data</td>
                 </tr>
               </thead>
               <tbody className="flex flex-col divide-y-2">
                   {Transactions.map( (transaction) => (
                       <tr key={transaction.id} className="px-6 py-4 text-sm font-light grid grid-cols-5">
                          <td className="text-[#84878d] col-span-2 flex space-x-4 items-center">
                            <div className="w-6 h-2 flex items-center">
                                <BanknotesIcon/>
                            </div>
                            <span>Payment para {transaction.name}            
                            </span>
                          </td>
                          <td className="grid justify-items-end"> 
                            <span className="text-gray-800 font-semibold"><NumericFormat prefix="R$ " value={transaction.amount} displayType="text" /></span>
                          </td>
                          <td className="grid justify-items-center"> 
                               <span className={`${transaction.status === "success"
                               ? "text-green-800 bg-green-200 " 
                               : "text-gray-800 bg-gray-200"                              
                              } rounded-lg px-2 py-px text-xs`}>{transaction.status} </span>
                          </td>
                          <td className="grid justify-items-end"> 
                               {transaction.date} 
                          </td>
                       </tr>
                   ))}
               </tbody>
            </table>
         </div>
      </div>
    );
}

export default Activity;