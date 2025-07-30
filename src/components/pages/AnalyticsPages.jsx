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
import FilteringAnalytics from "../templates/FilteringAnalytics";
import { useState } from "react";
import useBalanceAll from "../../hooks/analytics/useBalanceAll";
import { useTheme } from "../features/ThemeProvider";

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
  // ambil theme
  const { theme, setTheme } = useTheme();

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

  // letak perubahan dari comp parent ke setDataFilter
  const handleDataFiltering = (data) => {
    setDataFilter(data);
  };

  // buat fungsi untuk dapatkan hari di bulan itu
  const getDatesInMonth = (year, month) => {
    const dates = [];
    const date = new Date(year, month, 1);
    console.log(month);

    while (date.getMonth() === month) {
      const day = String(date.getDate()).padStart(2, "0");
      dates.push(day);
      date.setDate(date.getDate() + 1);
    }

    return dates;
  };

  // ambil data analyitics
  const { dataAnalytics } = useBalanceAll(setDataBalance, incomeDataset, expenseDataset, dataFilter);
  const { type, year, month } = dataFilter;

  const labelsBarDetail = (type, year, month) => {
    if (type && !year && !month) return yearList;
    if (type && year && !month) return monthsList.short;
    if (type && year && month) {
      const indexMonth = monthsList.long.indexOf(month);

      const daysMonth = getDatesInMonth(year, indexMonth, 1);

      return daysMonth;
    }
    return yearList;
  };

  const datasetBarDetail = (type, year, month) => {
    if (type && !year && !month)
      return [
        {
          label: dataAnalytics.income ? "income" : "",
          data: dataAnalytics.income?.map((d) => d.data) || [],
          backgroundColor: dataAnalytics.income?.length > 0 ? dataAnalytics.income.map((d) => d.color) : undefined,
        },
        {
          label: dataAnalytics.expense ? "expense" : "",
          data: dataAnalytics.expense?.map((d) => d.data) || [],
          backgroundColor: dataAnalytics.expense?.length > 0 ? dataAnalytics.expense.map((d) => d.color) : undefined,
        },
      ];
    if (type && year && !month)
      return [
        {
          label: type,
          data: Object.values(dataAnalytics),
          backgroundColor: type === "income" ? "#00CE59" : "#FC3C42",
          borderRadius: 2,
        },
      ];

    if (type && year && month)
      return [
        {
          label: type,
          data: Object.values(dataAnalytics),
          backgroundColor: type === "income" ? "#00CE59" : "#FC3C42",
          borderRadius: 2,
        },
      ];

    return [
      {
        label: dataAnalytics.income ? "income" : "",
        data: dataAnalytics.income?.map((d) => d.data) || [],
        backgroundColor: dataAnalytics.income?.length > 0 ? dataAnalytics.income.map((d) => d.color) : undefined,
      },
      {
        label: dataAnalytics.expense ? "expense" : "",
        data: dataAnalytics.expense?.map((d) => d.data) || [],
        backgroundColor: dataAnalytics.expense?.length > 0 ? dataAnalytics.expense.map((d) => d.color) : undefined,
      },
    ];
  };

  const getThemeColor = (theme) => {
    if (theme === "dark") return "#fff";

    return "#000";
  };

  const dataBarDetail = {
    labels: labelsBarDetail(type, year, month),
    datasets: datasetBarDetail(type, year, month),
  };

  const optionsBarDetail = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        labels: {
          color: getThemeColor(theme),
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
    <div className="text-primary">
      <div className="mt-10 flex flex-wrap gap-16">
        <ExpneseByCate dataDistriCate={dataDistriCate} />
        <Insight data={{ LowSpending, totalTransactions, mostExpensiveDay }} />
      </div>
      <div className="flex justify-center my-8">
        <div className="w-[350px] h-[450px] sm:w-[450px] sm:h-[450px] md:w-[470px] lg:w-[700px] lg:h-[470px] xl:w-[900px] 2xl:w-[1000px] shadow-lg rounded-3xl bg-card pb-28 md:pb-32 px-2 pt-4">
          <h1 className="text-xl text-center mb-4 font-semibold"> Financial Overview Detail</h1>
          <FilteringAnalytics data={{ handleDataFiltering, incomeDataset, expenseDataset, setDataBalance }} />
          <Bar data={dataBarDetail} options={optionsBarDetail} style={{ width: "100px" }} />
        </div>
      </div>
    </div>
  );
};

export default AnalysisPages;
