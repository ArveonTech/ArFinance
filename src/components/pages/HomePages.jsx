import { useEffect, useState } from "react";

const initialBalance = {
  balance: 0,
  balanceIncome: 999990,
  balanceExpand: 0,
};

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const HomePages = () => {
  const [dateNow, setDateNow] = useState(null);
  const [balance, setBalance] = useState(initialBalance);

  useEffect(() => {
    const month = new Date().getMonth();
    setDateNow(month);
  }, []);

  useEffect(() => {
    const balanceLocal = localStorage.getItem("balance");
    {
      balanceLocal ? setBalance(JSON.parse(balanceLocal)) : localStorage.setItem("balance", JSON.stringify(initialBalance));
    }
  }, []);

  const cardBalance = [
    { title: "Balance", bg: "bg-gradient-to-br from-green-400 via-green-500 to-green-900", balance: balance.balance },
    { title: `${months[dateNow]} Income`, bg: "bg-gradient-to-br from-blue-400 via-blue-500 to-blue-900", balance: balance.balanceIncome },
    { title: `${months[dateNow]} Expand`, bg: "bg-gradient-to-br from-red-400 via-red-500 to-red-900", balance: balance.balanceExpand },
  ];

  return (
    <div className="flex mt-5 justify-around gap-10 px-5 flex-wrap">
      {cardBalance.map((card, i) => (
        <div className={` ${card.bg} w-70 h-40 rounded-2xl pl-5 md:w-90`} key={i}>
          <h1 className="text-2xl my-5">{card.title} </h1>
          <span className="text-3xl font-semibold text-white">Rp.{card.balance.toLocaleString("id-ID")}</span>
        </div>
      ))}
    </div>
  );
};

export default HomePages;
