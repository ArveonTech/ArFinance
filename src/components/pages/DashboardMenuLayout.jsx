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
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex flex-col md:flex-row bg-gradient-to-br from-[#eef9ef] to-[#aaedcc] min-h-screen">
      <div className="sticky top-0 z-20">
        {/* Mobile */}
        <div className="block md:hidden">
          <div className={`h-16`}>
            <div className={`flex justify-between h-full bg-sidebar items-center z-20 transition-all duration-300 relative ${navActive ? "border-b-2" : "shadow-lg"} ${isSticky ? "px-3" : "px-7"}`}>
              <Link to="/">
                <h1 className="text-2xl font-bold hover:border-b-2 cursor-pointer">ArFinance</h1>
              </Link>
              <div onClick={() => setNavActive((prev) => !prev)} className="cursor-pointer z-50">
                {navActive ? <X size={32} /> : <AlignRight size={32} />}
              </div>
            </div>
            <div className={`absolute w-full transition-all duration-500 z-10 ${navActive ? "inset-y-16 pointer-events-auto" : "-inset-y-70 pointer-events-none"}`}>
              <div className="bg-sidebar rounded-b-2xl">
                <ul className="flex flex-col items-center py-6 gap-5">
                  <Icons />
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop */}
        <div className="hidden md:flex sticky top-0 bg-gradient-to-b from-[#92c7a3] to-[#4a8660]">
          <div className={`border-r-2 border-green-700 w-20 transition-border delay-200 ${sidebarActive ? "border-none" : ""}`}>
            <header className="flex justify-center pt-5">{sidebarActive ? "" : <AlignLeft className="cursor-pointer" size={32} strokeWidth={3} onClick={() => setSidebarActive((prev) => !prev)} />}</header>
            <ul className={`flex flex-col items-center gap-8 ${sidebarActive ? "mt-[72px]" : "mt-10"}`}>
              <Icons activeTitle={false} />
            </ul>
          </div>
          <div className={`min-h-screen rounded-tr-2xl transition-all duration-200 ${sidebarActive ? "w-50" : "w-0 overflow-hidden"}`}>
            <header className="flex justify-between items-center mt-5 mx-5">
              <Link to="/">
                <h1 className="text-2xl font-bold md:text-2x cursor-pointerl">ArFinance</h1>
              </Link>
              <X strokeWidth={3} className="cursor-pointer" onClick={() => setSidebarActive((prev) => !prev)} />
            </header>
            <ul className="flex flex-col py-6 pt-10 gap-8">
              <Icons activeIcons={false} />
            </ul>
          </div>
        </div>
      </div>

      {/* === Main Content === */}
      <main className="flex-1">{children}</main>
    </div>
  );
};
export default DashboardMenuLayout;
