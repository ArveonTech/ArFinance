import { useState } from "react";
import { useTheme } from "../features/ThemeProvider";
import { ToastContainer, toast, Bounce } from "react-toastify";

const SettingPages = () => {
  const [confirmation, setConfirmation] = useState(false);
  const [clearData, setClearData] = useState(false);
  const { theme, setTheme } = useTheme();
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

  const isDark = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  const handleClickToConfirm = () => {
    setConfirmation((prev) => !prev);
  };

  const handleClearData = () => {
    localStorage.removeItem("arFinanceData");
    dataStatusMessage("info", "data clear successfully");
  };

  return (
    <div className="bg-setting w-10/12 mx-auto mt-20 rounded-2xl p-4">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-lg font-semibold">Dark Mode</h1>
        <div onClick={toggleTheme} className={`w-12 h-6 rounded-full px-1 flex items-center cursor-pointer transition-colors duration-300 ${isDark ? "bg-slate-700" : "bg-gray-300"}`}>
          <div className={`w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 bg-white ${isDark ? "translate-x-6" : "translate-x-0"}`}></div>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Clear Data</h1>
        <button className="bg-red-500 w-20 rounded-xl p-2" onClick={() => handleClickToConfirm()}>
          Clear
        </button>
      </div>
      <div className={`${confirmation ? "block" : "hidden"}`}>
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-card p-6 rounded-2xl shadow-xl w-[90%] max-w-md">
            <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">Confirmation</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">Are you sure you want to clear this data? This action cannot be undone.</p>
            <div className="flex justify-end gap-2">
              <button className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600" onClick={() => handleClickToConfirm()}>
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
                onClick={() => {
                  handleClickToConfirm();
                  handleClearData();
                }}
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover={false} theme="light" transition={Bounce} />{" "}
    </div>
  );
};

export default SettingPages;
