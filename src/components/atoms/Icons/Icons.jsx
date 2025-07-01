import { House, Plus, History, ChartLine, Settings } from "lucide-react";
import { useLocation, Link } from "react-router";

const menuIcons = [
  { path: "/", icon: <House />, title: "Home" },
  { path: "/add", icon: <Plus />, title: "Add" },
  { path: "/history", icon: <History />, title: "History" },
  { path: "/analysis", icon: <ChartLine />, title: "Analysis" },
  { path: "/settings", icon: <Settings />, title: "Settings" },
];

const Icons = ({ activeTitle = true, activeIcons = true }) => {
  const location = useLocation();

  return (
    <>
      {menuIcons.map((items, i) => (
        <li key={i}>
          <Link to={items.path}>
            <div className="flex gap-2">
              {activeIcons && <span className={`${location.pathname === items.path && "drop-shadow-md drop-shadow-green-400"}`}>{items.icon}</span>}
              {activeTitle && <span className="font-bold">{items.title}</span>}
            </div>
          </Link>
        </li>
      ))}
    </>
  );
};

export default Icons;
