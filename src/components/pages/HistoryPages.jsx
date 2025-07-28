import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { MoveUp, MoveDown, LayoutGrid, History, Trash, SquarePen } from "lucide-react";
import { useNavigate } from "react-router";
import { deleteRecord } from "../features/financeDataSlice";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { statusCreate } from "../features/createStatusSlice";
import AOS from "aos";
import "aos/dist/aos.css";

AOS.init();

const HistoryPages = () => {
  const navigate = useNavigate();
  const setDataBalance = useSelector((state) => state.financeData);
  const dispatch = useDispatch();
  const [dataHistory, setDataHistory] = useState([]);
  const [filterMap, seFilterMap] = useState("");
  const dataStatusMessage = (status, m) => {
    toast[status](m, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });
  };

  const dataSetIncomeExpense = useMemo(() => {
    return Object.values(setDataBalance);
  }, [setDataBalance]);

  useEffect(() => {
    const dataIncomeAndExpense = [];
    dataSetIncomeExpense.map((itemsYear) => {
      for (let year in itemsYear) {
        for (let month in itemsYear[year].data) {
          itemsYear[year].data[month].map((items) => {
            dataIncomeAndExpense.push(items);
          });
        }
      }
    });
    return setDataHistory(dataIncomeAndExpense);
  }, [dataSetIncomeExpense]);

  const handleEdit = (items) => {
    dispatch(statusCreate("Edit"));
    navigate("/add", { state: items });
  };

  const handleDelete = (item) => {
    dispatch(deleteRecord(item.id));
    dataStatusMessage("error", "data deleted successfully");
  };

  const buttonFilter = [
    { title: "All", bg: "bg-blue-400", value: "", icons: <LayoutGrid size={20} /> },
    { title: "Income", bg: "bg-green-400", value: "income", icons: <MoveUp size={20} /> },
    { title: "Expense", bg: "bg-red-400", value: "expense", icons: <MoveDown size={20} /> },
  ];

  return (
    <div>
      <div className="flex items-center justify-center mt-10 gap-2">
        <History size={30} />
        <h1 className="text-3xl font-bold">Activity Log</h1>
      </div>
      <div className="flex mt-10 gap-10 justify-center">
        {buttonFilter.map((itemsButton) => (
          <button key={itemsButton.title} className={`w-max rounded-2xl p-2 text-lg cursor-pointer border-1 ${filterMap === itemsButton.value ? itemsButton.bg : ""}`} onClick={() => seFilterMap(itemsButton.value)}>
            <div className="flex gap-2 items-center">
              {itemsButton.icons}
              {itemsButton.title}
            </div>
          </button>
        ))}
      </div>
      <div className="flex justify-center mt-10 gap-10 px-10 flex-wrap my-10 relative overflow-hidden">
        {dataHistory && dataHistory.length > 0 ? (
          dataHistory
            .filter((items) => !filterMap || items.type.toLowerCase() === filterMap.toLowerCase())
            .map((items, i) => (
              <div
                className={`bg-gradient-to-br w-96 p-4 rounded-2xl text-white font-mono text-lg  ${items.type === "income" ? "from-green-400 to-green-700/65 hover:bg-green-800" : "from-red-400 to-red-700/65 hover:bg-red-800"}`}
                key={i}
                data-aos="fade-up"
                data-aos-delay={i * 100}
                data-aos-once="true"
              >
                <div className="flex justify-between mb-2">
                  <div className="flex gap-3 items-center">
                    <Trash strokeWidth={3} className="cursor-pointer" onClick={() => handleDelete(items)} />
                    <SquarePen strokeWidth={3} className="cursor-pointer" onClick={() => handleEdit(items)} />
                  </div>
                  <p className="flex items-center gap-2">
                    <span>{items.type === "income" ? <MoveUp size={20} /> : <MoveDown size={20} />}</span>
                    {items.type}
                  </p>
                </div>
                <hr />
                <div className="mt-4 grid grid-cols-[auto_1fr]">
                  <p>Date </p>
                  <p>: {items.date}</p>

                  <p>Description</p>
                  <p> : {items.description}</p>

                  <p>Amount</p>
                  <span className="font-bold">: Rp. {Number(items.amount).toLocaleString("id-ID")}</span>

                  <p>Category </p>
                  <p>: {items.category}</p>
                </div>
              </div>
            ))
        ) : (
          <div>
            <h1 className="text-red-600 text-2xl mt-10">No history data yet</h1>
          </div>
        )}
      </div>
      <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover={false} theme="light" transition={Bounce} />
    </div>
  );
};

export default HistoryPages;
