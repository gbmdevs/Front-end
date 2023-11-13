import React from "react";
import Menu from "../Menu";
import { ClockIcon, HomeIcon } from "@heroicons/react/24/outline";

const Tabs = {
    upperTabs: [
      {
         icon: <HomeIcon/>, name:"Home", current:"true"
      },
      {
        icon: <ClockIcon/>, name:"Historico", current:"false"
     }
    ]
}

const Sidebar = () => {
    return (
       <div className="bg-indigo-600 h-full w-full overflow-hidden py-10">
           <img
             src="https://cdn-icons-png.flaticon.com/128/1507/1507120.png"
             alt="logo"
             className="w-12 h-12 rounded-full px-4"
           />
           <Menu Tabs={Tabs}/>
       </div>
    );
}

export default Sidebar;