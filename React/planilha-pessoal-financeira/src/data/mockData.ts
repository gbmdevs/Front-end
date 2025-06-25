import { Expense, Category } from '../types/Expense';
import { 
  ShoppingCart, 
  Utensils, 
  Home, 
  Car, 
  Ticket, 
  Smartphone,
  Heart,
  Briefcase,
  Dog,
  Plane,
  GraduationCap,
  Coffee
} from 'lucide-react';

export const categories: Category[] = [
  { id: '1', name: 'Groceries', color: '#4ADE80', icon: 'ShoppingCart' },
  { id: '2', name: 'Dining', color: '#FB923C', icon: 'Utensils' },
  { id: '3', name: 'Housing', color: '#60A5FA', icon: 'Home' },
  { id: '4', name: 'Transportation', color: '#F87171', icon: 'Car' },
  { id: '5', name: 'Entertainment', color: '#C084FC', icon: 'Ticket' },
  { id: '6', name: 'Utilities', color: '#94A3B8', icon: 'Smartphone' },
  { id: '7', name: 'Healthcare', color: '#F472B6', icon: 'Heart' },
  { id: '8', name: 'Work', color: '#78716C', icon: 'Briefcase' },
  { id: '9', name: 'Pets', color: '#FCD34D', icon: 'Dog' },
  { id: '10', name: 'Travel', color: '#38BDF8', icon: 'Plane' },
  { id: '11', name: 'Education', color: '#818CF8', icon: 'GraduationCap' },
  { id: '12', name: 'Other', color: '#A3A3A3', icon: 'Coffee' },
];

// Map icon names to components
export const iconMap: Record<string, React.ElementType> = {
  ShoppingCart,
  Utensils,
  Home,
  Car,
  Ticket,
  Smartphone,
  Heart,
  Briefcase,
  Dog,
  Plane,
  GraduationCap,
  Coffee
};

// Generate random expenses for the last 3 months
export const generateMockExpenses = (): Expense[] => {
  const expenses: Expense[] = [];
  const today = new Date();
  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(today.getMonth() - 3);
  
  // Generate between 40-60 expenses
  const numExpenses = Math.floor(Math.random() * 20) + 40;
  
  for (let i = 0; i < numExpenses; i++) {
    const date = new Date(
      threeMonthsAgo.getTime() + Math.random() * (today.getTime() - threeMonthsAgo.getTime())
    );
    
    const categoryIndex = Math.floor(Math.random() * categories.length);
    const amount = parseFloat((Math.random() * 200 + 5).toFixed(2));
    
    expenses.push({
      id: `exp-${i + 1}`,
      amount,
      category: categories[categoryIndex].id,
      description: getRandomDescription(categories[categoryIndex].name),
      date: date.toISOString().split('T')[0],
      paymentMethod: ['credit', 'debit', 'cash', 'transfer'][Math.floor(Math.random() * 4)] as any,
    });
  }
  
  // Sort by date (newest first)
  return expenses.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

// Helper to generate realistic descriptions based on category
function getRandomDescription(category: string): string {
  const descriptions: Record<string, string[]> = {
    'Groceries': [
      'Weekly grocery shopping', 
      'Fresh produce at farmers market', 
      'Supermarket essentials'
    ],
    'Dining': [
      'Dinner with friends', 
      'Lunch at cafe', 
      'Coffee and pastry', 
      'Pizza delivery'
    ],
    'Housing': [
      'Monthly rent', 
      'Electricity bill', 
      'Water bill', 
      'Internet service'
    ],
    'Transportation': [
      'Gas refill', 
      'Uber ride', 
      'Monthly transit pass', 
      'Car maintenance'
    ],
    'Entertainment': [
      'Movie tickets', 
      'Concert tickets', 
      'Streaming subscription', 
      'Game purchase'
    ],
    'Utilities': [
      'Phone bill', 
      'Internet bill', 
      'Streaming services'
    ],
    'Healthcare': [
      'Doctor visit', 
      'Prescription medication', 
      'Dental checkup'
    ],
    'Work': [
      'Office supplies', 
      'Work lunch', 
      'Professional subscription'
    ],
    'Pets': [
      'Pet food', 
      'Vet visit', 
      'Pet toys', 
      'Grooming'
    ],
    'Travel': [
      'Flight tickets', 
      'Hotel booking', 
      'Travel insurance', 
      'Vacation activities'
    ],
    'Education': [
      'Online course', 
      'Books purchase', 
      'Tuition payment'
    ],
    'Other': [
      'Miscellaneous purchase', 
      'Gift for friend', 
      'Donation', 
      'Unexpected expense'
    ]
  };
  
  const categoryDescriptions = descriptions[category] || descriptions['Other'];
  return categoryDescriptions[Math.floor(Math.random() * categoryDescriptions.length)];
}

export const mockExpenses = generateMockExpenses();

// Calculate monthly totals
export const getMonthlyExpenses = () => {
  const months: Record<string, number> = {};
  
  mockExpenses.forEach(expense => {
    const date = new Date(expense.date);
    const monthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    
    if (!months[monthYear]) {
      months[monthYear] = 0;
    }
    
    months[monthYear] += expense.amount;
  });
  
  return Object.entries(months)
    .map(([month, total]) => ({ month, total }))
    .sort((a, b) => a.month.localeCompare(b.month));
};

// Calculate category totals
export const getCategoryTotals = () => {
  const categoryTotals: Record<string, number> = {};
  
  mockExpenses.forEach(expense => {
    if (!categoryTotals[expense.category]) {
      categoryTotals[expense.category] = 0;
    }
    
    categoryTotals[expense.category] += expense.amount;
  });
  
  return Object.entries(categoryTotals).map(([categoryId, total]) => {
    const category = categories.find(c => c.id === categoryId);
    return {
      id: categoryId,
      name: category?.name || 'Unknown',
      color: category?.color || '#ccc',
      total
    };
  });
};