
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
        {/* 
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalSpent.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>*/}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Banco Inter</CardTitle> 
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${averageDaily.toLocaleString()}</div> 
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Category</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {chartData.length > 0 ? (
              <>
                <div className="text-2xl font-bold">
                  {chartData.sort((a, b) => b.amount - a.amount)[0].name}
                </div>
                <p className="text-xs text-muted-foreground">
                  ${chartData.sort((a, b) => b.amount - a.amount)[0].amount.toLocaleString()}
                </p>
              </>
            ) : (
              <div className="text-2xl font-bold">N/A</div>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Payment Methods</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Object.keys(paymentMethodData).length}</div>
            <p className="text-xs text-muted-foreground">Different methods used</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Expenses by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 12 }} 
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  tick={{ fontSize: 12 }} 
                  tickLine={false} 
                  axisLine={false}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip 
                  formatter={(value) => [`$${value}`, 'Amount']}
                  labelStyle={{ fontWeight: 'bold' }}
                />
                <Bar 
                  dataKey="amount" 
                  radius={[4, 4, 0, 0]} 
                  fill="hsl(var(--primary))" 
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsSummary;