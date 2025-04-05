import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">Planilha financeira</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;