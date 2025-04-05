import React from 'react';
import { Typography } from '@mui/material';

const Reports = () => {
  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#333333' }}>
        Reports
      </Typography>
      <Typography variant="body1">
        This is the Reports page. You can add charts, tables, or other components here.
      </Typography>
    </div>
  );
};

export default Reports;