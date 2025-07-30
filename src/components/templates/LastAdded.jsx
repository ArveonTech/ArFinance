import { ClockPlus, MoveUp, MoveDown } from "lucide-react";

const formatted = (timestamp) =>
  new Intl.DateTimeFormat("en-US", {
    weekday: "long", // Sabtu
    day: "2-digit", // 19
    month: "long", // Juli
    year: "numeric", // 2025
    hour: "2-digit", // 14
    minute: "2-digit", // 35
  }).format(timestamp);

const LastAdded = ({ data }) => {
  return (
    <>
      {data.length > 0 && Object.keys(data[0]).length > 0 ? (
        data.map((items) => (
          <div
            key={items}
            className={`grid grid-cols-[auto_1fr] gap-x-2 bg-gradient-to-br w-[300px] p-4 rounded-3xl text-white font-mono text-lg cursor-pointer ${
              items.type === "income" ? "from-green-400 to-green-700/65 hover:bg-green-800" : "from-red-400 to-red-700/65 hover:bg-red-800"
            }`}
          >
            <div className="flex justify-between items-center mb-2 col-span-2">
              <p className="flex items-center gap-2 font-bold text-white">
                <ClockPlus size={20} /> Last Added
              </p>
              <p className="flex items-center gap-2">
                {items.type}
                <span>{items.type === "income" ? <MoveUp size={20} /> : <MoveDown size={20} />}</span>
              </p>
            </div>

            <hr className="col-span-2 mb-5" />

            <div className="contents">
              <div>Description</div>
              <div>: {items.description}</div>

              <div>Amount</div>
              <div>
                : Rp.<span className="font-bold">{Number(items.amount).toLocaleString("id-ID")}</span>
              </div>

              <div>Category</div>
              <div>: {items.category}</div>

              <div>Added</div>
              <div>: {formatted(items.addedAt)}</div>
            </div>
          </div>
        ))
      ) : (
        <div className="bg-card w-[300px] rounded-2xl p-4">
          <div className="flex justify-between items-center mb-2 col-span-2 text-white">
            <p className="flex items-center gap-2 font-bold">Last Added</p>
            <ClockPlus size={20} />
          </div>
          <hr className="mb-5" />
          <p className="text-gray-400 italic text-center mb-2 text-lg">No last added data yet</p>
        </div>
      )}
    </>
  );
};

export default LastAdded;
