import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Plus, TrendingDown, TrendingUp, DollarSign, Ban as Bank, Clock, Check, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ExpenseChart from '../../components/dashboard/ExpenseChart';
import ExpenseCategoryChart from '../../components/dashboard/ExpenseCategoryChart';
import BillsChart from '../../components/dashboard/BillsChart';
import BillHistoryChart from '../../components/dashboard/BillHistoryChart';
import { mockExpenses, getMonthlyExpenses, getCategoryTotals, categories } from '../../data/mockData';
import RecentExpensesTable from '../../components/expenses/RecentExpensesTable';
import ExpenseModal from '../../components/expenses/ExpenseModal';
import { Expense } from '../../types/Expense';
import toast from 'react-hot-toast';

interface Bill {
  id: string;
  name: string;
  amount: number;
  dueDate: string;
  status: 'pending' | 'paid';
  category: string;
}

const initialBills: Bill[] = [
  {
    id: '1',
    name: 'Rent',
    amount: 1200,
    dueDate: '2024-03-01',
    status: 'paid',
    category: 'Housing'
  },
  {
    id: '2',
    name: 'Electricity',
    amount: 85,
    dueDate: '2024-03-15',
    status: 'pending',
    category: 'Utilities'
  },
  {
    id: '3',
    name: 'Internet',
    amount: 75,
    dueDate: '2024-03-10',
    status: 'paid',
    category: 'Utilities'
  },
  {
    id: '4',
    name: 'Water',
    amount: 45,
    dueDate: '2024-03-20',
    status: 'pending',
    category: 'Utilities'
  }
];

// Generate mock historical data for bills
const generateBillHistory = (billName: string) => {
  const history = [];
  const currentDate = new Date();
  
  for (let i = 11; i >= 0; i--) {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
    const monthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    
    // Generate realistic amounts with some variation
    let baseAmount = 0;
    switch (billName) {
      case 'Rent':
        baseAmount = 1200 + (Math.random() - 0.5) * 50;
        break;
      case 'Electricity':
        baseAmount = 85 + (Math.random() - 0.5) * 30;
        break;
      case 'Internet':
        baseAmount = 75 + (Math.random() - 0.5) * 10;
        break;
      case 'Water':
        baseAmount = 45 + (Math.random() - 0.5) * 15;
        break;
      default:
        baseAmount = 100 + (Math.random() - 0.5) * 50;
    }
    
    history.push({
      month: monthYear,
      amount: Math.max(0, baseAmount)
    });
  }
  
  return history;
};

