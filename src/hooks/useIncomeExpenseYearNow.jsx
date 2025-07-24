import { useEffect, useState } from "react";

const monthsList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

let yearNow = new Date().getFullYear();

const useIncomeExpenseYearNow = (incomeDataset, expenseDataset) => {
  // ambil amount income dan expense bulan ini
  const [incomeYearNow, setIncomeYearNow] = useState({});
  const [expenseYearNow, setExpenseYearNow] = useState({});

  // ambil balance data bulan sekarang
  useEffect(() => {
    if (!incomeDataset.length && !expenseDataset.length) return;

    // ambil data income tahun ini
    const dataYearNowIncome = incomeDataset.find((items) => items.year === yearNow)?.data || {};
    const dataYearNowExpense = expenseDataset.find((items) => items.year === yearNow)?.data || {};

    const dataMonth = (dataset) => {
      const hasil = {};

      for (let i = 0; i < monthsList.length; i++) {
        const bulan = monthsList[i];
        if (dataset[bulan]) {
          const total = dataset[bulan].reduce((acc, item) => acc + Number(item.amount), 0);
          hasil[bulan] = total;
        } else {
          hasil[bulan] = 0;
        }
      }

      return hasil;
    };

    setIncomeYearNow(dataMonth(dataYearNowIncome));
    setExpenseYearNow(dataMonth(dataYearNowExpense));
  }, [incomeDataset, expenseDataset]);

  return { incomeYearNow, expenseYearNow };
};

export default useIncomeExpenseYearNow;
