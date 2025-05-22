
import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { ExpenseCategory } from '@/data/expenses';

export interface FilterOptions {
  dateFrom: string;
  dateTo: string;
  category: ExpenseCategory | 'all';
  paymentMethod: string;
  minAmount: string;
  maxAmount: string;
}

interface ExpenseFilterProps {
  onFilter: (filters: FilterOptions) => void;
}

const ExpenseFilter: React.FC<ExpenseFilterProps> = ({ onFilter }) => {
  const [filters, setFilters] = useState<FilterOptions>({
    dateFrom: '',
    dateTo: '',
    category: 'all',
    paymentMethod: '',
    minAmount: '',
    maxAmount: ''
  });

  const handleChange = (key: keyof FilterOptions, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilter(filters);
  };

  const handleReset = () => {
    const resetFilters: FilterOptions = {
      dateFrom: '',
      dateTo: '',
      category: 'all',
      paymentMethod: '',
      minAmount: '',
      maxAmount: ''
    };
    setFilters(resetFilters);
    onFilter(resetFilters);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="dateFrom">Date From</Label>
          <Input
            id="dateFrom"
            type="date"
            value={filters.dateFrom}
            onChange={(e) => handleChange('dateFrom', e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="dateTo">Date To</Label>
          <Input
            id="dateTo"
            type="date"
            value={filters.dateTo}
            onChange={(e) => handleChange('dateTo', e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Select
          value={filters.category}
          onValueChange={(value) => handleChange('category', value)}
        >
          <SelectTrigger id="category">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="food">Food</SelectItem>
            <SelectItem value="transport">Transport</SelectItem>
            <SelectItem value="housing">Housing</SelectItem>
            <SelectItem value="entertainment">Entertainment</SelectItem>
            <SelectItem value="utilities">Utilities</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="paymentMethod">Payment Method</Label>
        <Input
          id="paymentMethod"
          placeholder="e.g., Credit Card"
          value={filters.paymentMethod}
          onChange={(e) => handleChange('paymentMethod', e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="minAmount">Min Amount ($)</Label>
          <Input
            id="minAmount"
            type="number"
            placeholder="Min"
            value={filters.minAmount}
            onChange={(e) => handleChange('minAmount', e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="maxAmount">Max Amount ($)</Label>
          <Input
            id="maxAmount"
            type="number"
            placeholder="Max"
            value={filters.maxAmount}
            onChange={(e) => handleChange('maxAmount', e.target.value)}
          />
        </div>
      </div>

      <div className="flex justify-between pt-2">
        <Button variant="outline" type="button" onClick={handleReset}>
          Reset Filters
        </Button>
        <Button type="submit">Apply Filters</Button>
      </div>
    </form>
  );
};

export default ExpenseFilter;
