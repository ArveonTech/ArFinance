import { ChartPie } from "lucide-react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useMemo } from "react";

ChartJS.register(ArcElement, Tooltip, Legend);

const ExpneseByCate = ({ dataDistriCate }) => {
  const dataPieCate = useMemo(
    () => ({
      labels: ["Shopping", "Transport", "Food", "Others"],
      datasets: [
        {
          label: "expense",
          data: dataDistriCate,
          borderWidth: 2,
        },
      ],
    }),
    [dataDistriCate]
  );

  const optionsPieCate = {
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="w-[350px] sm:w-[450px] mx-auto bg-white p-5 rounded-2xl shadow-2xl md:w-[400px] lg:w-[550px] h-80 md:h-72">
      <div className="flex items-center gap-2 justify-center mb-2">
        <h1 className="text-xl font-semibold">Expense by Category</h1>
        <ChartPie size={20} />
      </div>
      <hr className="border-2 " />
      <div className="flex justify-between items-center h-full ">
        <div>
          <div className="space-y-2">
            {[
              { color: "#A78BFA", label: "Shopping" },
              { color: "#60A5FA", label: "Transport" },
              { color: "#FBBF24", label: "Food" },
              { color: "#9CA3AF", label: "Others" },
            ].map((item) => (
              <div key={item.label} className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-gray-700 font-medium">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="w-[200px] md:w-[180px]">
          <Pie key={JSON.stringify(dataDistriCate)} data={dataPieCate} options={optionsPieCate} />
        </div>
      </div>
    </div>
  );
};

export default ExpneseByCate;
