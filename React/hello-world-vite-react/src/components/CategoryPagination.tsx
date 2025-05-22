
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExpenseCategory } from '@/data/expenses';
import ExpenseCard from '@/components/ExpenseCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CategoryPaginationProps {
  categories: ExpenseCategory[];
  expenses: Record<ExpenseCategory, number>;
  onCardClick: (category: ExpenseCategory) => void;
}

const ITEMS_PER_PAGE = 3;

const CategoryPagination = ({ categories, expenses, onCardClick }: CategoryPaginationProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  
  // Calculate pagination
  const totalPages = Math.ceil(categories.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedCategories = categories.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Status based on the category (in a real app, this would come from your data)
  const getExpenseStatus = (category: ExpenseCategory): 'Paid' | 'Pending' => {
    // This is just a mock logic for demo purposes
    // In a real app, this would be determined by your actual expense data
    const randomStatus = Math.random() > 0.5 ? 'Paid' : 'Pending';
    return randomStatus as 'Paid' | 'Pending';
  };

  const handlePreviousPage = () => {
    setCurrentPage(prev => Math.max(1, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(totalPages, prev + 1));
  };

  return (
    <div className="space-y-4">
      {/* Categories */}
      <div className="space-y-4">
        {paginatedCategories.map((category) => (
          <div key={category} className="relative">
            <ExpenseCard
              title={category.charAt(0).toUpperCase() + category.slice(1)}
              amount={expenses[category]}
              category={category}
              onClick={() => onCardClick(category)}
            />
            <div className="absolute top-3 right-3">
              <Badge 
                variant={getExpenseStatus(category) === 'Paid' ? 'default' : 'outline'}
                className={
                  getExpenseStatus(category) === 'Paid' 
                    ? 'bg-green-500 hover:bg-green-600' 
                    : 'border-orange-500 text-orange-500'
                }
              >
                {getExpenseStatus(category)}
              </Badge>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center space-x-2 mt-4">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="h-8 w-8 p-0"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous page</span>
          </Button>
          
          <span className="text-sm">
            Page {currentPage} of {totalPages}
          </span>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="h-8 w-8 p-0"
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next page</span>
          </Button>
        </div>
      )}
    </div>
  );
};

export default CategoryPagination;