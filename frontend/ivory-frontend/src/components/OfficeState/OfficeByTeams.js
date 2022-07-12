import React from 'react';
import { Card } from 'react-bootstrap';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  plugins: {
    title: {
      display: true,
      text: 'Occupancy by division',
    },
  },
  responsive: true,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Asset Management',
      data: [30,53,76,34,51,30,42],
      backgroundColor: 'rgb(255, 99, 132)',
    },
    {
      label: 'Consumer & Wealth Management',
      data: [72,34,51,78,81,78,98],
      backgroundColor: 'rgb(75, 192, 192)',
    },
    {
      label: 'Engineering',
      data: [90,112,64,199,52,102,109],
      backgroundColor: 'rgb(53, 162, 235)',
    },
  ],
};

export function OfficeByTeams() {
  return (
    <Card className="graph-card">
      <Bar options={options} data={data} />
    </Card>
  );
}
