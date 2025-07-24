// const UseAmountBalance = (incomeDataset, expenseDataset) => {
//   const [totalBalance, setTotalBalance] = useState(0);

//   // ambil amount balance
//   useEffect(() => {
//     // hitung amount dari income
//     if (incomeDataset.length > 0 || expenseDataset.length > 0) {
//       // memisahkan semua data perbulan dan menyatukan ke array
//       const joinDataBalanceIncome = [];
//       const joinDataBalanceExpense = [];

//       incomeDataset.map((itemsData) => {
//         for (let key in itemsData.data) {
//           joinDataBalanceIncome.push(itemsData.data[key]);
//         }
//       });

//       expenseDataset.map((itemsData) => {
//         for (let key in itemsData.data) {
//           joinDataBalanceExpense.push(itemsData.data[key]);
//         }
//       });

//       const resultIncomeAndExpense = [joinDataBalanceIncome, joinDataBalanceExpense].map((itemsYear) => {
//         return itemsYear.map((itemsMonth) => {
//           return itemsMonth.map((items) => Number(items.amount));
//         });
//       });

//       const [arrayIncomeAmountDataset, arrayExpenseAmountDataSet] = resultIncomeAndExpense;

//       const amountIncomeArray = arrayIncomeAmountDataset.map((items) => {
//         return items.reduce((acc, cur) => acc + cur, 0);
//       });

//       const amountExpenseArray = arrayExpenseAmountDataSet.map((items) => {
//         return items.reduce((acc, cur) => acc + cur, 0);
//       });

//       const totalIncome = amountIncomeArray.reduce((acc, cur) => (acc += cur), 0);
//       const totalExpense = amountExpenseArray.reduce((acc, cur) => (acc += cur), 0);

//       const balance = totalIncome - totalExpense;

//       setTotalBalance(balance);
//     }
//   }, [incomeDataset, expenseDataset]);

//   return totalBalance;
// };

// export default UseAmountBalance;
// versi pumula

import { useEffect, useState } from "react";

const UseAmountBalance = (incomeDataset, expenseDataset) => {
  const [totalBalance, setTotalBalance] = useState(0);

  useEffect(() => {
    if (incomeDataset.length > 0 || expenseDataset.length > 0) {
      const sumAmount = (dataset) => {
        return dataset.reduce((total, yearData) => {
          for (let month in yearData.data) {
            total += yearData.data[month].reduce((acc, item) => acc + Number(item.amount), 0);
          }
          return total;
        }, 0);
      };

      const totalIncome = sumAmount(incomeDataset);
      const totalExpense = sumAmount(expenseDataset);
      setTotalBalance(totalIncome - totalExpense);
    }
  }, [incomeDataset, expenseDataset]);

  return totalBalance;
};

export default UseAmountBalance;

// jadi gini :
// 1.dia akan loop si semua data tahun,di setiap data tahun kan ada bulan,nah kita reduce juga si bulan dengn reduce(baris 65),
// 2.setelah dapat semua data perbulan itu(jadinya kan 1 tahun ya),maka akan di jumlahkan ke total,
// 3.baru lanjut ke tahun berikutnya

// dataset (2025, 2026, ...)
// → per tahun (yearData)
//   → per bulan (January, ...)
//     → per transaksi (amount)
//       → jumlahkan
