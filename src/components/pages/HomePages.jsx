import { useSelector } from "react-redux";
import UseAmountBalance from "../../hooks/useAmountBalance";
import useIncomeExpenseMonthNow from "../../hooks/useIncomeExpenseMonthNow";
import useDataSet from "../../hooks/useDataSet";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from "chart.js";
import useIncomeExpenseYearNow from "../../hooks/useIncomeExpenseYearNow";
import useTopSpending from "../../hooks/useTopSpending";
import { TrendingDown, TrendingUp, Wallet} from "lucide-react";
import useLastAdded from "../../hooks/useLastAdded";
import TopSpending from "../templates/TopSpending";
import LastAdded from "../templates/LastAdded";
import CardBalance from "../templates/CardBalance";

ChartJS.register(BarElement, CategoryScale, LinearScale);

const monthsList = {
  short: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  long: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
};

let yearNow = new Date().getFullYear();
let monthNow = new Date().getMonth();
let month = monthsList.long[monthNow];

const HomePages = () => {
  // ambil data dari local lewat store
  const setDataBalance = useSelector((state) => state.financeData);

  // dataset income dan expense
  const { incomeDataset, expenseDataset } = useDataSet(setDataBalance);

  // total Balance
  const totalBalance = UseAmountBalance(incomeDataset, expenseDataset);

  // ambil amount income dan expense bulan ini
  const { incomeMonthNow, expenseMonthNow } = useIncomeExpenseMonthNow(incomeDataset, expenseDataset);

  // ambil amount income dan expense bulan ini
  const { incomeYearNow, expenseYearNow } = useIncomeExpenseYearNow(incomeDataset, expenseDataset);

  // top spending
  const { topSpending } = useTopSpending(expenseDataset);

  const { itemLastAdded } = useLastAdded(incomeDataset, expenseDataset);

  const arrayLastAdded = [itemLastAdded];

  const dataIncomeYearNow = Object.values(incomeYearNow);
  const dataExpenseYearNow = Object.values(expenseYearNow);

  const data = {
    labels: monthsList.short,
    datasets: [
      {
        label: "Income",
        data: dataIncomeYearNow,
        backgroundColor: "#00CE59",
        borderRadius: 2,
      },
      {
        label: "Expense",
        data: dataExpenseYearNow,
        backgroundColor: "#FC3C42",
        borderRadius: 2,
      },
    ],
  };

  const options = {
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

  const cardBalance = [
    { id: "balance", title: "Balance", bg: "bg-gradient-to-br from-green-400 via-green-500 to-green-900", balance: totalBalance, icons: <Wallet size={25} /> },
    { id: "income", title: `${month} Income`, bg: "bg-gradient-to-br from-blue-400 via-blue-500 to-blue-900", balance: incomeMonthNow, icons: <TrendingUp size={25} /> },
    { id: "expand", title: `${month} Expense`, bg: "bg-gradient-to-br from-red-400 via-red-500 to-red-900", balance: expenseMonthNow, icons: <TrendingDown size={25} /> },
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="flex pt-14 justify-around gap-10 px-5 flex-wrap flex-1/3">
        <CardBalance data={cardBalance} />
      </div>
      <div className="md:mx-0 flex flex-wrap sm:flex-col items-center justify-center gap-20 md:flex-row md:justify-baseline mt-20 lg:mt-10 mb-10 flex-2/3">
        <div className="sm:w-[430px] h-[400px] md:w-[470px] md:h-[400px] lg:w-[600px] shadow-lg rounded-lg bg-white pb-12 px-2 pt-4">
          <h1 className="text-xl text-center mb-4 font-semibold"> Financial Overview for {yearNow}</h1>
          <Bar data={data} options={options} />
        </div>
        <div className="flex flex-col justify-center items-center gap-5">
          <TopSpending data={topSpending} />
          <LastAdded data={arrayLastAdded} />
        </div>
      </div>
    </div>
  );
};

export default HomePages;
