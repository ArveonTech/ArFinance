import { useEffect, useState } from "react";

const useDistriCate = (expenseDataset) => {
  const [categorySpend, setCategorySpend] = useState([0, 0, 0, 0]);

  useEffect(() => {
    if (!expenseDataset.length) return;

    const categoryList = ["shopping", "transport", "food", "others"];
    const temp = {
      shopping: 0,
      transport: 0,
      food: 0,
      others: 0,
    };

    expenseDataset.forEach((year) => {
      for (let month in year.data) {
        year.data[month].forEach((item) => {
          const { category, amount } = item;
          if (temp.hasOwnProperty(category)) {
            temp[category] += Number(amount);
          }
        });
      }
    });

    const result = categoryList.map((cate) => temp[cate]);
    setCategorySpend(result);
  }, [expenseDataset]);

  return categorySpend;
};

export default useDistriCate;
