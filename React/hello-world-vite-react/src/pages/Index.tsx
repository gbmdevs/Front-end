import { useState } from 'react';
import { Button } from "@/components/ui/button";

const Index = () =>{
    return ( 
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Expense Dashboard</h1>
          <p className="text-muted-foreground">Track and analyze your spending habits</p>
        </div>
      </div>
      {/* View All Expenses Button - Now outside columns */}
      <div className="mb-6">
        <Button  
          className="w-full md:w-auto"
        >
          View All Expenses
        </Button>
      </div>
   </div>  
   );
}
export default Index;