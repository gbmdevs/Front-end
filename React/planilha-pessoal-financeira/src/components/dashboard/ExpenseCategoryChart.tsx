import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

interface ExpenseCategoryChartProps {
  data: { id: string; name: string; color: string; total: number }[];
}

const ExpenseCategoryChart: React.FC<ExpenseCategoryChartProps> = ({ data }) => {
  // Sort data by total (descending)
  const sortedData = [...data].sort((a, b) => b.total - a.total);
  
  // Limit to top 5 categories, combine the rest into "Other"
  let chartData = sortedData.slice(0, 6);
  if (sortedData.length > 6) {
    const otherTotal = sortedData
      .slice(6)
      .reduce((sum, item) => sum + item.total, 0);
    
    if (otherTotal > 0) {
      chartData.push({
        id: 'other',
        name: 'Other',
        color: '#94a3b8',
        total: otherTotal
      });
    }
  }
  
  const chartConfig = {
    labels: chartData.map(item => item.name),
    datasets: [
      {
        data: chartData.map(item => item.total),
        backgroundColor: chartData.map(item => item.color),
        borderColor: 'white',
        borderWidth: 2,
        hoverOffset: 5,
      },
    ],
  };
  
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%',
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          boxWidth: 12,
          padding: 16,
          font: {
            size: 12,
          },
          generateLabels: function(chart: any) {
            const data = chart.data;
            if (data.labels.length && data.datasets.length) {
              return data.labels.map((label: string, i: number) => {
                const meta = chart.getDatasetMeta(0);
                const style = meta.controller.getStyle(i);
                
                const value = chart.data.datasets[0].data[i];
                const total = chart.data.datasets[0].data.reduce((a: number, b: number) => a + b, 0);
                const percentage = Math.round((value / total) * 100);
                
                return {
                  text: `${label} - ${percentage}% ($${value.toFixed(2)})`,
                  fillStyle: style.backgroundColor,
                  strokeStyle: style.borderColor,
                  lineWidth: style.borderWidth,
                  hidden: !chart.getDataVisibility(i),
                  index: i
                };
              });
            }
            return [];
          },
        }
      },
      tooltip: {
        backgroundColor: '#fff',
        titleColor: '#111827',
        bodyColor: '#111827',
        borderColor: '#e5e7eb',
        borderWidth: 1,
        padding: 12,
        boxPadding: 6,
        usePointStyle: true,
        callbacks: {
          label: function(context: any) {
            const value = context.raw;
            const total = context.chart.data.datasets[0].data.reduce((a: number, b: number) => a + b, 0);
            const percentage = Math.round((value / total) * 100);
            return `$${value.toFixed(2)} (${percentage}%)`;
          }
        }
      }
    },
  };
  
  // Add center text plugin
  const totalAmount = chartData.reduce((sum, item) => sum + item.total, 0);
  const centerTextPlugin = {
    id: 'centerText',
    beforeDraw: function(chart: any) {
      const width = chart.width;
      const height = chart.height;
      const ctx = chart.ctx;
      
      ctx.restore();
      ctx.font = 'bold 16px Inter';
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'center';
      
      const text = `$${totalAmount.toFixed(2)}`;
      const textX = width / 2;
      const textY = height / 2;
      
      ctx.fillStyle = '#111827';
      ctx.fillText(text, textX, textY);
      
      ctx.font = '12px Inter';
      ctx.fillStyle = '#6b7280';
      ctx.fillText('Total Expenses', textX, textY + 20);
      
      ctx.save();
    }
  };
  
  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">No category data available</p>
      </div>
    );
  }
  
  return (
    <Doughnut 
      data={chartConfig} 
      options={options} 
      plugins={[centerTextPlugin]} 
    />
  );
};

export default ExpenseCategoryChart;