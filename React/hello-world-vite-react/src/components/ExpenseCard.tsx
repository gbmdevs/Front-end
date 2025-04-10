
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { 
  ShoppingBag,
  Car,
  Home,
  Film,
  Lightbulb,
  Package,
  type LucideIcon
} from 'lucide-react';
import { ExpenseCategory } from '@/data/expenses';

interface ExpenseCardProps {
  title: string;
  amount: number;
  category: ExpenseCategory;
  onClick: () => void;
}

const categoryIcons: Record<ExpenseCategory, LucideIcon> = {
  food: ShoppingBag,
  transport: Car,
  housing: Home,
  entertainment: Film,
  utilities: Lightbulb,
  other: Package
};

const ExpenseCard: React.FC<ExpenseCardProps> = ({ title, amount, category, onClick }) => {
  const Icon = categoryIcons[category];
  
  return (
    <Card 
      className="shadow-card card-hover cursor-pointer" 
      onClick={onClick}
    >
      <CardContent className="p-6 flex items-center">
        <div className={`expense-icon expense-${category} mr-4`}>
          <Icon size={24} />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-medium">{title}</h3>
          <p className="text-2xl font-bold text-primary">${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpenseCard;
