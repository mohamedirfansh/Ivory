import React from "react";
import { Card } from "react-bootstrap";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function OfficeOccupancy() {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Office occupancy',
      },
    },
  };
  const labels = ['04/07', '05/07', '06/07', '07/07', '08/07', '11/07', '12/07'];
  const data = {
    labels,
    datasets: [
      {
        label: 'Anson',
        data: [121,232,221,123,121,90,73],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Raffles',
        data: [221,334,126,212,223,127,96],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  return (
    <Card className="graph-card">
      <Line options={options} data={data} />
    </Card>
  );
}