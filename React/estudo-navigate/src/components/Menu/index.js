import React from "react";


const Menu = ({Tabs}) => {
  return <div className="divide-y-2 grid grid-cols-1 gap-y-4">
     <div className="px-4 my-4">
        {Tabs.upperTabs.map(tab => (
             <button className={`${tab.current ==="true" && "bg-indigo-700"} px-4 py-2 rounded-md text-white flex items-center gap-x-4 hover:bg-indigo-500`}>
                <div className="w-6 h-6">{tab.icon}</div>
                <div>{tab.name}</div>
            </button>
        ))}
     </div>
     <div className="px-4 mt-4">Lower</div>
  </div>
}

export default Menu;