
import React from "react"

import Sidebar from '../../components/Sidebar';
import ProfileWrapper from "../../components/ProfileWrapper";
import Dashboard from "../../components/Dashboard";

const MainPage = () => {
   return(
    <div className="flex items-center justify-center mx-auto  sm:max-w-7xl border border-gray-200 rounded">
      <div className="grid grid-cols-3 space-x-4 w-full divide-x-2 w-full" >
      <div className="col-span-1">      
          <Sidebar/>
      </div>
          <div className="col-span-2">             
             <ProfileWrapper/>
             <Dashboard/>
          </div>
      </div>
   </div>
   )
}

export default MainPage;