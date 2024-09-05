import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";

export const Header: React.FC = () => {
  const [dark, SetDark] = useState<boolean>(true);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  return (
    <div className="border-b mx-5 py-4 flex justify-between">
      <div className="flex">
        <img
          src="https://github.com/shadcn.png"
          alt="User Avatar"
          className="w-10 rounded-full mx-4"
        />
        <strong className="my-auto text-2xl">Smart interview</strong>
      </div>
      <nav className="flex">
            <NavLink to='/' className={(a)=>a.isActive?"my-auto hover:pb-2 hover:transition-all duration-500 mx-2 text-lg text-red-600 dark:text-red-400 font-semibold": "my-auto hover:pb-2 hover:transition-all duration-500 mx-2 text-2xl dark:text-gray-500 mr-5"}>Overview</NavLink>
            <NavLink to='/shipment' className={(a)=>a.isActive?"my-auto mx-4 hover:pb-2 hover:transition-all duration-500  text-red-600 dark:text-red-400 font-semibold":"my-auto mx-2 text-2xl dark:text-gray-500 hover:pb-2 hover:transition-all duration-500 mr-5"}>Panel Status</NavLink>
            <NavLink to='/vehicle' className={(a)=>a.isActive?"my-auto hover:pb-2 hover:transition-all duration-500 mx-2  text-red-600 dark:text-red-400 font-semibold":"my-auto mx-2 text-2xl dark:text-gray-500 hover:pb-2 hover:transition-all duration-500 mr-5"}>Alerts</NavLink>
            <Button>John</Button>

        </nav>
      <div className="mx-5 flex">
        <i onClick={() => SetDark(!dark)} className={dark?"text-2xl bi bi-brightness-low border my-auto p-1 px-2 rounded-lg":"text-2xl rounded-lg bi bi-brightness-low-fill p-1 px-2 my-auto border"}></i>
        <img
          src="https://github.com/shadcn.png"
          alt="User Avatar"
          className="w-10 rounded-full mx-4"
        />
        <p className="my-auto font-bold">John pradeepraj</p>
      </div>
    </div>
  );
};
