import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Filter, Calendar, ChevronDown, Download, ChevronLeft, ChevronRight } from 'lucide-react';
import { mockExpenses, categories } from '../../data/mockData';
import { Expense } from '../../types/Expense';
import { motion } from 'framer-motion';

const ITEMS_PER_PAGE = 10;

const ExpensesPage = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedMonth, setSelectedMonth] = useState<string>('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState<'date' | 'amount'>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  
  useEffect(() => {
    setExpenses(mockExpenses);
  }, []);
  
  // Create a map of category IDs to category objects for quick lookup
  const categoryMap = useMemo(() => {
    return categories.reduce((map, category) => {
      map[category.id] = category;
      return map;
    }, {} as Record<string, typeof categories[0]>);
  }, []);
  
  // Get unique months from expenses
  const months = useMemo(() => {
    const uniqueMonths = new Set<string>();
    
    mockExpenses.forEach(expense => {
      const date = new Date(expense.date);
      const monthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      uniqueMonths.add(monthYear);
    });
    
    return Array.from(uniqueMonths).sort().reverse();
  }, [mockExpenses]);
  
  // Format month for display
  const formatMonth = (monthStr: string) => {
    const [year, month] = monthStr.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return date.toLocaleDateString(undefined, { month: 'long', year: 'numeric' });
  };
  
  // Filter and sort expenses
  const filteredExpenses = useMemo(() => {
    return expenses
      .filter(expense => {
        // Search filter
        const matchesSearch = searchTerm === '' || 
          expense.description.toLowerCase().includes(searchTerm.toLowerCase());
        
        // Category filter
        const matchesCategory = selectedCategory === '' || expense.category === selectedCategory;
        
        // Month filter
        const matchesMonth = selectedMonth === '' || expense.date.startsWith(selectedMonth);
        
        return matchesSearch && matchesCategory && matchesMonth;
      })
      .sort((a, b) => {
        // Sort by date or amount
        if (sortBy === 'date') {
          return sortDirection === 'desc'
            ? new Date(b.date).getTime() - new Date(a.date).getTime()
            : new Date(a.date).getTime() - new Date(b.date).getTime();
        } else {
          return sortDirection === 'desc'
            ? b.amount - a.amount
            : a.amount - b.amount;
        }
      });
  }, [expenses, searchTerm, selectedCategory, selectedMonth, sortBy, sortDirection]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredExpenses.length / ITEMS_PER_PAGE);
  const paginatedExpenses = filteredExpenses.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
  
  // Calculate total for filtered expenses
  const total = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };
  
  // Toggle sort
  const toggleSort = (column: 'date' | 'amount') => {
    if (sortBy === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortDirection('desc');
    }
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Expenses</h1>
        <Link 
          to="/expenses/add"
          className="btn btn-primary btn-sm lg:btn-md flex items-center"
        >
          <Plus size={18} className="mr-1" />
          Add Expense
        </Link>
      </div>
      
      {/* Filters & Search */}
      <div className="card p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search expenses..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="input pl-10"
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="btn btn-secondary flex items-center"
            >
              <Filter size={18} className="mr-2" />
              Filters
              <ChevronDown size={16} className={`ml-1 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
            </button>
            
            <button className="btn btn-secondary flex items-center">
              <Download size={18} className="mr-2" />
              Export
            </button>
          </div>
        </div>
        
        {/* Expanded filters */}
        {isFilterOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="mt-4 pt-4 border-t border-gray-200 overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="category-filter" className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  id="category-filter"
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="input"
                >
                  <option value="">All Categories</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="month-filter" className="block text-sm font-medium text-gray-700 mb-1">
                  Month
                </label>
                <select
                  id="month-filter"
                  value={selectedMonth}
                  onChange={(e) => {
                    setSelectedMonth(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="input"
                >
                  <option value="">All Time</option>
                  {months.map(month => (
                    <option key={month} value={month}>
                      {formatMonth(month)}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="sort-by" className="block text-sm font-medium text-gray-700 mb-1">
                  Sort By
                </label>
                <select
                  id="sort-by"
                  value={`${sortBy}-${sortDirection}`}
                  onChange={(e) => {
                    const [newSortBy, newSortDirection] = e.target.value.split('-');
                    setSortBy(newSortBy as 'date' | 'amount');
                    setSortDirection(newSortDirection as 'asc' | 'desc');
                    setCurrentPage(1);
                  }}
                  className="input"
                >
                  <option value="date-desc">Date (Newest First)</option>
                  <option value="date-asc">Date (Oldest First))</option>
                  <option value="amount-desc">Amount (Highest First)</option>
                  <option value="amount-asc">Amount (Lowest First)</option>
                </select>
              </div>
            </div>
            
            <div className="mt-4 flex justify-between">
              <div className="text-sm text-gray-600">
                Showing {filteredExpenses.length} of {expenses.length} expenses
              </div>
              
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('');
                  setSelectedMonth('');
                  setSortBy('date');
                  setSortDirection('desc');
                  setCurrentPage(1);
                }}
                className="text-sm text-primary-600 hover:text-primary-500"
              >
                Reset Filters
              </button>
            </div>
          </motion.div>
        )}
      </div>
      
      {/* Expenses Table */}
      <div className="card overflow-hidden">
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg font-medium">All Expenses</h2>
          <div className="text-lg font-semibold">
            Total: <span className="text-primary-600">${total.toFixed(2)}</span>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          {filteredExpenses.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <p className="mb-2">No expenses found</p>
              <p className="text-sm">Try changing your search or filter criteria.</p>
            </div>
          ) : (
            <>
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => toggleSort('date')}
                    >
                      <div className="flex items-center">
                        Date
                        {sortBy === 'date' && (
                          <ChevronDown 
                            size={16} 
                            className={`ml-1 transition-transform ${sortDirection === 'asc' ? 'rotate-180' : ''}`} 
                          />
                        )}
                      </div>
                    </th>
                    <th 
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => toggleSort('amount')}
                    >
                      <div className="flex items-center justify-end">
                        Amount
                        {sortBy === 'amount' && (
                          <ChevronDown 
                            size={16} 
                            className={`ml-1 transition-transform ${sortDirection === 'asc' ? 'rotate-180' : ''}`} 
                          />
                        )}
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paginatedExpenses.map((expense) => {
                    const category = categoryMap[expense.category];
                    
                    return (
                      <tr 
                        key={expense.id} 
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {expense.description}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <div className="flex items-center">
                            <div 
                              className="w-3 h-3 rounded-full mr-2" 
                              style={{ backgroundColor: category?.color || '#ccc' }}
                            ></div>
                            <span>{category?.name || 'Unknown'}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex items-center">
                            <Calendar size={16} className="mr-2 text-gray-400" />
                            {formatDate(expense.date)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium">
                          ${expense.amount.toFixed(2)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="px-6 py-4 border-t border-gray-200 bg-white">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to {Math.min(currentPage * ITEMS_PER_PAGE, filteredExpenses.length)} of {filteredExpenses.length} expenses
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="btn btn-secondary btn-sm"
                      >
                        <ChevronLeft size={16} />
                      </button>
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`btn btn-sm ${
                            currentPage === page
                              ? 'btn-primary'
                              : 'btn-secondary'
                          }`}
                        >
                          {page}
                        </button>
                      ))}
                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="btn btn-secondary btn-sm"
                      >
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ExpensesPage;