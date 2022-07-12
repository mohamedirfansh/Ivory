import React from 'react';
import { Card } from 'react-bootstrap';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ['Out Of Office', 'In Office'],
  datasets: [
    {
      label: 'Occupancy',
      data: [163, 604],
      backgroundColor: [
        'rgba(255, 99, 132, 0.8)',
        'rgba(53, 162, 235, 0.8)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(53, 162, 235, 1)',
      ],
      borderWidth: 1,
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
      text: 'Office state today',
    },
  },
};

export function OfficeCapacity() {
  return (
    <Card className="graph-card">
      <Pie options={options} data={data} />
    </Card>
  );
}