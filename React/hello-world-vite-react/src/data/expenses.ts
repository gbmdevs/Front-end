
export type ExpenseCategory = 'food' | 'transport' | 'housing' | 'entertainment' | 'utilities' | 'other';

export interface Expense {
  id: string;
  name: string;
  amount: number;
  date: string;
  category: ExpenseCategory;
  paymentMethod: string;
}

export const expenses: Expense[] = [
  {
    id: '1',
    name: 'Grocery shopping',
    amount: 85.75,
    date: '2025-04-01',
    category: 'food',
    paymentMethod: 'Credit Card'
  },
  {
    id: '2',
    name: 'Monthly rent',
    amount: 1200.00,
    date: '2025-04-01',
    category: 'housing',
    paymentMethod: 'Bank Transfer'
  },
  {
    id: '3',
    name: 'Uber rides',
    amount: 32.50,
    date: '2025-04-02',
    category: 'transport',
    paymentMethod: 'Credit Card'
  },
  {
    id: '4',
    name: 'Movie tickets',
    amount: 24.00,
    date: '2025-04-03',
    category: 'entertainment',
    paymentMethod: 'Debit Card'
  },
  {
    id: '5',
    name: 'Electricity bill',
    amount: 75.20,
    date: '2025-03-28',
    category: 'utilities',
    paymentMethod: 'Bank Transfer'
  },
  {
    id: '6',
    name: 'Lunch with colleagues',
    amount: 28.50,
    date: '2025-04-03',
    category: 'food',
    paymentMethod: 'Cash'
  },
  {
    id: '7',
    name: 'Amazon purchase',
    amount: 49.99,
    date: '2025-03-31',
    category: 'other',
    paymentMethod: 'Credit Card'
  },
  {
    id: '8',
    name: 'Gas',
    amount: 45.00,
    date: '2025-04-01',
    category: 'transport',
    paymentMethod: 'Credit Card'
  },
  {
    id: '9',
    name: 'Internet bill',
    amount: 59.99,
    date: '2025-03-29',
    category: 'utilities',
    paymentMethod: 'Bank Transfer'
  },
  {
    id: '10',
    name: 'Coffee shop',
    amount: 5.25,
    date: '2025-04-04',
    category: 'food',
    paymentMethod: 'Cash'
  },
  {
    id: '11',
    name: 'Gym membership',
    amount: 35.00,
    date: '2025-04-01',
    category: 'entertainment',
    paymentMethod: 'Bank Transfer'
  },
  {
    id: '12',
    name: 'Phone bill',
    amount: 45.00,
    date: '2025-03-30',
    category: 'utilities',
    paymentMethod: 'Credit Card'
  }
];

export const getExpensesByCategory = () => {
  const categories: Record<ExpenseCategory, number> = {
    food: 0,
    transport: 0,
    housing: 0,
    entertainment: 0,
    utilities: 0,
    other: 0
  };

  expenses.forEach(expense => {
    categories[expense.category] += expense.amount;
  });

  return categories;
};

export const getTotalExpenses = () => {
  return expenses.reduce((total, expense) => total + expense.amount, 0);
};

export const getRecentExpenses = (count: number = 5) => {
  return [...expenses]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, count);
};

// Payment method distribution
export const getPaymentMethodDistribution = () => {
  const methods: Record<string, number> = {};
  
  expenses.forEach(expense => {
    if (!methods[expense.paymentMethod]) {
      methods[expense.paymentMethod] = 0;
    }
    methods[expense.paymentMethod] += expense.amount;
  });
  
  return methods;
};