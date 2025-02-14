import React, { useState } from 'react';
import {
  Paper,
  Typography,
  Dialog,
  DialogTitle,
  Button,
  DialogActions,
  DialogContent,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  IconButton,
  InputAdornment,
  TablePagination,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';



const InfoBox = ({ title, value }) => {
  const [expenses, setExpenses] = useState([
    { id: 1, category: 'Groceries', amount: 200, date: '2023-10-01' },
    { id: 2, category: 'Utilities', amount: 150, date: '2023-10-05' },
    { id: 3, category: 'Entertainment', amount: 100, date: '2023-10-10' },
    { id: 4, category: 'Transport', amount: 50, date: '2023-10-15' },
    { id: 5, category: 'Rent', amount: 1200, date: '2023-10-20' },
    { id: 6, category: 'Groceries', amount: 250, date: '2023-10-25' },
    { id: 7, category: 'Utilities', amount: 180, date: '2023-10-30' },
  ]);
 
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Filter expenses based on category
  const filteredExpenses = expenses.filter((expense) =>
    expense.category.toLowerCase().includes(filter.toLowerCase())
  );

  // Pagination handlers
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Paginated data
  const paginatedExpenses = filteredExpenses.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  // Delete expense
  const handleDeleteExpense = (id) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  // Open modal
  const handleOpen = () => { 
    setOpen(true);
  };

  // Close modal
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Paper
        style={{ padding: '20px', marginBottom: '20px', cursor: 'pointer' }}
        onClick={handleOpen}
      >
        <Typography variant="h6">{title}</Typography>
        <Typography variant="h4">{value}</Typography>
      </Paper>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle>{title} - Extrato</DialogTitle>
        <DialogContent>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#333333' }}>
            Expenses
          </Typography>

          {/* Filter Bar */}
          <TextField
            fullWidth
            label="Filter by Category"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{ marginBottom: '20px' }}
          />

          {/* Table */}
          <Paper sx={{ boxShadow: 3 }}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: '#1976D2' }}>
                    <TableCell sx={{ color: '#FFFFFF', fontWeight: 'bold' }}>Category</TableCell>
                    <TableCell sx={{ color: '#FFFFFF', fontWeight: 'bold' }}>Amount</TableCell>
                    <TableCell sx={{ color: '#FFFFFF', fontWeight: 'bold' }}>Date</TableCell>
                    <TableCell sx={{ color: '#FFFFFF', fontWeight: 'bold' }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedExpenses.map((expense) => (
                    <TableRow
                      key={expense.id}
                      sx={{ '&:hover': { backgroundColor: '#F5F5F5', cursor: 'pointer' } }}
                    >
                      <TableCell>{expense.category}</TableCell>
                      <TableCell>${expense.amount}</TableCell>
                      <TableCell>{expense.date}</TableCell>
                      <TableCell>
                        <IconButton
                          aria-label="edit"
                          onClick={(e) => {
                            e.stopPropagation();
                            // Add edit functionality here
                          }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteExpense(expense.id);
                          }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Pagination */}
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={filteredExpenses.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default InfoBox;