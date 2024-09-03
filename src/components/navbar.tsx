import { useScrollTop } from "@/hooks/use-scroll-top";
import { cn } from "@/lib/utils";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";

const Navbar = () => {
  const scrolled = useScrollTop();
  return (  
    <div className={cn(
      "z-50 bg-primary-foreground dark:bg-[#1F1F1F] fixed top-0 flex items-center w-full p-6", scrolled && "border-b shadow-sm dark:shadow-[#0f0f0f]"
    )}>
      <div className="flex justify-between w-full gap-x-2">
        <div className="text-4xl tracking-wider font-bold font-sunflowers">
          RedHawk
        </div>
        <div className="flex gap-x-4">
          <Button variant={"ghost"}>Register</Button>
          <Button>Login</Button>
          <ModeToggle />
        </div>
      </div>
    </div>
  );
}
 
export default Navbar;