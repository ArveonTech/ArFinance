import { useEffect, useState } from "react";

const useTotalTransactions = (incomeDataset, expenseDataset) => {
  const [totalTransactions, setTotalTransactions] = useState({
    Income: 0,
    Expense: 0,
  });

  useEffect(() => {
    if (incomeDataset.length > 0 || expenseDataset.length > 0) {
      const transactions = {
        Income: 0,
        Expense: 0,
      };

      incomeDataset.forEach((yearData) => {
        for (let month in yearData.data) {
          transactions.Income += yearData.data[month].length;
        }
      });

      expenseDataset.forEach((yearData) => {
        for (let month in yearData.data) {
          transactions.Expense += yearData.data[month].length;
        }
      });

      setTotalTransactions(transactions);
    }
  }, [incomeDataset, expenseDataset]);

  return { totalTransactions };
};

export default useTotalTransactions;

// jadi gini :
// 1.dia akan loop si semua data tahun,di setiap data tahun kan ada bulan,nah kita reduce juga si bulan dengn reduce(baris 65),
// 2.setelah dapat semua data perbulan itu(jadinya kan 1 tahun ya),maka akan di jumlahkan ke total,
// 3.baru lanjut ke tahun berikutnya

// dataset (2025, 2026, ...)
// → per tahun (yearData)
//   → per bulan (January, ...)
//     → per transaksi (amount)
//       → jumlahkan
