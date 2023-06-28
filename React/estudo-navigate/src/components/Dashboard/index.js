import React from "react";

import Overview from '../Overview/';
import Activity from '../Activity/';

const Deashboard = () => {
    return (
      <div className="grid grid-cols-1 gap-y-8 bg-[#f3f4f6] px-8 py-8">
         <div><Overview/></div>
         <div><Activity/></div>
      </div>
    );
}

export default Deashboard;