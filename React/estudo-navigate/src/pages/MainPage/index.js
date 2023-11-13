
import React from "react"

import Sidebar from '../../components/Sidebar';
import ProfileWrapper from "../../components/ProfileWrapper";
import Dashboard from "../../components/Dashboard";

const MainPage = () => {
   return(
    <div className="flex items-center justify-center mx-auto 
    border-gray-200 overflow-hidden">
      <div className="grid grid-cols-4 w-full">      
          <Sidebar/>

          <div className="col-span-3">             
             <ProfileWrapper/>
             <Dashboard/>
          </div>
      </div>
      </div>
   )
}

export default MainPage;