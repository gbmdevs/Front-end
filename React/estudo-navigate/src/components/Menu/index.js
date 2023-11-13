import React from "react";

function MenuTabs({kindTabs}){
  return(
   <div className="px-4 flex flex-col ">
      {kindTabs.map(tab => (
           <button className={`${tab.current ==="true" && "bg-indigo-700"} px-4 py-2 rounded-md text-white flex items-center gap-x-4 hover:bg-indigo-500`}>
              <div className="w-6 h-6">{tab.icon}</div>
              <div>{tab.name}</div>
          </button>
      ))}
   </div>);
}

const Menu = ({Tabs}) => {
   return (
       <div className="divide-y-2 divide-indigo-800 grid grid-cols-1 gap-y-4">
           <MenuTabs kindTabs={Tabs.upperTabs} />
           <MenuTabs kindTabs={Tabs.lowerTabs} />
      </div>
   );
}

export default Menu;