import { CheckCircleIcon } from "@heroicons/react/24/outline";
import React from "react";



const ProfilesButtons = [ 
    { name: "Adicionar", bg:"bg-white",color:"text-gray-900"},
    { name: "Deletar", bg:"bg-indigo-500",color:"text-white"}
]

const ProfileBody = ({user}) => {
    return(
      <div className="flex justify-between">
        <div className="flex space-x-4"> 
            <div>
               <h1 className="text-gray-900 font-bold text-2xl">
                    {user.name}
               </h1>
               <div className="flex items-center space-x-4">
                    <p className="text-sm text-[#84878d] font-light">
                        {user.profission}
                    </p>
                    <div className="flex items-center space-x-2">
                        <span className={`${user.verified && "bg-green-600 text-white"} w-4 h-4 outline-none rounded-full`}><CheckCircleIcon/></span>
                        <span>Conta verificada</span>
                    </div>
               </div>
            </div>     
                 
        </div>
        <div className="py-4 flex justify-between">
        <div className="flex space-x-2">
            {ProfilesButtons.map((pbutton) => (
                  <button className={`${pbutton.bg} ${pbutton.color} border rounded-md px-4 py-2 text-sm`}>{pbutton.name} Valor</button>
            ))}
        </div>
        </div>
      </div>
    )

}

export default ProfileBody;