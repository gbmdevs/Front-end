import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Star, Search, Plus, DollarSign, Calendar, X, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  isFavorite: boolean;
}

interface Transaction {
  id: string;
  symbol: string;
  type: 'buy' | 'sell';
  shares: number;
  price: number;
  date: string;
  total: number;
}

interface Position {
  symbol: string;
  shares: number;
  averageCost: number;
  currentValue: number;
  totalCost: number;
  profitLoss: number;
  profitLossPercent: number;
}

const mockStocks: Stock[] = [
  { symbol: 'AAPL', name: 'Apple Inc.', price: 173.45, change: 2.31, changePercent: 1.35, isFavorite: true },
  { symbol: 'MSFT', name: 'Microsoft Corporation', price: 402.78, change: -1.22, changePercent: -0.30, isFavorite: true },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 143.96, change: 0.88, changePercent: 0.62, isFavorite: false },
  { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 175.35, change: 3.45, changePercent: 2.01, isFavorite: true },
  { symbol: 'NVDA', name: 'NVIDIA Corporation', price: 726.13, change: 15.27, changePercent: 2.15, isFavorite: false },
  { symbol: 'META', name: 'Meta Platforms Inc.', price: 484.32, change: -2.68, changePercent: -0.55, isFavorite: false },
  { symbol: 'TSLA', name: 'Tesla Inc.', price: 193.57, change: -4.23, changePercent: -2.14, isFavorite: true },
  { symbol: 'BRK.B', name: 'Berkshire Hathaway Inc.', price: 406.12, change: 1.56, changePercent: 0.39, isFavorite: false },
];

const initialTransactions: Transaction[] = [
  { id: '1', symbol: 'AAPL', type: 'buy', shares: 10, price: 150.00, date: '2024-01-15', total: 1500.00 },
  { id: '2', symbol: 'MSFT', type: 'buy', shares: 5, price: 380.00, date: '2024-02-01', total: 1900.00 },
  { id: '3', symbol: 'AAPL', type: 'sell', shares: 3, price: 170.00, date: '2024-03-01', total: 510.00 },
];

