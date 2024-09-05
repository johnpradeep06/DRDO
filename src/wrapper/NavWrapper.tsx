import { Navbar } from "@/components/navbar";

const NavWrapper = ({ children }: { children: React.ReactNode }) => {
  return (  
    <div className="h-full dark:bg-[#1F1F1F]">
      <Navbar />
      <main className="h-full bg-primary-foreground dark:bg-[#1F1F1F]">
        {children}
      </main>
    </div>
  );
}
 
export default NavWrapper;