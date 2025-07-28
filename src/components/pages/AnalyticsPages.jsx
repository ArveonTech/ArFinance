import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from "chart.js";
import { useSelector } from "react-redux";
import useDistriCate from "../../hooks/useDistriCate";
import useLowSpending from "../../hooks/useLowSpending";
import Insight from "../templates/Insight";
import useTotalTransactions from "../../hooks/useTotalTransactions";
import useDataSet from "../../hooks/useDataSet";
import useMostExpensiveDay from "../../hooks/useMostExpensiveDay";
import ExpneseByCate from "../templates/ExpenseByCate";
import FilteringAnalytics from "../templates/filteringAnalytics";
import { useEffect, useState } from "react";
import useBalanceAll from "../../hooks/analytics/useBalanceAll";

ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const monthsList = {
  short: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  long: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
};

const getYear = new Date().getFullYear();
const minYear = getYear - 5;
const maxYear = getYear + 5;

// Bikin array dari 2020 sampai 2030
const yearList = [];

for (let y = minYear; y <= maxYear; y++) {
  yearList.push(y);
}

const AnalysisPages = () => {
  // ambil data dari local lewat store
  const setDataBalance = useSelector((state) => state.financeData);

  // dataset income dan expense
  const { incomeDataset, expenseDataset } = useDataSet(setDataBalance);

  // chart
  const dataDistriCate = useDistriCate(expenseDataset);

  // data filter
  const [dataFilter, setDataFilter] = useState({
    type: "",
    year: "",
    month: "",
  });

  // pengeluaran terkecil
  const { LowSpending } = useLowSpending(expenseDataset);

  // jumlah transaksi
  const { totalTransactions } = useTotalTransactions(incomeDataset, expenseDataset);

  // hari pengeluaran terbesar
  const { mostExpensiveDay } = useMostExpensiveDay(expenseDataset);

  const handleDataFiltering = (data) => {
    setDataFilter(data);
  };

  // ambil data analyitics
  const { dataAnalytics } = useBalanceAll(setDataBalance, incomeDataset, expenseDataset, dataFilter);

  const dataBarDetail = {
    labels: yearList,
    datasets: [
      {
        label: "Income",
        data: dataAnalytics.income?.map((d) => d.data) || [],
        backgroundColor: dataAnalytics.income?.map((d) => d.color) || [],
      },
      {
        label: "Expense",
        data: dataAnalytics.expense?.map((d) => d.data) || [],
        backgroundColor: dataAnalytics.expense?.map((d) => d.color) || [],
      },
    ],
  };

  const optionsBarDetail = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        labels: {
          color: "#000",
          font: {
            size: 16,
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <div className="mt-10 flex flex-wrap gap-16">
        <ExpneseByCate dataDistriCate={dataDistriCate} />
        <Insight data={{ LowSpending, totalTransactions, mostExpensiveDay }} />
      </div>
      <div className="flex justify-center my-10">
        <div className="w-[350px] h-[450px] sm:w-[450px] sm:h-[450px] md:w-[470px] lg:w-[700px] lg:h-[470px] xl:w-[900px] 2xl:w-[1000px] shadow-lg rounded-3xl bg-white pb-28 md:pb-32 px-2 pt-4">
          <h1 className="text-xl text-center mb-4 font-semibold"> Financial Overview Detail</h1>
          <FilteringAnalytics data={{ handleDataFiltering, incomeDataset, expenseDataset, setDataBalance }} />
          <Bar data={dataBarDetail} options={optionsBarDetail} style={{ width: "100px" }} />
        </div>
      </div>
    </div>
  );
};

export default AnalysisPages;
