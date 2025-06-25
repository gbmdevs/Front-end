import { useState } from 'react';
import { categories as initialCategories } from '../../data/mockData';
import { Plus, Edit, Trash2, Check, X } from 'lucide-react';
import { motion } from 'framer-motion';

interface Category {
  id: string;
  name: string;
  color: string;
  icon: string;
}

const CategoriesPage = () => {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editColor, setEditColor] = useState('');
  
  const handleStartEdit = (category: Category) => {
    setIsEditing(category.id);
    setEditName(category.name);
    setEditColor(category.color);
  };
  
  const handleCancelEdit = () => {
    setIsEditing(null);
    setEditName('');
    setEditColor('');
  };
  
  const handleSaveEdit = (id: string) => {
    if (editName.trim() === '') return;
    
    setCategories(categories.map(category => 
      category.id === id 
        ? { ...category, name: editName, color: editColor } 
        : category
    ));
    
    setIsEditing(null);
    setEditName('');
    setEditColor('');
  };
  
  const handleDelete = (id: string) => {
    // In a real app, you would check if there are expenses using this category first
    setCategories(categories.filter(category => category.id !== id));
  };
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
        <button className="btn btn-primary btn-sm lg:btn-md flex items-center">
          <Plus size={18} className="mr-1" />
          Add Category
        </button>
      </div>
      
      <div className="card overflow-hidden">
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium">Manage Expense Categories</h2>
          <p className="text-sm text-gray-500 mt-1">
            Customize the categories used to classify your expenses.
          </p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Color
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {categories.map((category) => (
                <tr key={category.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    {isEditing === category.id ? (
                      <input
                        type="color"
                        value={editColor}
                        onChange={(e) => setEditColor(e.target.value)}
                        className="w-8 h-8 rounded cursor-pointer"
                      />
                    ) : (
                      <div 
                        className="w-6 h-6 rounded-full" 
                        style={{ backgroundColor: category.color }}
                      ></div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {isEditing === category.id ? (
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="input py-1 px-2 h-auto"
                      />
                    ) : (
                      category.name
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {isEditing === category.id ? (
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => handleSaveEdit(category.id)}
                          className="p-1 rounded text-success-600 hover:bg-success-50"
                        >
                          <Check size={18} />
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="p-1 rounded text-danger-600 hover:bg-danger-50"
                        >
                          <X size={18} />
                        </button>
                      </div>
                    ) : (
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => handleStartEdit(category)}
                          className="p-1 rounded text-primary-600 hover:bg-primary-50"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(category.id)}
                          className="p-1 rounded text-danger-600 hover:bg-danger-50"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

export default CategoriesPage;