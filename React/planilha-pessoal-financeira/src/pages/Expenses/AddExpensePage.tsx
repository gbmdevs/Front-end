import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, X, Trash2, Calendar, DollarSign, Loader2 } from 'lucide-react';
import { categories } from '../../data/mockData';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

interface ExpenseEntry {
  description: string;
  amount: string;
  category: string;
  date: string;
  paymentMethod: string;
  installments?: number;
}

const AddExpensePage = () => {
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState<ExpenseEntry[]>([{
    description: '',
    amount: '',
    category: '',
    date: new Date().toISOString().split('T')[0],
    paymentMethod: '',
    installments: 1
  }]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addExpenseRow = () => {
    setExpenses([...expenses, {
      description: '',
      amount: '',
      category: '',
      date: new Date().toISOString().split('T')[0],
      paymentMethod: '',
      installments: 1
    }]);
  };

  const removeExpenseRow = (index: number) => {
    if (expenses.length > 1) {
      setExpenses(expenses.filter((_, i) => i !== index));
    }
  };

  const updateExpense = (index: number, field: keyof ExpenseEntry, value: string | number) => {
    const updatedExpenses = [...expenses];
    updatedExpenses[index] = {
      ...updatedExpenses[index],
      [field]: value
    };
    setExpenses(updatedExpenses);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate entries
      const hasEmptyFields = expenses.some(expense => 
        !expense.description || !expense.amount || !expense.category || !expense.paymentMethod
      );

      if (hasEmptyFields) {
        throw new Error('Please fill in all required fields');
      }

      // Process credit card installments
      const processedExpenses = expenses.flatMap(expense => {
        if (expense.paymentMethod === 'credit' && expense.installments && expense.installments > 1) {
          const installmentAmount = parseFloat(expense.amount) / expense.installments;
          const baseDate = new Date(expense.date);
          
          return Array.from({ length: expense.installments }, (_, i) => {
            const installmentDate = new Date(baseDate);
            installmentDate.setMonth(baseDate.getMonth() + i);
            
            return {
              ...expense,
              description: `${expense.description} (${i + 1}/${expense.installments})`,
              amount: installmentAmount.toFixed(2),
              date: installmentDate.toISOString().split('T')[0]
            };
          });
        }
        return [expense];
      });

      // In a real app, you would save the expenses to the database here
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Expenses added successfully');
      navigate('/expenses');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to add expenses');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold">Add Expenses</h2>
          <button
            onClick={() => navigate('/expenses')}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <form onSubmit={handleSubmit} className="space-y-6">
            {expenses.map((expense, index) => (
              <div key={index} className="relative bg-gray-50 p-4 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <input
                      type="text"
                      value={expense.description}
                      onChange={(e) => updateExpense(index, 'description', e.target.value)}
                      className="input"
                      placeholder="What did you spend on?"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Amount
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                        $
                      </span>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        value={expense.amount}
                        onChange={(e) => updateExpense(index, 'amount', e.target.value)}
                        className="input pl-8"
                        placeholder="0.00"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category
                    </label>
                    <select
                      value={expense.category}
                      onChange={(e) => updateExpense(index, 'category', e.target.value)}
                      className="input"
                    >
                      <option value="">Select a category</option>
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        value={expense.date}
                        onChange={(e) => updateExpense(index, 'date', e.target.value)}
                        className="input"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Payment Method
                    </label>
                    <select
                      value={expense.paymentMethod}
                      onChange={(e) => updateExpense(index, 'paymentMethod', e.target.value)}
                      className="input"
                    >
                      <option value="">Select payment method</option>
                      <option value="cash">Cash</option>
                      <option value="credit">Credit Card</option>
                      <option value="debit">Debit Card</option>
                      <option value="transfer">Bank Transfer</option>
                    </select>
                  </div>

                  {expense.paymentMethod === 'credit' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Installments
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="24"
                        value={expense.installments}
                        onChange={(e) => updateExpense(index, 'installments', parseInt(e.target.value))}
                        className="input"
                      />
                    </div>
                  )}
                </div>

                {expenses.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeExpenseRow(index)}
                    className="absolute top-2 right-2 text-gray-400 hover:text-danger-500"
                  >
                    <Trash2 size={20} />
                  </button>
                )}
              </div>
            ))}

            <div className="flex justify-center">
              <button
                type="button"
                onClick={addExpenseRow}
                className="btn btn-secondary flex items-center"
              >
                <Plus size={20} className="mr-2" />
                Add Another Expense
              </button>
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={() => navigate('/expenses')}
                className="btn btn-secondary"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary flex items-center"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={20} className="mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Plus size={20} className="mr-2" />
                    Save Expenses
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AddExpensePage;