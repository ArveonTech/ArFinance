import { useEffect, useState } from "react";

const useLastAdded = (incomeDataSet, expenseDataset) => {
  // ambil amount income dan expense bulan ini
  const [itemLastAdded, setLastAdded] = useState({});

  // ambil balance data bulan sekarang
  useEffect(() => {
    if (!incomeDataSet.length && !expenseDataset.length) return;

    const income = incomeDataSet || {};
    const expense = expenseDataset || {};

    const getLastAddedAt = (dataset) => {
      const allItems = [];

      dataset.forEach((yearData) => {
        const { data } = yearData;
        for (let month in data) {
          allItems.push(...data[month]);
        }
      });

      return allItems.reduce((latest, cur) => {
        return !latest || latest.addedAt < cur.addedAt ? cur : latest;
      }, null);
    };

    const incomeLastAdded = getLastAddedAt(income);
    const expenseLastAdded = getLastAddedAt(expense);

    if (incomeLastAdded && expenseLastAdded) {
      setLastAdded(incomeLastAdded.addedAt > expenseLastAdded.addedAt ? incomeLastAdded : expenseLastAdded);
    } else if (incomeLastAdded) {
      setLastAdded(incomeLastAdded);
    } else if (expenseLastAdded) {
      setLastAdded(expenseLastAdded);
    }
  }, [incomeDataSet, expenseDataset]);

  return { itemLastAdded };
};

export default useLastAdded;
