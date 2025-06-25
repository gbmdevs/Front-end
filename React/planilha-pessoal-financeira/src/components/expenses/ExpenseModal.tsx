import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Edit2, Trash2, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { categories } from '../../data/mockData';
import { Expense } from '../../types/Expense';
import toast from 'react-hot-toast';

interface ExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  expenses: Expense[];
  onDelete: (id: string) => void;
  onEdit: (expense: Expense) => void;
}

const ITEMS_PER_PAGE = 10;

const ExpenseModal: React.FC<ExpenseModalProps> = ({
  isOpen,
  onClose,
  expenses,
  onDelete,
  onEdit,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    description: '',
    amount: '',
    category: '',
    date: '',
  });

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setSearchTerm('');
      setCurrentPage(1);
      setSelectedExpense(null);
      setIsEditing(false);
    }
  }, [isOpen]);

  // Filter expenses based on search term
  const filteredExpenses = expenses.filter(expense =>
    expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    expense.amount.toString().includes(searchTerm)
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredExpenses.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedExpenses = filteredExpenses.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleEdit = (expense: Expense) => {
    setSelectedExpense(expense);
    setEditForm({
      description: expense.description,
      amount: expense.amount.toString(),
      category: expense.category,
      date: expense.date,
    });
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    if (!selectedExpense) return;

    const updatedExpense: Expense = {
      ...selectedExpense,
      description: editForm.description,
      amount: parseFloat(editForm.amount),
      category: editForm.category,
      date: editForm.date,
    };

    onEdit(updatedExpense);
    setIsEditing(false);
    setSelectedExpense(null);
    toast.success('Expense updated successfully');
  };

  const handleDelete = (id: string) => {
    onDelete(id);
    toast.success('Expense deleted successfully');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-black bg-opacity-75" onClick={onClose}>
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
                {isEditing ? 'Edit Expense' : 'Banking Transactions'}
              </h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Search and Filters */}
          {!isEditing && (
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                <input
                  type="text"
                  placeholder="Search transactions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input pl-10 w-full focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  autoComplete="off"
                />
              </div>
            </div>
          )}

          {/* Modal Content */}
          <div className="px-6 py-4 max-h-[60vh] overflow-y-auto">
            {isEditing ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <input
                    type="text"
                    value={editForm.description}
                    onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                    className="input"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Amount
                  </label>
                  <input
                    type="number"
                    value={editForm.amount}
                    onChange={(e) => setEditForm({ ...editForm, amount: e.target.value })}
                    className="input"
                    step="0.01"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    value={editForm.category}
                    onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                    className="input"
                  >
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    value={editForm.date}
                    onChange={(e) => setEditForm({ ...editForm, date: e.target.value })}
                    className="input"
                  />
                </div>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {paginatedExpenses.map((expense) => {
                  const category = categories.find(c => c.id === expense.category);
                  return (
                    <div
                      key={expense.id}
                      className="py-4 flex items-center justify-between hover:bg-gray-50"
                    >
                      <div className="flex items-center space-x-4">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: category?.color }}
                        ></div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {expense.description}
                          </p>
                          <p className="text-sm text-gray-500">
                            {new Date(expense.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="text-sm font-medium">
                          ${expense.amount.toFixed(2)}
                        </span>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(expense)}
                            className="p-1 text-gray-400 hover:text-primary-500"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(expense.id)}
                            className="p-1 text-gray-400 hover:text-danger-500"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Modal Footer */}
          <div className="px-6 py-4 border-t border-gray-200">
            {isEditing ? (
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setIsEditing(false)}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveEdit}
                  className="btn btn-primary"
                >
                  Save Changes
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  Showing {startIndex + 1} to {Math.min(startIndex + ITEMS_PER_PAGE, filteredExpenses.length)} of {filteredExpenses.length} transactions
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="btn btn-secondary btn-sm"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="btn btn-secondary btn-sm"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ExpenseModal;