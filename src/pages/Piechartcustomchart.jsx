import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register the required elements
ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: ['Corn', 'Soybeans', 'Wheat', 'Cotton', 'Rice'],
  datasets: [
    {
      data: [80, 60, 40, 35, 35],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
    },
  ],
};

const PiechartcustomChart = () => {
  return <Pie data={data} />;
};

export default PiechartcustomChart;
