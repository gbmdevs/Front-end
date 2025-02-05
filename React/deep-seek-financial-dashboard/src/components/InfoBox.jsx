import React from 'react';
import { Paper, Typography } from '@mui/material';

const InfoBox = ({ title, value }) => {
  return (
    <Paper style={{ padding: '20px', marginBottom: '20px' }}>
      <Typography variant="h6">{title}</Typography>
      <Typography variant="h4">{value}</Typography>
    </Paper>
  );
};

export default InfoBox;