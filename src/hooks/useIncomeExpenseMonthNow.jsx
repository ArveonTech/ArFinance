import { useEffect, useState } from "react";

const monthsList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

let yearNow = new Date().getFullYear();
let monthNow = new Date().getMonth();
let month = monthsList[monthNow];

const useIncomeExpenseMonthNow = (incomeDataset, expenseDataset) => {
  // ambil amount income dan expense bulan ini
  const [incomeMonthNow, setIncomeMonthNow] = useState(0);
  const [expenseMonthNow, setExpenseMonthNow] = useState(0);

  // ambil balance data bulan sekarang
  useEffect(() => {
    if (incomeDataset.length === 0 && expenseDataset.length === 0) return;

    const temptArrayAmountIncomeMonth = [];
    const temptArrayAmountExpenseMonth = [];

    // ambil data income tahun ini
    const dataYearNowIncome = incomeDataset.find((items) => {
      if (items.year === yearNow) {
        return items;
      }
    });

    const dataYearNowExpense = expenseDataset.find((items) => {
      if (items.year === yearNow) {
        return items;
      }
    });

    if (!dataYearNowIncome) {
      temptArrayAmountIncomeMonth.push(0);
    } else {
      for (let key in dataYearNowIncome.data) {
        if (key === month) {
          dataYearNowIncome.data[month].map((items) => {
            temptArrayAmountIncomeMonth.push(Number(items.amount));
          });
        }
      }
    }

    if (!dataYearNowExpense) {
      temptArrayAmountExpenseMonth.push(0);
    } else {
      for (let key in dataYearNowExpense.data) {
        if (key === month) {
          dataYearNowExpense.data[month].map((items) => {
            temptArrayAmountExpenseMonth.push(Number(items.amount));
          });
        }
      }
    }

    const totalAmountIncome = temptArrayAmountIncomeMonth.reduce((acc, cur) => (acc += cur), 0);
    const totalAmountExpense = temptArrayAmountExpenseMonth.reduce((acc, cur) => (acc += cur), 0);

    setIncomeMonthNow(totalAmountIncome);
    setExpenseMonthNow(totalAmountExpense);
  }, [incomeDataset, expenseDataset]);

  return { incomeMonthNow, expenseMonthNow };
};

export default useIncomeExpenseMonthNow;
