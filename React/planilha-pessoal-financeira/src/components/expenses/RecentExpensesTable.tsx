import { useMemo } from 'react';
import { Expense } from '../../types/Expense';
import { categories } from '../../data/mockData';
import { Calendar, DollarSign, Tag } from 'lucide-react';

interface RecentExpensesTableProps {
  expenses: Expense[];
}

const RecentExpensesTable: React.FC<RecentExpensesTableProps> = ({ expenses }) => {
  // Create a map of category IDs to category objects for quick lookup
  const categoryMap = useMemo(() => {
    return categories.reduce((map, category) => {
      map[category.id] = category;
      return map;
    }, {} as Record<string, typeof categories[0]>);
  }, []);
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };
  
  if (expenses.length === 0) {
    return (
      <div className="text-center py-6 text-gray-500">
        No expenses recorded yet.
      </div>
    );
  }
  
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr className="bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            <th className="px-6 py-3">Description</th>
            <th className="px-6 py-3">Category</th>
            <th className="px-6 py-3">Date</th>
            <th className="px-6 py-3 text-right">Amount</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {expenses.map((expense) => {
            const category = categoryMap[expense.category];
            
            return (
              <tr 
                key={expense.id} 
                className="text-sm text-gray-800 hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4">
                  {expense.description}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div 
                      className="w-3 h-3 rounded-full mr-2" 
                      style={{ backgroundColor: category?.color || '#ccc' }}
                    ></div>
                    <span>{category?.name || 'Unknown'}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-500">
                  <div className="flex items-center">
                    <Calendar size={16} className="mr-2 text-gray-400" />
                    {formatDate(expense.date)}
                  </div>
                </td>
                <td className="px-6 py-4 text-right font-medium">
                  ${expense.amount.toFixed(2)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default RecentExpensesTable;