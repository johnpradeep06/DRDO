import { useScrollTop } from "@/hooks/use-scroll-top";
import { cn } from "@/lib/utils";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const scrolled = useScrollTop();
  const navigate = useNavigate();
  const handleClick = (url: string)=>{
    return ()=>navigate(url);
  }
  return (  
    <div className={cn(
      "z-50 bg-primary-foreground dark:bg-[#1F1F1F] fixed top-0 flex items-center w-full p-6", scrolled && "border-b shadow-sm dark:shadow-[#0f0f0f]"
    )}>
      <div className="flex justify-between w-full gap-x-2">
        <div className="text-4xl tracking-wider font-bold font-sunflowers">
          RedHawk
        </div>
        <div className="flex gap-x-4">
          <Button 
            variant={"ghost"} 
            className="text-sm" 
            onClick={handleClick("/auth/register")}
          >
            Register
          </Button>
          <Button 
            className="text-sm" 
            onClick={handleClick("/auth/login")}
          >
            Login
          </Button>
          <ModeToggle />
        </div>
      </div>
    </div>
  );
}

export const HomeBar = ()=>{
  const navigate = useNavigate();
  const handleClick = (url: string)=>{
    return ()=>navigate(url);
  }
  return (
      <div className="relative w-full flex items-center justify-center px-5 py-2 border-b shadow-sm">
      <div className="text-4xl mt-2 tracking-wider font-bold font-sunflowers cursor-pointer"
        onClick={handleClick("/")}
        >
          RedHawk
      </div>
      <div className="absolute right-2">
        <ModeToggle />
      </div>
    </div>
  )
}
