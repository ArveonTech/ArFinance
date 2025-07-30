import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRecord, editRecord, deleteRecord } from "../features/financeDataSlice";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { CalendarDays, SquarePen, CirclePoundSterling, RefreshCcw, ListTree, Plus, Save } from "lucide-react";
import { useLocation, useNavigate } from "react-router";
import { statusCreate } from "../features/createStatusSlice";
import AOS from "aos";
import "aos/dist/aos.css";

AOS.init();

const AddPages = () => {
  const setDataBalance = useSelector((state) => state.financeData);
  const location = useLocation();
  const navigate = useNavigate();
  const dataEdit = location.state;
  const dispatch = useDispatch();
  const formRef = useRef();
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

  const checkId = (id) => {
    for (let typeKey in setDataBalance) {
      const yearArray = setDataBalance[typeKey];
      for (const year of yearArray) {
        for (let month in year.data) {
          const item = year.data[month].find((item) => item.id === id);
          if (item) {
            return { found: true, oldType: typeKey };
          }
        }
      }
    }
    return { found: false };
  };

  const [formData, setFormData] = useState({
    date: "",
    description: "",
    amount: "",
    type: "",
    category: "",
  });

  useEffect(() => {
    if (dataEdit) {
      setFormData(dataEdit);
    }
  }, [dataEdit]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const idSame = checkId(formData.id);

    if (idSame.found) {
      if (idSame.oldType === formData.type) {
        dispatch(editRecord({ ...formData, addedAt: Date.now() }));
      } else {
        dispatch(deleteRecord(formData.id));
        dispatch(addRecord({ ...formData, id: crypto.randomUUID() }));
      }
      dataStatusMessage("info", "data updated successfully");
    } else {
      dispatch(addRecord({ ...formData, id: crypto.randomUUID(), addedAt: Date.now() }));
      dataStatusMessage("success", "data added successfully");
    }

    setFormData({
      addedAt: Date.now(),
      date: "",
      description: "",
      amount: "",
      type: "",
      category: "",
    });

    formRef.current.reset();
    dispatch(statusCreate("Add"));
    navigate("/add", { replace: true });
  };

  const handleAddForm = () => {
    setFormData({
      addedAt: Date.now(),
      date: "",
      description: "",
      amount: "",
      type: "",
      category: "",
    });

    formRef.current.reset();
    dispatch(statusCreate("Add"));
    navigate("/add", { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center mx-10">
      <form action="" ref={formRef} onSubmit={(e) => handleSubmit(e)} className="max-w-md w-full" data-aos="fade-up" data-aos-delay="200" data-aos-duration="500" data-aos-once="true">
        <div className="max-w-md w-full bg-form backdrop-blur-xl border border-white/30 shadow-2xl rounded-2xl p-6 md:p-8 space-y-5">
          <div className="relative">
            <h2 className="text-2xl font-bold text-primary text-center">{dataEdit ? "Edit Finance" : "Add Finance"}</h2>
            {dataEdit ? (
              <button className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center gap-1 pr-2 cursor-pointer" onClick={() => handleAddForm()}>
                <Plus size={32} />
              </button>
            ) : (
              ""
            )}
          </div>

          {/* Date */}
          <div>
            <label htmlFor="date" className="block text-sm font-bold  mb-2">
              <div className="flex items-center gap-2">
                <CalendarDays size={20} />
                <span>Date :</span>
              </div>
            </label>
            <input id="date" name="date" type="date" className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500" required value={formData.date} onChange={(e) => handleChange(e)} />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-bold  mb-2">
              <div className="flex items-center gap-2">
                <SquarePen size={20} />
                <span>Description :</span>
              </div>
            </label>
            <input
              id="description"
              name="description"
              type="text"
              placeholder="e.g. Salary, Lunch"
              className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
              value={formData.description}
              onChange={(e) => handleChange(e)}
            />
          </div>

          {/* Amount */}
          <div>
            <label htmlFor="amount" className="block text-sm font-bold  mb-2">
              <div className="flex items-center gap-2">
                <CirclePoundSterling size={20} />
                <span>Amount :</span>
              </div>
            </label>
            <input
              id="amount"
              name="amount"
              type="number"
              placeholder="e.g. 500000"
              className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
              required
              value={formData.amount}
              onKeyDown={(e) => {
                if (["e", "E", "+", "-"].includes(e.key)) {
                  e.preventDefault();
                }
              }}
              onChange={(e) => handleChange(e)}
              onWheel={(e) => e.target.blur()}
            />
          </div>

          {/* Type */}
          <div>
            <label className="block text-sm font-bold  mb-4">
              <div className="flex items-center gap-2">
                <RefreshCcw size={20} />
                <span>Type :</span>
              </div>
            </label>
            <div className="flex space-x-4">
              <label htmlFor="income" className="inline-flex items-center">
                <input id="income" type="radio" name="type" value="income" className="text-green-500" checked={formData.type === "income"} required onChange={(e) => handleChange(e)} />
                <span className="ml-2 text-md ">Income</span>
              </label>
              <label htmlFor="expense" className="inline-flex items-center">
                <input id="expense" type="radio" name="type" value="expense" className="text-red-500" checked={formData.type === "expense"} onChange={(e) => handleChange(e)} />
                <span className="ml-2 text-md ">Expense</span>
              </label>
            </div>
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-sm font-bold  mb-2">
              <div className="flex items-center gap-2">
                <ListTree size={20} />
                <span>Category</span>
              </div>
            </label>
            <select id="category" name="category" value={formData.category} className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 bg-card focus:ring-blue-500 focus:border-blue-500" required onChange={(e) => handleChange(e)}>
              <option value="">Select category</option>
              {formData.type === "income" ? (
                <>
                  <option value="salary">Salary</option>
                  <option value="freelance">Freelance</option>
                  <option value="bonus">Bonus</option>
                </>
              ) : (
                <>
                  <option value="shopping">Shopping</option>
                  <option value="transport">Transport</option>
                  <option value="food">Food</option>
                </>
              )}
              <option value="others">others</option>
            </select>
          </div>

          {/* Submit Button */}
          <button type="submit" className="w-full bg-emerald-500/80 hover:bg-emerald-700/90 backdrop-blur-md  font-semibold py-2 px-4 rounded-lg shadow-md transition cursor-pointer flex justify-center gap-2">
            <Save />
            Save
          </button>
        </div>
      </form>
      <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover={false} theme="light" transition={Bounce} />{" "}
    </div>
  );
};

export default AddPages;
