import {React, useEffect, useState} from 'react';
import { Grid, Paper, Typography} from '@mui/material';
import MonthlySpendChart from '../components/MonthlySpendChart';
import InfoBox from '../components/InfoBox';
import { ROUTES } from '../routes';
import { get } from '../utils/api';

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
  const [contaCorrente,setContaCorrente] = useState([]);

  useEffect(() => {
    const fetchContaCorrente = async () => {
      try {
        const data = await get(ROUTES.BALANCE.MY);
        setContaCorrente(data);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };
    fetchContaCorrente()
  },[]);

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
         {contaCorrente.map((saldo) => (
            <InfoBox title={saldo.typeName} value={saldo.valueConsume} />
         ))}

        </Grid>      

      </Grid>
    </div>
  );
};

export default Dashboard;