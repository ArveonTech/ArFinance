import { useEffect, useState } from "react";

const useTopSpending = (expenseDataset) => {
  // ambil amount income dan expense bulan ini
  const [topSpending, setTopSpending] = useState({});

  // ambil balance data bulan sekarang
  useEffect(() => {
    if (!expenseDataset.length) return;

    const comparasion = {};

    expenseDataset.forEach((year) => {
      for (let month in year.data) {
        year.data[month].forEach((items) => {
          const { category, amount } = items;
          comparasion[category] = (comparasion[category] || 0) + Number(amount);
        });
      }
    });

    const result = Object.entries(comparasion).reduce((a, b) => (a[1] > b[1] ? a : b));

    const resultObject = { [result[0]]: result[1] };

    setTopSpending(resultObject);
  }, [expenseDataset]);

  return { topSpending };
};

export default useTopSpending;