const DashboardPage = () => {
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [monthlyExpenses, setMonthlyExpenses] = useState<{ month: string; total: number }[]>([]);
  const [categoryData, setCategoryData] = useState<{ id: string; name: string; color: string; total: number }[]>([]);
  const [comparePercentage, setComparePercentage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [bills, setBills] = useState<Bill[]>(initialBills);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [selectedBillHistory, setSelectedBillHistory] = useState<{
    name: string;
    data: { month: string; amount: number }[];
  } | null>(null);
  
  useEffect(() => {
    setExpenses(mockExpenses);
    
    // Calculate total expenses for the current month
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    
    const currentMonthExpenses = mockExpenses.filter(expense => {
      const expenseDate = new Date(expense.date);
      return expenseDate.getMonth() === currentMonth && expenseDate.getFullYear() === currentYear;
    });
    
    const total = currentMonthExpenses.reduce((sum, expense) => sum + expense.amount, 0);
    setTotalExpenses(total);
    
    // Calculate monthly expenses for chart
    const monthlyData = getMonthlyExpenses();
    setMonthlyExpenses(monthlyData);
    
    // Calculate category totals for chart
    const categoryTotals = getCategoryTotals();
    setCategoryData(categoryTotals);
    
    // Calculate percentage change from previous month
    if (monthlyData.length >= 2) {
      const currentMonthTotal = monthlyData[monthlyData.length - 1].total;
      const previousMonthTotal = monthlyData[monthlyData.length - 2].total;
      
      const percentageChange = previousMonthTotal === 0 
        ? 100 
        : ((currentMonthTotal - previousMonthTotal) / previousMonthTotal) * 100;
      
      setComparePercentage(percentageChange);
    }
  }, []);

  const handleDeleteExpense = (id: string) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
    toast.success('Expense deleted successfully');
  };

  const handleEditExpense = (updatedExpense: Expense) => {
    setExpenses(expenses.map(expense => 
      expense.id === updatedExpense.id ? updatedExpense : expense
    ));
    toast.success('Expense updated successfully');
  };

  const toggleBillStatus = (billId: string) => {
    setBills(prev =>
      prev.map(bill =>
        bill.id === billId
          ? { ...bill, status: bill.status === 'paid' ? 'pending' : 'paid' }
          : bill
      )
    );
  };

  const handleBillChartClick = (item: { id: string; name: string; color: string; total: number }) => {
    // Generate historical data for the clicked bill type
    const historyData = generateBillHistory(item.name);
    setSelectedBillHistory({
      name: item.name,
      data: historyData
    });
    setIsHistoryModalOpen(true);
  };
  
  // Get recent expenses (last 5)
  const recentExpenses = expenses.slice(0, 5);

  // Calculate bill statistics
  const totalBillAmount = bills.reduce((sum, bill) => sum + bill.amount, 0);
  const paidBillAmount = bills.filter(bill => bill.status === 'paid')
    .reduce((sum, bill) => sum + bill.amount, 0);
  const pendingBillAmount = totalBillAmount - paidBillAmount;

  // Prepare data for bills pie chart
  const billsChartData = [
    { id: 'paid', name: 'Paid', color: '#10b981', total: paidBillAmount },
    { id: 'pending', name: 'Pending', color: '#f59e0b', total: pendingBillAmount }
  ];
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <Link 
          to="/expenses/add"
          className="btn btn-primary btn-sm lg:btn-md flex items-center"
        >
          <Plus size={18} className="mr-1" />
          Add Expense
        </Link>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="card p-6 cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => setIsModalOpen(true)}
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total This Month</p>
              <h3 className="mt-1 text-2xl font-semibold text-gray-900">
                ${totalExpenses.toFixed(2)}
              </h3>
            </div>
            <div className="bg-primary-100 p-2 rounded-lg">
              <Bank size={20} className="text-primary-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            {comparePercentage > 0 ? (
              <>
                <TrendingUp size={16} className="text-danger-500 mr-1" />
                <span className="text-sm font-medium text-danger-500">
                  {Math.abs(comparePercentage).toFixed(1)}% higher
                </span>
              </>
            ) : (
              <>
                <TrendingDown size={16} className="text-success-500 mr-1" />
                <span className="text-sm font-medium text-success-500">
                  {Math.abs(comparePercentage).toFixed(1)}% lower
                </span>
              </>
            )}
            <span className="text-sm text-gray-500 ml-1">than last month</span>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="card p-6"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Top Category</p>
              {categoryData.length > 0 && (
                <h3 className="mt-1 text-2xl font-semibold text-gray-900">
                  {categoryData.sort((a, b) => b.total - a.total)[0].name}
                </h3>
              )}
            </div>
            <div className="bg-warning-100 p-2 rounded-lg">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-warning-600">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M16 8a4 4 0 1 0-8 2 4 4 0 0 0 0 8"></path>
              </svg>
            </div>
          </div>
          <div className="mt-4">
            {categoryData.length > 0 && (
              <div className="text-sm text-gray-500">
                ${categoryData.sort((a, b) => b.total - a.total)[0].total.toFixed(2)} spent
              </div>
            )}
          </div>
        </motion.div>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="card p-6"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Transactions</p>
              <h3 className="mt-1 text-2xl font-semibold text-gray-900">
                {mockExpenses.length}
              </h3>
            </div>
            <div className="bg-success-100 p-2 rounded-lg">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-success-600">
                <line x1="12" y1="1" x2="12" y2="23"></line>
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
              </svg>
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-500">
            Last transaction {new Date(mockExpenses[0].date).toLocaleDateString()}
          </div>
        </motion.div>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="card p-6"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Average per Transaction</p>
              <h3 className="mt-1 text-2xl font-semibold text-gray-900">
                ${(mockExpenses.reduce((sum, exp) => sum + exp.amount, 0) / mockExpenses.length).toFixed(2)}
              </h3>
            </div>
            <div className="bg-primary-100 p-2 rounded-lg">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-600">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
              </svg>
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-500">
            Based on all transactions
          </div>
        </motion.div>
      </div>
      
      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="card p-6 lg:col-span-2"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Monthly Spending</h3>
            <Link to="/expenses" className="text-sm text-primary-600 flex items-center">
              View All
              <ArrowUpRight size={16} className="ml-1" />
            </Link>
          </div>
          <div className="h-72">
            <ExpenseChart data={monthlyExpenses} />
          </div>
        </motion.div>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="card p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Monthly Bills</h3>
            <Link to="/bills" className="text-sm text-primary-600 flex items-center">
              View All
              <ArrowUpRight size={16} className="ml-1" />
            </Link>
          </div>
          <div className="h-48 mb-4">
            <BillsChart data={billsChartData} onItemClick={handleBillChartClick} />
          </div>
          <div className="space-y-3">
            {bills.map(bill => (
              <div key={bill.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-900">{bill.name}</p>
                  <p className="text-xs text-gray-500">Due {new Date(bill.dueDate).toLocaleDateString()}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium">${bill.amount}</span>
                  <button
                    onClick={() => toggleBillStatus(bill.id)}
                    className={`px-2 py-1 rounded-full text-xs font-medium flex items-center ${
                      bill.status === 'paid'
                        ? 'bg-success-100 text-success-800'
                        : 'bg-warning-100 text-warning-800'
                    }`}
                  >
                    {bill.status === 'paid' ? (
                      <>
                        <Check size={12} className="mr-1" />
                        Paid
                      </>
                    ) : (
                      <>
                        <Clock size={12} className="mr-1" />
                        Pending
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
      
      {/* Recent Expenses */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.4 }}
        className="card p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Recent Expenses</h3>
          <Link to="/expenses" className="text-sm text-primary-600 flex items-center">
            View All
            <ArrowUpRight size={16} className="ml-1" />
          </Link>
        </div>
        <RecentExpensesTable expenses={recentExpenses} />
      </motion.div>

      {/* Banking Transactions Modal */}
      <ExpenseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        expenses={expenses}
        onDelete={handleDeleteExpense}
        onEdit={handleEditExpense}
      />

      {/* Bill History Modal */}
      <AnimatePresence>
        {isHistoryModalOpen && selectedBillHistory && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center">
              <div className="fixed inset-0 transition-opacity bg-black bg-opacity-75\" onClick={() => setIsHistoryModalOpen(false)}>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="inline-block w-full max-w-4xl overflow-hidden text-left align-middle transition-all transform bg-white rounded-lg shadow-xl relative"
              >
                {/* Modal Header */}
                <div className="px-6 py-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900">
                      {selectedBillHistory.name} - 12 Month History
                    </h3>
                    <button
                      onClick={() => setIsHistoryModalOpen(false)}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <X size={20} />
                    </button>
                  </div>
                </div>

                {/* Chart Content */}
                <div className="px-6 py-4">
                  <div className="h-80">
                    <BillHistoryChart 
                      billName={selectedBillHistory.name}
                      data={selectedBillHistory.data}
                    />
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                  <div className="flex justify-between items-center text-sm text-gray-600">
                    <span>Historical data for the past 12 months</span>
                    <button
                      onClick={() => setIsHistoryModalOpen(false)}
                      className="btn btn-secondary btn-sm"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default DashboardPage;