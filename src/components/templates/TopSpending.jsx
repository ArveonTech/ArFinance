import { Flame } from "lucide-react";

const TopSpending = ({ data }) => {
  if (!data || Object.keys(data).length === 0) {
    return (
      <div className="p-4 bg-amber-100 rounded-3xl w-[300px]">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-xl font-semibold">Top Spending</h1>
          <Flame />
        </div>
        <hr className="mb-5" />
        <p className="text-gray-400 italic text-center text-lg">No spending data yet</p>
      </div>
    );
  }

  // Kalau datanya ada
  const [[category, spending]] = Object.entries(data);

  return (
    <div className="p-4 bg-amber-100 rounded-3xl w-[300px]">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-xl font-semibold">Top Spending</h1>
        <Flame />
      </div>
      <hr className="mb-5" />
      <div>
        <span className="text-lg text-amber-800">{category.charAt(0).toUpperCase() + category.slice(1)}:</span>
        <span className="text-green-500 text-lg ml-2">Rp.{spending.toLocaleString("id-ID")}</span>
      </div>
    </div>
  );
};

export default TopSpending;
