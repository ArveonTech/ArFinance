import { useEffect, useState } from "react";

const getYear = new Date().getFullYear();
const minYear = getYear - 5;
const maxYear = getYear + 5;

// Bikin array dari 2020 sampai 2030
const yearList = [];

for (let y = minYear; y <= maxYear; y++) {
  yearList.push(y);
}

const useBalanceAll = (setDataBalance, incomeDataset, expenseDataset, dataFilter) => {
  const { type, year, month } = dataFilter;

  const [dataAnalytics, setDataAnalytics] = useState({});

  useEffect(() => {
    if (!type && !year && !month) {
      const finalResult = {};
      const result = {};

      const sumType = (dataset) => {
        for (let type in dataset) {
          const dataTypeBalance = dataset[type];

          dataTypeBalance.forEach((yearItems) => {
            const year = yearItems.year;
            const dataYear = yearItems.data;
            let total = 0;

            for (let month in dataYear) {
              total += dataYear[month].reduce((sum, curMonth) => sum + Number(curMonth.amount), 0);
            }

            if (!result[type]) {
              result[type] = {};
            }

            result[type][year] = total;
          });
        }
      };

      sumType(setDataBalance);

      for (let type in result) {
        if (!finalResult[type]) {
          finalResult[type] = [];
        }
        yearList.map((yearItems) => {
          const total = result[type][yearItems] ?? 0;
          finalResult[type].push({ year: yearItems, data: total, color: type === "income" ? "#00CE59" : "#FC3C42" });
        });
      }

      setDataAnalytics(finalResult);
    }

    if (type && !year && !month) {
      const finalResult = {};
      const result = {};

      const sumType = (dataset) => {
        dataset.forEach((yearItems) => {
          const year = yearItems.year;
          const dataYear = yearItems.data;
          let total = 0;

          for (let month in dataYear) {
            total += dataYear[month].reduce((sum, curMonth) => sum + Number(curMonth.amount), 0);
          }

          if (!result[type]) {
            result[type] = {};
          }

          result[type][year] = total;
        });
      };

      sumType(setDataBalance[type]);
      console.log(setDataBalance[type]);

      for (let type in result) {
        if (!finalResult[type]) {
          finalResult[type] = [];
        }
        yearList.map((yearItems) => {
          const total = result[type][yearItems] ?? 0;
          finalResult[type].push({ year: yearItems, data: total, color: type === "income" ? "#00CE59" : "#FC3C42" });
        });
      }

      setDataAnalytics(finalResult);
    }
  }, [incomeDataset, expenseDataset, type, year, month]);

  return { dataAnalytics };
};

export default useBalanceAll;
