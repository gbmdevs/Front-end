import React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

const Expenses = () => {
  // Sample data for expenses
  const expenses = [
    { id: 1, category: 'Groceries', amount: 200, date: '2023-10-01' },
    { id: 2, category: 'Utilities', amount: 150, date: '2023-10-05' },
    { id: 3, category: 'Entertainment', amount: 100, date: '2023-10-10' },
    { id: 4, category: 'Transport', amount: 50, date: '2023-10-15' },
    { id: 5, category: 'Rent', amount: 1200, date: '2023-10-20' },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#333333' }}>
        Expenses
      </Typography>
      <Paper sx={{ boxShadow: 3 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#1976D2' }}>
                <TableCell sx={{ color: '#FFFFFF', fontWeight: 'bold' }}>Category</TableCell>
                <TableCell sx={{ color: '#FFFFFF', fontWeight: 'bold' }}>Amount</TableCell>
                <TableCell sx={{ color: '#FFFFFF', fontWeight: 'bold' }}>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {expenses.map((expense) => (
                <TableRow key={expense.id} sx={{ '&:hover': { backgroundColor: '#F5F5F5' } }}>
                  <TableCell>{expense.category}</TableCell>
                  <TableCell>${expense.amount}</TableCell>
                  <TableCell>{expense.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
};

export default Expenses;