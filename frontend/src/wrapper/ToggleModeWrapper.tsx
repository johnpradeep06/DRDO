import { ModeToggle } from "@/components/mode-toggle";

const ToggleModeWrapper = ({ children }: {children: React.ReactNode}) => {
  return (  
    <div className="min-h-screen h-full w-full bg-primary-foreground dark:bg-[#1F1F1F]">
      <div className="absolute w-full flex justify-end py-2 pr-2"><ModeToggle /></div>
      <div className="h-full">
        {children}
      </div>
    </div>
  );
}
 
export default ToggleModeWrapper;