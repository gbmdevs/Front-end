
import { format, addMonths, subMonths } from 'date-fns';
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface MonthNavigatorProps {
  currentDate: Date;
  onMonthChange: (date: Date) => void;
}

const MonthNavigator = ({ currentDate, onMonthChange }: MonthNavigatorProps) => {
  const handlePreviousMonth = () => {
    const newDate = subMonths(currentDate, 1);
    onMonthChange(newDate);
  };

  const handleNextMonth = () => {
    const newDate = addMonths(currentDate, 1);
    onMonthChange(newDate);
  };

  return (
    <div className="flex items-center space-x-2">
      <Button 
        variant="outline" 
        size="icon" 
        onClick={handlePreviousMonth}
        className="h-8 w-8"
      >
        <ArrowLeft className="h-4 w-4" />
        <span className="sr-only">Previous month</span>
      </Button>
      
      <span className="text-sm font-medium">
        {format(currentDate, 'MMM yyyy')}
      </span>
      
      <Button 
        variant="outline" 
        size="icon" 
        onClick={handleNextMonth}
        className="h-8 w-8"
      >
        <ArrowRight className="h-4 w-4" />
        <span className="sr-only">Next month</span>
      </Button>
    </div>
  );
};

export default MonthNavigator;