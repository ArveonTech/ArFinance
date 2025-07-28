import { useEffect, useState } from "react";

const useMostExpensiveDay = (expenseDataset) => {
  // ambil expense hari ini
  const [mostExpensiveDay, setMostExpensiveDay] = useState({});

  // ambil balance data bulan sekarang
  useEffect(() => {
    if (!expenseDataset.length) return;

    const mostExpensiveYear = expenseDataset.map((year) => {
      // Gabungkan semua transaksi dari semua bulan
      const allItems = Object.values(year.data).flat();

      // Cari yang paling besar
      const most = allItems.reduce((items, curItems) => {
        return !items || Number(items.amount) < Number(curItems.amount) ? curItems : items;
      }, null);

      return most;
    });

    const mostExpensiveAll = mostExpensiveYear.reduce((item, curItem) => {
      return !item || Number(item.amount) < Number(curItem.amount) ? curItem : item;
    }, null);

    setMostExpensiveDay(mostExpensiveAll);
  }, [expenseDataset]);

  return { mostExpensiveDay };
};

export default useMostExpensiveDay;
