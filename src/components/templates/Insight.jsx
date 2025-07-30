import { SquareChartGantt } from "lucide-react";

const Insight = ({ data }) => {
  if (!data || Object.keys(data).length === 0) {
    return (
      <div className="w-[350px] mx-auto bg-card p-2 rounded-2xl shadow-2xl md:w-[400px] mt-10">
        <div className="flex items-center mb-2 justify-center relative">
          <h1 className="text-xl font-semibold text-center">Insight</h1>
          <SquareChartGantt className="absolute right-2" />
        </div>
        <hr className="mb-5" />
        <p className="text-center text-lg text-slate-500 italic">No insight data yet</p>
      </div>
    );
  }

  const { LowSpending, totalTransactions, mostExpensiveDay } = data;

  // pengeluaran terdikit
  const entries = Object.entries(LowSpending || {});
  const [category, spending] = entries.length ? entries[0] : ["-", 0];

  // total transaksi
  const incomeTrans = totalTransactions.Income;
  const expenseTrans = totalTransactions.Expense;

  // hari pengeluaran terbesar
  const { date, amount } = mostExpensiveDay;

  return (
    <div className="w-[350px] sm:w-[450px] mx-auto bg-card p-5 rounded-2xl shadow-2xl md:w-[400px] lg:w-[550px]">
      <div className="flex items-center mb-2 justify-center relative">
        <h1 className="text-xl font-semibold text-center">Insight</h1>
        <SquareChartGantt className="absolute right-2" />
      </div>
      <hr className="border-2 mb-4" />
      <div className="md:grid grid-cols-3 w-full">
        <div className=" p-3 mb-4 md:border-r-2">
          <p className="text-[17px] text-center font-medium mb-2">Low Spending</p>
          <hr className="mb-4 w-11/12 mx-auto" />
          {LowSpending ? (
            <div className="text-center">
              <p className="text-lg">{category.charAt(0).toUpperCase() + category.slice(1)}</p>
              <p className="text-red-400 text-lg">Rp.{spending.toLocaleString("id-ID")}</p>
            </div>
          ) : (
            <p className="text-center text-lg text-slate-500 italic">Most Expensive no data yet</p>
          )}
        </div>
        <div className=" p-3 mb-4 md:border-r-2">
          <p className="text-[17px] text-center font-medium mb-2">Total transactions</p>
          <hr className="mb-4 w-11/12 mx-auto" />
          <div className="text-center text-xl">
            <p className="font-medium">
              Income : <span className="font-semibold text-green-400">{incomeTrans}</span>
            </p>
            <p className="font-medium">
              Expense : <span className="font-semibold text-red-400">{expenseTrans}</span>
            </p>
          </div>
        </div>
        <div className="p-3">
          <p className="text-[17px] text-center font-medium mb-2">Most expensive day</p>
          <hr className="mb-4 w-11/12 mx-auto" />
          {mostExpensiveDay && Object.entries(mostExpensiveDay).length === 0 ? (
            <div className="gap-y-10 text-lg text-center ">
              <p>{date}</p>
              <p className="text-red-400">Rp.{Number(amount || 0).toLocaleString("id-ID")}</p>
            </div>
          ) : (
            <p className="text-center text-lg text-slate-500 italic">Most Expensive no data yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Insight;
