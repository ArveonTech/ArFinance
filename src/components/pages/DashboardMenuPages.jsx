import { AlignLeft, X, House, AlignRight, Plus, History, ChartLine, Settings, Icon } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Icons from "../atoms/Icons/Icons";

const DashboardMenuPages = () => {
  const [sidebarActive, setSidebarActive] = useState(true);
  const [navActive, setNavActive] = useState(false);

  const menuIcons = [
    { path: "/", icon: <House />, title: "Home" },
    { path: "/add", icon: <Plus />, title: "Add" },
    { path: "/history", icon: <History />, title: "History" },
    { path: "/analysis", icon: <ChartLine />, title: "Analysis" },
    { path: "/settings", icon: <Settings />, title: "Settings" },
  ];

  return (
    <div className="min-h-screen bg-base">
      <div className="block md:hidden h-16 relative">
        <div className={`flex justify-between bg-sidebar items-center h-full px-3 relative z-20 ${navActive ? "border-b-2" : "shadow-lg"}`}>
          <header className="text-2xl cursor-pointer font-semibold hover:border-b-2 ">ArFinance</header>
          <div className="cursor-pointer z-50" onClick={() => setNavActive((prev) => !prev)}>
            {navActive ? <X size={32} /> : <AlignRight size={32} className="cursor-pointer" />}
          </div>
        </div>
        <div className={`absolute w-full transition-all duration-500 ${navActive ? "inset-y-16" : "-inset-y-70"}`}>
          <div className=" bg-sidebar">
            <ul className="flex flex-col items-center py-6 gap-5">
              <Icons />
            </ul>
          </div>
        </div>
      </div>
      <div className="hidden md:block">
        <div className="flex">
          <div className={`min-h-screen bg-sidebar border-r-2 box-content border-green-700 w-20 z-10 transition-border delay-200 ${sidebarActive ? "border-none" : ""}`}>
            <header className="flex justify-center pt-5">{sidebarActive ? "" : <AlignLeft className="cursor-pointer" size={32} strokeWidth={3} onClick={() => setSidebarActive((prev) => !prev)} />}</header>
            <ul className={`flex flex-col items-center gap-8 ${sidebarActive ? "mt-[72px]" : "mt-10"}`}>
              <Icons activeTitle={false} />
            </ul>
          </div>
          <div className={`min-h-screen w-60 bg-sidebar rounded-tr-2xl transition-all duration-300 ${sidebarActive ? "translate-x-0" : "-translate-x-80"}`}>
            <div className="">
              <header className="flex justify-between items-center mt-5 mx-5">
                <h1 className={`text-xl md:text-2xl `}>ArFinance</h1>
                <X strokeWidth={3} className={`cursor-pointer`} onClick={() => setSidebarActive((prev) => !prev)} />
              </header>
              <ul className="flex flex-col py-6 pt-10 gap-8">
                <Icons activeIcons={false} />
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardMenuPages;
