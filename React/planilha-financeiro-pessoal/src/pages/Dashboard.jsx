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
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
    <div>
      <h1 className="text-3xl font-bold">Expense Dashboard</h1>
      <p className="text-muted-foreground">Track and analyze your spending habits</p>
    </div>
  </div>
  );
};

export default Dashboard;