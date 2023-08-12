import React from "react";
import ProfileBody from "../ProfileBody";
import ProfileHeader from "../ProfileHeader";

const User = {
  "name": "Guilherme Gois" ,
  "profission": "Analista de Sistemas",
  "verified": true
}

const ProfileWrapper = () => {
  return(
     <div className="bg-white divide-y-2 divide-gray-100 px-8 py-8 border-b border-gray-200 shadow-lg">
       <ProfileHeader/>
       <ProfileBody user={User}/>
     </div>
     
  );
}

export default ProfileWrapper;