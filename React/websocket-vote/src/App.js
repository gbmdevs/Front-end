import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Client } from '@stomp/stompjs'; // Use @stomp/stompjs

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function App() {
  const [votes, setVotes] = useState({
    option1: 0,
    option2: 0,
    option3: 0,
  });

  useEffect(() => {
    const client = new Client({
      brokerURL: 'ws://localhost:5000/ws', // WebSocket endpoint
      onConnect: () => {
        client.subscribe('/topic/votes', (message) => {
          const updatedVotes = JSON.parse(message.body);
          setVotes(updatedVotes);
        });
      },
      onStompError: (error) => {
        console.error('STOMP error:', error);
      },
    });

    client.activate();

    return () => {
      client.deactivate();
    };
  }, []);

  const handleVote = (option) => {
    const client = new Client({
      brokerURL: 'ws://localhost:5000/ws',
    });

    client.onConnect = () => {
      client.publish({
        destination: '/app/vote',
        body: option,
      });
      client.deactivate();
    };

    client.activate();
  };

  const data = {
    labels: ['Option 1', 'Option 2', 'Option 3'],
    datasets: [
      {
        label: 'Votes',
        data: [votes.option1, votes.option2, votes.option3],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Real-Time Vote Graph',
      },
    },
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Votação do Mozão</h1>
      <div style={{ marginBottom: '20px' }}>
        <button onClick={() => handleVote('option1')}>Vote Option 1</button>
        <button onClick={() => handleVote('option2')}>Vote Option 2</button>
        <button onClick={() => handleVote('option3')}>Vote Option 3</button>
      </div>
      <div style={{ width: '50%', margin: '0 auto' }}>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}

export default App;