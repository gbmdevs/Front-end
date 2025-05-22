
import { useState } from 'react';
import { expenses, getExpensesByCategory, getTotalExpenses, getPaymentMethodDistribution, ExpenseCategory } from '@/data/expenses';
import ExpenseCard from '@/components/ExpenseCard';
import ExpenseModal from '@/components/ExpenseModal';
import StatsSummary from '@/components/StatsSummary';
import MonthNavigator from '@/components/MonthNavigator';
import CategoryPagination from '@/components/CategoryPagination';
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

const Index = () => {
  const { toast } = useToast();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<ExpenseCategory | undefined>(undefined);
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // Get expense data
  const categoryExpenses = getExpensesByCategory();
  const totalExpenses = getTotalExpenses();
  const paymentMethods = getPaymentMethodDistribution();
  
  // Calculate average daily expense (using last 30 days)
  const averageDaily = totalExpenses / 30;

  const handleCardClick = (category: ExpenseCategory) => {
    setSelectedCategory(category);
    setModalOpen(true);
    toast({
      title: `Viewing ${category} expenses`,
      description: `Total: $${categoryExpenses[category].toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
    });
  };

  const handleViewAll = () => {
    setSelectedCategory(undefined);
    setModalOpen(true);
    toast({
      title: "Viewing all expenses",
      description: `Total: $${totalExpenses.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
    });
  };

  const handleMonthChange = (date: Date) => {
    setCurrentDate(date);
    toast({
      title: "Month changed",
      description: `Viewing expenses for ${date.toLocaleString('default', { month: 'long', year: 'numeric' })}`,
    });
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Expense Dashboard</h1>
          <p className="text-muted-foreground">Track and analyze your spending habits</p>
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
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Expense Categories</h2>
              <MonthNavigator 
                currentDate={currentDate}
                onMonthChange={handleMonthChange}
              />
            </div>
            
            <CategoryPagination 
              categories={Object.keys(categoryExpenses) as ExpenseCategory[]}
              expenses={categoryExpenses}
              onCardClick={handleCardClick}
            />
          </div>
        </div>
      </div>

      {/* Expense Modal */}
      <ExpenseModal 
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        expenses={expenses}
        category={selectedCategory}
      />
    </div>
  );
};

export default Index;