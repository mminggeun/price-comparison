import React from 'react';
import { Line } from 'react-chartjs-2';
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

// Chart.js 모듈을 명시적으로 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface PriceGraphProps {
  data: { time: string; price: number }[];
}

const PriceGraph: React.FC<PriceGraphProps> = ({ data }) => {
  // Chart.js에 전달할 데이터 형식 변환
  const chartData = {
    labels: data.map((entry) => entry.time),
    datasets: [
      {
        label: '가격 변동',
        data: data.map((entry) => entry.price),
        fill: false,
        borderColor: 'blue',
        tension: 0.1,
      },
    ],
  };

  return (
    <div>
      <h3>가격 변동 그래프</h3>
      <Line data={chartData} />
    </div>
  );
};

export default PriceGraph;
