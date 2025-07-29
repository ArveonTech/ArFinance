import { useEffect, useState } from "react";

// untuk type
const getYear = new Date().getFullYear();
const minYear = getYear - 5;
const maxYear = getYear + 5;

// Bikin array dari 2020 sampai 2030
const yearList = [];

for (let y = minYear; y <= maxYear; y++) {
  yearList.push(y);
}

// untyuk tahun

const monthsList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

let yearNow = new Date().getFullYear();
let monthNow = new Date().getMonth();
let month = monthsList[monthNow];

const useBalanceAll = (setDataBalance, incomeDataset, expenseDataset, dataFilter) => {
  const { type, year, month } = dataFilter;

  const [dataAnalytics, setDataAnalytics] = useState({});

  const getDatesInMonth = (year, month) => {
    const dates = [];
    const date = new Date(year, month, 1);

    while (date.getMonth() === month) {
      const day = String(date.getDate()).padStart(2, "0");
      dates.push(day);
      date.setDate(date.getDate() + 1);
    }

    return dates;
  };

  useEffect(() => {
    // jika tidak select type,year,month sama sekali
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

    // jka select type dan tidak select year dan month
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

    // jika select type dan year tapi tidak select month
    if (type && year && !month) {
      const sumType = (dataset) => {
        const result = {};
        const found = dataset.find((items) => items.year === Number(year))?.data || {};

        for (let i = 0; i < monthsList.length; i++) {
          const bulan = monthsList[i];
          if (found[bulan]) {
            const total = found[bulan].reduce((acc, item) => acc + Number(item.amount), 0);
            result[bulan] = total;
          } else {
            result[bulan] = 0;
          }
        }

        return result;
      };

      setDataAnalytics(sumType(setDataBalance[type]));
    }

    // jika select type,year dan month
    if (type && year && month) {
      const sumType = (dataset) => {
        const result = {};
        const found = dataset.find((items) => items.year === Number(year))?.data || {};
        const indexMonth = monthsList.indexOf(month);
        const daysMonth = getDatesInMonth(year, indexMonth, 1);

        if (found[month]) {
          for (let i = 0; i < daysMonth.length; i++) {
            const dayFromArray = Number(daysMonth[i]);
            found[month].map((itemsDays) => {
              const [thn, bln, tglData] = itemsDays.date.split("-");
              if (dayFromArray === Number(tglData)) {
                if (result[dayFromArray]) {
                  result[dayFromArray] += itemsDays.amount;
                }
                result[dayFromArray] = itemsDays.amount;
              } else {
                if (!result[i + 1]) result[i + 1] = 0;
              }
            });
          }
        }

        return result;
      };

      setDataAnalytics(sumType(setDataBalance[type]));
    }
  }, [incomeDataset, expenseDataset, type, year, month]);

  return { dataAnalytics };
};

export default useBalanceAll;
