import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import MonthlySpendChart from '../components/MonthlySpendChart';
import InfoBox from '../components/InfoBox';

const Dashboard = () => {
  const monthlyData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Monthly Expenses',
        data: [500, 600, 700, 800, 900, 1000],
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper style={{ padding: '20px' }}>
            <MonthlySpendChart data={monthlyData} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <InfoBox title="Total Spent" value="$3,500" />
          <InfoBox title="Average Monthly Spend" value="$583" />
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;