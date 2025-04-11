
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3, 
  TrendingUp, 
  CreditCard, 
  CalendarRange 
} from 'lucide-react';
import { ExpenseCategory } from '@/data/expenses';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

interface CategoryData {
  name: string;
  amount: number;
  color: string;
}

interface PaymentMethodData {
  name: string;
  value: number;
}

interface StatsSummaryProps {
  totalSpent: number;
  averageDaily: number;
  categoryData: Record<ExpenseCategory, number>;
  paymentMethodData: Record<string, number>;
}

const StatsSummary: React.FC<StatsSummaryProps> = ({
  totalSpent,
  averageDaily,
  categoryData,
  paymentMethodData
}) => {
  // Transform category data for the chart
  const chartData: CategoryData[] = Object.entries(categoryData).map(([category, amount]) => {
    const colorMap: Record<string, string> = {
      food: 'hsl(214, 75.90%, 31.00%)',
      transport: 'hsl(262, 83%, 58%)',
      housing: 'hsl(142, 71%, 45%)',
      entertainment: 'hsl(340, 82%, 52%)',
      utilities: 'hsl(187, 92%, 34%)',
      other: 'hsl(200, 18%, 46%)'
    };
    
    return {
      name: category.charAt(0).toUpperCase() + category.slice(1),
      amount: parseFloat(amount.toFixed(2)),
      color: colorMap[category]
    };
  });
  
  // Transform payment method data
  const paymentData: PaymentMethodData[] = Object.entries(paymentMethodData).map(
    ([method, amount]) => ({
      name: method,
      value: parseFloat(amount.toFixed(2))
    })
  );

  return (
    <div className="space-y-6"> 
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card 
          className="cursor-pointer hover:shadow-md transition-all transform hover:-translate-y-1"
          
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bank Balance</CardTitle> 
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2"> 
              <span className="text-2xl font-bold">3500</span>
            </div>
            <div className="flex items-center mt-2">
             a
            </div>
            <div className="mt-2 flex items-center justify-between">
              <Badge variant="outline" className="text-xs bg-primary/10">
                View Details
              </Badge> 
            </div>
          </CardContent>
        </Card>
        </div>
    </div>
  );
};

export default StatsSummary;