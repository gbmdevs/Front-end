import React from "react";
import {BellIcon, MagnifyingGlassIcon} from "@heroicons/react/24/outline";


const ProfileHeader = () => {
  return(
       <div className="flex justify-between pb-4">
           <div className="flex gap-x-2 items-center">
              <div className="w-6 h-6">
                <MagnifyingGlassIcon/>
              </div>
              Search Transations
           </div>
           <div className="flex gap-x-2 items-center">
              <div className="w-6 h-6">
                <BellIcon/>
              </div>
              <div className="flex items-center gap-x-2">
                <span className="flex items-center space-x-2">
                  Guilherme G.
                </span>
              </div>
           </div>
       </div>
  );
}

export default ProfileHeader;