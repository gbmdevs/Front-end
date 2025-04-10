import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { expenses, getExpensesByCategory, getTotalExpenses, getPaymentMethodDistribution, ExpenseCategory } from '@/data/expenses';
import ExpenseCard from '@/components/ExpenseCard';

import StatsSummary from '@/components/StatsSummary';

const Index = () =>{ 
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<ExpenseCategory | undefined>(undefined);
  
  // Get expense data
  const categoryExpenses = getExpensesByCategory();
  const totalExpenses = getTotalExpenses();
  const paymentMethods = getPaymentMethodDistribution();

  // Calculate average daily expense (using last 30 days)
  const averageDaily = totalExpenses / 30;

  const handleCardClick = (category: ExpenseCategory) => {
    setSelectedCategory(category);
    setModalOpen(true); 
  };

  const handleViewAll = () => {
    setSelectedCategory(undefined);
    setModalOpen(true); 
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Resumo contas bancárias</h1>
          <p className="text-muted-foreground">Planilha pessoa para controle familiar.</p>

        </div>
        
                         
      <Button 
          onClick={handleViewAll}
          className="w-full md:w-auto mt-4 md:mt-0"
        >
          View All Expenses
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Main content */}
          <div className="w-full md:w-2/3">
            <StatsSummary 
              totalSpent={totalExpenses}
              averageDaily={averageDaily}
              categoryData={categoryExpenses}
              paymentMethodData={paymentMethods}
            />
          </div>

          {/* Vertical separator - Extended to full height */}
          <div className="hidden md:block">
            <Separator orientation="vertical" className="h-full bg-border" />
          </div>
          
          {/* Expense Categories */}
          <div className="w-full md:w-1/3 space-y-4 pl-0 md:pl-5">
            <h2 className="text-2xl font-semibold">Expense Categories</h2>
            <div className="space-y-4">
              {(Object.keys(categoryExpenses) as ExpenseCategory[]).map((category) => (
                <ExpenseCard
                  key={category}
                  title={category.charAt(0).toUpperCase() + category.slice(1)}
                  amount={categoryExpenses[category]}
                  category={category}
                  onClick={() => handleCardClick(category)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Expense Modal 
      <ExpenseModal 
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        expenses={expenses}
        category={selectedCategory}
      />*/}
    </div>
  );
}; 
export default Index;