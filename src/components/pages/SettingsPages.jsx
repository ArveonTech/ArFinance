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
        <button className="bg-red-500 w-20 rounded-xl p-2 text-lg" onClick={() => handleClickToConfirm()}>
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
      <hr className="border-border mt-5 border-2" />
      <div className="mt-7">
        <h1 className="text-center text-2xl mb-5 font-semibold">Contact Me </h1>
        <div className="flex justify-center items-center gap-5">
          <a href="https://github.com/ArveonTech" target="_blank">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-9 h-9">
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
              <path d="M9 18c-4.51 2-5-2-7-2" />
            </svg>
          </a>
          <a href="https://www.instagram.com/4hdarizq1/" target="_blank">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-9 h-9">
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
            </svg>
          </a>
          <a href="https://www.linkedin.com/in/ahdarizqi/" target="_blank">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-9 h-9">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect width="4" height="12" x="2" y="9" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </a>
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover={false} theme="light" transition={Bounce} />{" "}
    </div>
  );
};

export default SettingPages;