const StocksPage = () => {
  const [stocks, setStocks] = useState<Stock[]>(mockStocks);
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [transactionForm, setTransactionForm] = useState({
    type: 'buy',
    shares: '',
    price: '',
    date: new Date().toISOString().split('T')[0],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const filteredStocks = stocks.filter(stock => {
    const matchesSearch = stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         stock.name.toLowerCase().includes(searchTerm.toLowerCase());
    return showFavoritesOnly ? matchesSearch && stock.isFavorite : matchesSearch;
  });

  // Calculate positions and performance
  const positions = Object.values(transactions.reduce((acc, transaction) => {
    const { symbol, type, shares, price, total } = transaction;
    
    if (!acc[symbol]) {
      acc[symbol] = {
        symbol,
        shares: 0,
        totalCost: 0,
        averageCost: 0,
        currentValue: 0,
        profitLoss: 0,
        profitLossPercent: 0,
      };
    }

    const position = acc[symbol];
    if (type === 'buy') {
      position.shares += shares;
      position.totalCost += total;
    } else {
      position.shares -= shares;
      position.totalCost = (position.totalCost / (position.shares + shares)) * position.shares;
    }

    position.averageCost = position.totalCost / position.shares;
    const currentPrice = stocks.find(s => s.symbol === symbol)?.price || 0;
    position.currentValue = position.shares * currentPrice;
    position.profitLoss = position.currentValue - position.totalCost;
    position.profitLossPercent = (position.profitLoss / position.totalCost) * 100;

    return acc;
  }, {} as Record<string, Position>)).filter(position => position.shares > 0);

  const toggleFavorite = (symbol: string) => {
    setStocks(stocks.map(stock =>
      stock.symbol === symbol ? { ...stock, isFavorite: !stock.isFavorite } : stock
    ));
  };

  const handleAddTransaction = (stock: Stock) => {
    setSelectedStock(stock);
    setTransactionForm({
      type: 'buy',
      shares: '',
      price: stock.price.toString(),
      date: new Date().toISOString().split('T')[0],
    });
    setIsTransactionModalOpen(true);
  };

  const handleTransactionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStock) return;

    setIsSubmitting(true);
    try {
      const shares = parseFloat(transactionForm.shares);
      const price = parseFloat(transactionForm.price);
      
      if (isNaN(shares) || isNaN(price) || shares <= 0 || price <= 0) {
        throw new Error('Invalid shares or price');
      }

      const position = positions.find(p => p.symbol === selectedStock.symbol);
      if (transactionForm.type === 'sell' && (!position || position.shares < shares)) {
        throw new Error('Not enough shares to sell');
      }

      const newTransaction: Transaction = {
        id: Date.now().toString(),
        symbol: selectedStock.symbol,
        type: transactionForm.type as 'buy' | 'sell',
        shares,
        price,
        date: transactionForm.date,
        total: shares * price,
      };

      setTransactions([...transactions, newTransaction]);
      setIsTransactionModalOpen(false);
      toast.success(`${transactionForm.type === 'buy' ? 'Bought' : 'Sold'} ${shares} shares of ${selectedStock.symbol}`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Transaction failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStocks(stocks.map(stock => ({
        ...stock,
        price: stock.price + (Math.random() - 0.5) * 2,
        change: stock.change + (Math.random() - 0.5),
        changePercent: stock.changePercent + (Math.random() - 0.5),
      })));
    }, 5000);

    return () => clearInterval(interval);
  }, [stocks]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Stock Market</h1>
        <button
          onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
          className={`btn ${showFavoritesOnly ? 'btn-primary' : 'btn-secondary'} btn-sm lg:btn-md flex items-center`}
        >
          <Star size={18} className={showFavoritesOnly ? 'text-white' : 'text-gray-600'} />
          <span className="ml-2">{showFavoritesOnly ? 'Show All' : 'Show Favorites'}</span>
        </button>
      </div>

      {/* Portfolio Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card p-6">
          <h3 className="text-sm font-medium text-gray-500">Portfolio Value</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">
            ${positions.reduce((sum, pos) => sum + pos.currentValue, 0).toFixed(2)}
          </p>
        </div>
        <div className="card p-6">
          <h3 className="text-sm font-medium text-gray-500">Total Cost</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">
            ${positions.reduce((sum, pos) => sum + pos.totalCost, 0).toFixed(2)}
          </p>
        </div>
        <div className="card p-6">
          <h3 className="text-sm font-medium text-gray-500">Total Profit/Loss</h3>
          <p className={`mt-2 text-3xl font-bold ${
            positions.reduce((sum, pos) => sum + pos.profitLoss, 0) >= 0
              ? 'text-success-600'
              : 'text-danger-600'
          }`}>
            ${positions.reduce((sum, pos) => sum + pos.profitLoss, 0).toFixed(2)}
          </p>
        </div>
      </div>

      {/* Positions */}
      <div className="card p-6">
        <h2 className="text-lg font-medium mb-4">Current Positions</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Symbol</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Shares</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Avg Cost</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Current Price</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Market Value</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">P/L</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {positions.map(position => (
                <tr key={position.symbol} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {position.symbol}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                    {position.shares}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                    ${position.averageCost.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                    ${stocks.find(s => s.symbol === position.symbol)?.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium">
                    ${position.currentValue.toFixed(2)}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm text-right font-medium ${
                    position.profitLoss >= 0 ? 'text-success-600' : 'text-danger-600'
                  }`}>
                    ${position.profitLoss.toFixed(2)}
                    <span className="text-xs ml-1">
                      ({position.profitLossPercent.toFixed(2)}%)
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Stock List */}
      <div className="card p-6">
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
            <input
              type="text"
              placeholder="Search stocks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input pl-10 w-full"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Symbol</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Change</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredStocks.map((stock) => (
                <tr key={stock.symbol} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {stock.symbol}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {stock.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium">
                    ${stock.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end space-x-2">
                      {stock.change >= 0 ? (
                        <TrendingUp size={16} className="text-success-500" />
                      ) : (
                        <TrendingDown size={16} className="text-danger-500" />
                      )}
                      <span className={`text-sm font-medium ${
                        stock.change >= 0 ? 'text-success-600' : 'text-danger-600'
                      }`}>
                        {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <button
                        onClick={() => handleAddTransaction(stock)}
                        className="btn btn-primary btn-sm"
                      >
                        Trade
                      </button>
                      <button
                        onClick={() => toggleFavorite(stock.symbol)}
                        className={`text-2xl transition-colors ${
                          stock.isFavorite ? 'text-warning-400' : 'text-gray-300 hover:text-warning-400'
                        }`}
                      >
                        ★
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Transaction Modal */}
      {isTransactionModalOpen && selectedStock && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            className="bg-white rounded-xl shadow-xl w-full max-w-md"
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold">
                Trade {selectedStock.symbol}
              </h2>
              <button
                onClick={() => setIsTransactionModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleTransactionSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Transaction Type
                </label>
                <select
                  value={transactionForm.type}
                  onChange={(e) => setTransactionForm({ ...transactionForm, type: e.target.value })}
                  className="input"
                >
                  <option value="buy">Buy</option>
                  <option value="sell">Sell</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Shares
                </label>
                <input
                  type="number"
                  min="1"
                  step="1"
                  value={transactionForm.shares}
                  onChange={(e) => setTransactionForm({ ...transactionForm, shares: e.target.value })}
                  className="input"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price per Share
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                    $
                  </span>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={transactionForm.price}
                    onChange={(e) => setTransactionForm({ ...transactionForm, price: e.target.value })}
                    className="input pl-8"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  value={transactionForm.date}
                  onChange={(e) => setTransactionForm({ ...transactionForm, date: e.target.value })}
                  className="input"
                  required
                />
              </div>

              <div className="pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-4">
                  Total: ${(parseFloat(transactionForm.shares || '0') * parseFloat(transactionForm.price || '0')).toFixed(2)}
                </p>
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setIsTransactionModalOpen(false)}
                    className="btn btn-secondary"
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary flex items-center"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={20} className="mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      'Confirm Trade'
                    )}
                  </button>
                </div>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default StocksPage;