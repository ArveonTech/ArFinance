import { useEffect, useState } from "react";

const useDataSet = (setDataBalance) => {
  // income dataset
  const [incomeDataset, setIncomeDataset] = useState([]);
  // expense dataset
  const [expenseDataset, setExpenseDataset] = useState([]);

  // ambil dataset income dan expense disetiap perubahan
  useEffect(() => {
    setIncomeDataset(setDataBalance.income);
    setExpenseDataset(setDataBalance.expense);
  }, [setDataBalance]);

  return { incomeDataset, expenseDataset };
};

export default useDataSet;
