import { AlignLeft, X, AlignRight } from "lucide-react";
import { useState, useEffect } from "react";
import Icons from "../atoms/Icons/Icons";
import { Link } from "react-router";

const DashboardMenuLayout = ({ children }) => {
  const [sidebarActive, setSidebarActive] = useState(true);
  const [navActive, setNavActive] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-base">
      <div className="block md:hidden">
      <div className={` h-16 ${isSticky ? "sticky top-0" : "relative "}`}>
          <div className={`flex justify-between h-full bg-sidebar items-center relative z-20 transition-all duration-300  ${navActive ? "border-b-2" : "shadow-lg"} ${isSticky ? "px-2" : "px-5"} `}>
            <Link to="/">
              <header className="text-2xl cursor-pointer font-semibold hover:border-b-2 ">ArFinance</header>
            </Link>
            <div className="cursor-pointer z-50 " onClick={() => setNavActive((prev) => !prev)}>
              {navActive ? <X size={32} /> : <AlignRight size={32} className="cursor-pointer" />}
            </div>
          </div>
          <div className={`absolute w-full transition-all duration-500 ${navActive ? "inset-y-16" : "-inset-y-70"}`}>
            <div className=" bg-sidebar rounded-b-2xl">
              <ul className="flex flex-col items-center py-6 gap-5">
                <Icons />
              </ul>
            </div>
          </div>
        </div>
        <main className="mt-2">{children}</main>
      </div>
      <div className="hidden md:block">
        <div className="flex">
          <div className={`min-h-screen bg-sidebar border-r-2 box-content border-green-700 w-20 z-10 transition-border delay-200 ${sidebarActive ? "border-none" : ""}`}>
            <header className="flex justify-center pt-5">{sidebarActive ? "" : <AlignLeft className="cursor-pointer" size={32} strokeWidth={3} onClick={() => setSidebarActive((prev) => !prev)} />}</header>
            <ul className={`flex flex-col items-center gap-8 ${sidebarActive ? "mt-[72px]" : "mt-10"}`}>
              <Icons activeTitle={false} />
            </ul>
          </div>
          <div className={`min-h-screen bg-sidebar rounded-tr-2xl transition-all duration-200 ${sidebarActive ? "w-50" : "w-0 overflow-hidden"}`}>
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
          <div className="flex-1 ml-2">{children}</div>{" "}
        </div>
      </div>
    </div>
  );
};

export default DashboardMenuLayout;
