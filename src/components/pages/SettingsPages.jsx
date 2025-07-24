import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from "chart.js/auto";

// Register komponen Chart.js yg dipakai
ChartJS.register(BarElement, CategoryScale, LinearScale);

// Data & config
const data = {
  labels: ["Jan", "Feb", "Mar"],
  datasets: [
    {
      label: "Income",
      data: [300, 500, 7000],
      backgroundColor: "rgba(75, 192, 192, 0.6)",
    },
    {
      label: "Expense",
      data: [300, 500, 700],
      backgroundColor: "rgba(75, 192, 0, 0.6)",
    },
  ],
};

const options = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

// Komponen chart-nya
export default function MyChart() {
  return <Bar data={data} options={options} className="mt-20"/>;
}
