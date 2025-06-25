import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Check, Clock, X, CreditCard, Edit2 } from 'lucide-react';
import { format, addMonths, subMonths } from 'date-fns';

interface Bill {
  id: string;
  name: string;
  amount: number;
  dueDate: string;
  status: 'pending' | 'paid';
  category: string;
  paidDate?: string;
}

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  bill: Bill | null;
  onConfirm: (paidDate: string) => void;
}

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  bill: Bill | null;
  onSave: (updatedBill: Bill) => void;
}

const EditModal: React.FC<EditModalProps> = ({ isOpen, onClose, bill, onSave }) => {
  const [formData, setFormData] = useState({
    name: bill?.name || '',
    amount: bill?.amount.toString() || '',
    category: bill?.category || '',
    dueDate: bill?.dueDate || '',
  });

  if (!isOpen || !bill) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...bill,
      name: formData.name,
      amount: parseFloat(formData.amount),
      category: formData.category,
      dueDate: formData.dueDate,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center">
        <div className="fixed inset-0 transition-opacity bg-black bg-opacity-75" onClick={onClose}></div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="inline-block w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white rounded-lg shadow-xl relative"
        >
          <div className="absolute top-4 right-4">
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <X size={20} />
            </button>
          </div>

          <h3 className="text-lg font-medium text-gray-900 mb-4">Edit Bill</h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="input"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
              <input
                type="number"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                className="input"
                step="0.01"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="input"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
              <input
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                className="input"
                required
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button type="button" onClick={onClose} className="btn btn-secondary">
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Save Changes
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, bill, onConfirm }) => {
  const [paidDate, setPaidDate] = useState(new Date().toISOString().split('T')[0]);

  if (!isOpen || !bill) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center">
        <div className="fixed inset-0 transition-opacity bg-black bg-opacity-75" onClick={onClose}></div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="inline-block w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white rounded-lg shadow-xl relative"
        >
          <div className="absolute top-4 right-4">
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <X size={20} />
            </button>
          </div>

          <div className="text-center mb-6">
            <div className="mx-auto w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
              <CreditCard size={24} className="text-primary-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">Confirm Payment</h3>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Bill</span>
              <span className="font-medium">{bill.name}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Amount</span>
              <span className="font-medium">${bill.amount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-4">
              <span className="text-gray-600">Due Date</span>
              <span className="font-medium">{format(new Date(bill.dueDate), 'MMM d, yyyy')}</span>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Payment Date</label>
              <input
                type="date"
                value={paidDate}
                onChange={(e) => setPaidDate(e.target.value)}
                className="input"
                max={new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onConfirm(paidDate);
                onClose();
              }}
              className="btn btn-primary flex items-center"
            >
              <Check size={18} className="mr-2" />
              Confirm Payment
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const initialBills: Bill[] = [
  {
    id: '1',
    name: 'Rent',
    amount: 1200,
    dueDate: '2024-03-01',
    status: 'paid',
    category: 'Housing',
    paidDate: '2024-03-01'
  },
  {
    id: '2',
    name: 'Electricity',
    amount: 85,
    dueDate: '2024-03-15',
    status: 'pending',
    category: 'Utilities'
  },
  {
    id: '3',
    name: 'Internet',
    amount: 75,
    dueDate: '2024-03-10',
    status: 'paid',
    category: 'Utilities',
    paidDate: '2024-03-10'
  },
  {
    id: '4',
    name: 'Water',
    amount: 45,
    dueDate: '2024-03-20',
    status: 'pending',
    category: 'Utilities'
  }
];

const MonthlyBillsPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [bills, setBills] = useState<Bill[]>(initialBills);
  const [selectedBill, setSelectedBill] = useState<Bill | null>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handlePreviousMonth = () => {
    setCurrentDate(prev => subMonths(prev, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(prev => addMonths(prev, 1));
  };

  const handlePayment = (bill: Bill) => {
    setSelectedBill(bill);
    setIsPaymentModalOpen(true);
  };

  const handleEdit = (bill: Bill) => {
    setSelectedBill(bill);
    setIsEditModalOpen(true);
  };

  const confirmPayment = (paidDate: string) => {
    if (selectedBill) {
      setBills(prev =>
        prev.map(bill =>
          bill.id === selectedBill.id ? { ...bill, status: 'paid', paidDate } : bill
        )
      );
    }
  };

  const handleSaveEdit = (updatedBill: Bill) => {
    setBills(prev =>
      prev.map(bill => (bill.id === updatedBill.id ? updatedBill : bill))
    );
  };

  const totalAmount = bills.reduce((sum, bill) => sum + bill.amount, 0);
  const paidAmount = bills.filter(bill => bill.status === 'paid')
    .reduce((sum, bill) => sum + bill.amount, 0);
  const pendingAmount = totalAmount - paidAmount;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Monthly Bills</h1>
        <div className="flex items-center space-x-4">
          <button
            onClick={handlePreviousMonth}
            className="btn btn-secondary btn-sm"
          >
            <ChevronLeft size={20} />
          </button>
          <span className="text-lg font-medium">
            {format(currentDate, 'MMMM yyyy')}
          </span>
          <button
            onClick={handleNextMonth}
            className="btn btn-secondary btn-sm"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card p-6 bg-white">
          <h3 className="text-sm font-medium text-gray-500">Total Bills</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">${totalAmount.toFixed(2)}</p>
          <div className="mt-4 flex items-center text-sm text-gray-600">
            <span>{bills.length} bills this month</span>
          </div>
        </div>

        <div className="card p-6 bg-white">
          <h3 className="text-sm font-medium text-gray-500">Paid</h3>
          <p className="mt-2 text-3xl font-bold text-success-600">${paidAmount.toFixed(2)}</p>
          <div className="mt-4 flex items-center text-sm text-success-600">
            <Check size={16} className="mr-1" />
            <span>{bills.filter(b => b.status === 'paid').length} bills paid</span>
          </div>
        </div>

        <div className="card p-6 bg-white">
          <h3 className="text-sm font-medium text-gray-500">Pending</h3>
          <p className="mt-2 text-3xl font-bold text-warning-600">${pendingAmount.toFixed(2)}</p>
          <div className="mt-4 flex items-center text-sm text-warning-600">
            <Clock size={16} className="mr-1" />
            <span>{bills.filter(b => b.status === 'pending').length} bills pending</span>
          </div>
        </div>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bill</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Paid Date</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {bills.map((bill) => (
                <tr key={bill.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {bill.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {bill.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {format(new Date(bill.dueDate), 'MMM d, yyyy')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium">
                    ${bill.amount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium inline-flex items-center justify-center ${
                        bill.status === 'paid'
                          ? 'bg-success-100 text-success-800'
                          : 'bg-warning-100 text-warning-800'
                      }`}
                    >
                      {bill.status === 'paid' ? (
                        <>
                          <Check size={14} className="mr-1" />
                          Paid
                        </>
                      ) : (
                        <>
                          <Clock size={14} className="mr-1" />
                          Pending
                        </>
                      )}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">
                    {bill.paidDate ? format(new Date(bill.paidDate), 'MMM d, yyyy') : '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <button
                        onClick={() => handleEdit(bill)}
                        className="text-primary-600 hover:text-primary-900"
                      >
                        <Edit2 size={16} />
                      </button>
                      {bill.status === 'pending' && (
                        <button
                          onClick={() => handlePayment(bill)}
                          className="btn btn-primary btn-sm"
                        >
                          Pay Now
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        bill={selectedBill}
        onConfirm={confirmPayment}
      />

      <EditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        bill={selectedBill}
        onSave={handleSaveEdit}
      />
    </motion.div>
  );
};

export default MonthlyBillsPage;