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

interface BillsChartProps {
  data: { id: string; name: string; color: string; total: number }[];
  onItemClick?: (item: { id: string; name: string; color: string; total: number }) => void;
}

const BillsChart: React.FC<BillsChartProps> = ({ data, onItemClick }) => {
  if (data.length === 0 || data.every(item => item.total === 0)) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">No bill data available</p>
      </div>
    );
  }

  const chartConfig = {
    labels: data.map(item => item.name),
    datasets: [
      {
        data: data.map(item => item.total),
        backgroundColor: data.map(item => item.color),
        borderColor: 'white',
        borderWidth: 2,
        hoverOffset: 8,
      },
    ],
  };
  
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '60%',
    plugins: {
      legend: {
        position: 'bottom' as const,
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
    onClick: (event: any, elements: any[]) => {
      if (elements.length > 0 && onItemClick) {
        const index = elements[0].index;
        const clickedItem = data[index];
        onItemClick(clickedItem);
      }
    },
  };
  
  // Add center text plugin
  const totalAmount = data.reduce((sum, item) => sum + item.total, 0);
  const centerTextPlugin = {
    id: 'centerText',
    beforeDraw: function(chart: any) {
      const width = chart.width;
      const height = chart.height;
      const ctx = chart.ctx;
      
      ctx.restore();
      ctx.font = 'bold 18px Inter';
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'center';
      
      const text = `$${totalAmount.toFixed(2)}`;
      const textX = width / 2;
      const textY = height / 2 - 10;
      
      ctx.fillStyle = '#111827';
      ctx.fillText(text, textX, textY);
      
      ctx.font = '12px Inter';
      ctx.fillStyle = '#6b7280';
      ctx.fillText('Total Bills', textX, textY + 25);
      
      ctx.save();
    }
  };
  
  return (
    <div className="h-full cursor-pointer">
      <Doughnut 
        data={chartConfig} 
        options={options} 
        plugins={[centerTextPlugin]} 
      />
    </div>
  );
};

export default BillsChart;