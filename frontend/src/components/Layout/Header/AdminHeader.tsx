import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { ModeToggle } from "@/components/mode-toggle";
import { Separator } from "@/components/ui/separator";


export const A_Header: React.FC = () => {
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
        <strong className="my-auto text-2xl">Admin Panel</strong>
      </div>
      <nav className="flex">
            <NavLink to='/Overview' className={(a)=>a.isActive?"my-auto hover:pb-2 hover:transition-all duration-500 mx-2  hover:text-red-600 dark:text-red-400 font-semibold":"my-auto hover:pb-2 hover:transition-all duration-500 mx-2 dark:text-gray-500 "}>Overview</NavLink>
            <Separator orientation="vertical" />
            <NavLink to='/Status' className={(a)=>a.isActive?"my-auto hover:pb-2 hover:transition-all duration-500 mx-2  text-red-600 dark:text-red-400 font-semibold":"my-auto hover:pb-2 hover:transition-all duration-500 mx-2 dark:text-gray-500 "}>Panel Status</NavLink>
            <Separator orientation="vertical" />
            <NavLink to='/Alerts' className={(a)=>a.isActive?"my-auto hover:pb-2 hover:transition-all duration-500 mx-2  text-red-600 dark:text-red-400 font-semibold":"my-auto hover:pb-2 hover:transition-all duration-500 mx-2 dark:text-gray-500 "}>Alerts</NavLink>
            

        </nav>
      <div className="mx-5 flex">
        <ModeToggle />
        <img
          src="https://github.com/shadcn.png"
          alt="User Avatar"
          className="w-10 rounded-full mx-2"
        />
        <p className="my-auto font-bold">John pradeepraj</p>
      </div>
    </div>
  );
};
