
import React, { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Expense, ExpenseCategory } from '@/data/expenses';
import ExpenseFilter, { FilterOptions } from './ExpenseFilter';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { format, addMonths, subMonths } from 'date-fns';
import {
  ShoppingBag,
  Car,
  Home,
  Film,
  Lightbulb,
  Package,
  Edit,
  Trash2,
  ArrowLeft,
  ArrowRight,
  Search,
  type LucideIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination';

interface ExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  expenses: Expense[];
  category?: ExpenseCategory;
}

const categoryIcons: Record<ExpenseCategory, LucideIcon> = {
  food: ShoppingBag,
  transport: Car,
  housing: Home,
  entertainment: Film,
  utilities: Lightbulb,
  other: Package
};

const ITEMS_PER_PAGE = 10;

const ExpenseModal: React.FC<ExpenseModalProps> = ({ 
  isOpen, 
  onClose, 
  expenses,
  category 
}) => {
  const { toast } = useToast();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredExpenses, setFilteredExpenses] = useState<Expense[]>(
    category ? expenses.filter(e => e.category === category) : expenses
  );
  const [displayedExpenses, setDisplayedExpenses] = useState<Expense[]>([]);
  const [activeTab, setActiveTab] = useState<string>(category ? "details" : "details");
  const [currentPage, setCurrentPage] = useState(1);

  // Update displayed expenses when month, search term, or filters change
  useEffect(() => {
    let results = [...filteredExpenses];
    
    // Filter by current month if not in filter tab
    if (activeTab === 'details') {
      results = results.filter(expense => {
        const expenseDate = new Date(expense.date);
        return expenseDate.getMonth() === currentMonth.getMonth() && 
               expenseDate.getFullYear() === currentMonth.getFullYear();
      });
    }
    
    // Filter by search term
    if (searchTerm) {
      results = results.filter(expense => 
        expense.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        expense.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        expense.paymentMethod.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setDisplayedExpenses(results);
    setCurrentPage(1); // Reset pagination when filters change
  }, [filteredExpenses, currentMonth, searchTerm, activeTab]);

  const handleFilter = (filters: FilterOptions) => {
    let results = [...expenses];

    // Filter by date range
    if (filters.dateFrom) {
      results = results.filter(expense => new Date(expense.date) >= new Date(filters.dateFrom));
    }
    if (filters.dateTo) {
      results = results.filter(expense => new Date(expense.date) <= new Date(filters.dateTo));
    }

    // Filter by category
    if (filters.category && filters.category !== 'all') {
      results = results.filter(expense => expense.category === filters.category);
    }

    // Filter by payment method
    if (filters.paymentMethod) {
      results = results.filter(expense => 
        expense.paymentMethod.toLowerCase().includes(filters.paymentMethod.toLowerCase())
      );
    }

    // Filter by amount range
    if (filters.minAmount) {
      results = results.filter(expense => expense.amount >= parseFloat(filters.minAmount));
    }
    if (filters.maxAmount) {
      results = results.filter(expense => expense.amount <= parseFloat(filters.maxAmount));
    }

    setFilteredExpenses(results);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handlePreviousMonth = () => {
    const newDate = subMonths(currentMonth, 1);
    setCurrentMonth(newDate);
    toast({
      title: "Month changed",
      description: `Viewing expenses for ${format(newDate, 'MMMM yyyy')}`,
    });
  };

  const handleNextMonth = () => {
    const newDate = addMonths(currentMonth, 1);
    setCurrentMonth(newDate);
    toast({
      title: "Month changed",
      description: `Viewing expenses for ${format(newDate, 'MMMM yyyy')}`,
    });
  };

  const getCategoryIcon = (category: ExpenseCategory) => {
    const Icon = categoryIcons[category];
    return (
      <div className={`expense-icon expense-${category} inline-flex`}>
        <Icon size={16} />
      </div>
    );
  };

  // Handle edit expense
  const handleEdit = (expense: Expense) => {
    toast({
      title: "Edit Expense",
      description: `Editing ${expense.name}`,
    });
    // In a real app, you would open an edit form or modal
  };

  // Handle delete expense
  const handleDelete = (expense: Expense) => {
    toast({
      title: "Delete Expense",
      description: `${expense.name} would be deleted`,
    });
    // In a real app, you would confirm deletion and remove the expense
  };

  // Calculate the total of displayed expenses
  const totalAmount = displayedExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  
  // Pagination logic
  const totalPages = Math.ceil(displayedExpenses.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedExpenses = displayedExpenses.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  
  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5; // Show at most 5 page numbers
    
    if (totalPages <= maxVisible) {
      // Show all pages if there are 5 or fewer
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);
      
      // Calculate start and end pages to show
      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, startPage + 2);
      
      // Adjust if we're at the end
      if (endPage === totalPages - 1) {
        startPage = Math.max(2, endPage - 2);
      }
      
      // Add ellipsis after first page if needed
      if (startPage > 2) {
        pages.push("ellipsis-start");
      }
      
      // Add middle pages
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      
      // Add ellipsis before last page if needed
      if (endPage < totalPages - 1) {
        pages.push("ellipsis-end");
      }
      
      // Always show last page if there's more than one page
      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Expense Details</DialogTitle>
          <DialogDescription>
            {category 
              ? `View and filter your ${category} expenses` 
              : 'View and filter all your expenses'}
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue={activeTab} className="flex-1 flex flex-col min-h-0" onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="filter">Filter</TabsTrigger>
          </TabsList>
          
          <TabsContent value="details" className="flex-1 flex flex-col min-h-0">
            <div className="flex flex-col space-y-4">
              {/* Month Navigator */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={handlePreviousMonth}
                    className="h-8 w-8"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    <span className="sr-only">Previous month</span>
                  </Button>
                  
                  <span className="text-sm font-medium">
                    {format(currentMonth, 'MMM yyyy')}
                  </span>
                  
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={handleNextMonth}
                    className="h-8 w-8"
                  >
                    <ArrowRight className="h-4 w-4" />
                    <span className="sr-only">Next month</span>
                  </Button>
                </div>
                
                {/* Search Input */}
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search expenses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 h-9 w-full md:w-[200px]"
                  />
                </div>
              </div>
              
              <div className="text-sm text-muted-foreground">
                Showing {displayedExpenses.length > 0 ? startIndex + 1 : 0}-{Math.min(startIndex + ITEMS_PER_PAGE, displayedExpenses.length)} of {displayedExpenses.length} expenses 
                totaling ${totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
            </div>
            
            <ScrollArea className="flex-1 mt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Payment Method</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead className="w-[100px] text-center">Status</TableHead>
                    <TableHead className="w-[100px] text-center">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedExpenses.length > 0 ? (
                    paginatedExpenses.map((expense) => {
                      // Determine status (in a real app, this would be part of your data model)
                      const isPaid = expense.id.charCodeAt(0) % 2 === 0; // Simple mock logic based on ID
                      return (
                        <TableRow key={expense.id}>
                          <TableCell>
                            {format(new Date(expense.date), 'MMM dd, yyyy')}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {getCategoryIcon(expense.category)}
                              <span className="capitalize">{expense.category}</span>
                            </div>
                          </TableCell>
                          <TableCell>{expense.name}</TableCell>
                          <TableCell>{expense.paymentMethod}</TableCell>
                          <TableCell className="text-right font-medium">
                            ${expense.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </TableCell>
                          <TableCell className="text-center">
                            <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                              isPaid 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-orange-100 text-orange-800'
                            }`}>
                              {isPaid ? 'Paid' : 'Pending'}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex justify-center gap-2">
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                onClick={() => handleEdit(expense)}
                                className="h-8 w-8"
                              >
                                <Edit className="h-4 w-4" />
                                <span className="sr-only">Edit</span>
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                onClick={() => handleDelete(expense)}
                                className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                              >
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">Delete</span>
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                        No expenses found with the current filters.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </ScrollArea>
            
            {totalPages > 1 && (
              <div className="mt-4">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious 
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                      />
                    </PaginationItem>
                    
                    {getPageNumbers().map((pageNum, i) => (
                      <PaginationItem key={i}>
                        {pageNum === "ellipsis-start" || pageNum === "ellipsis-end" ? (
                          <div className="flex h-9 w-9 items-center justify-center">
                            <span>...</span>
                          </div>
                        ) : (
                          <PaginationLink
                            isActive={currentPage === pageNum}
                            onClick={() => typeof pageNum === 'number' && setCurrentPage(pageNum)}
                            className="cursor-pointer"
                          >
                            {pageNum}
                          </PaginationLink>
                        )}
                      </PaginationItem>
                    ))}
                    
                    <PaginationItem>
                      <PaginationNext
                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                        className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="filter" className="flex-1">
            <ExpenseFilter onFilter={handleFilter} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default ExpenseModal;