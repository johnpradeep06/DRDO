import RetroGrid from "@/components/ui/retro-grid";
import "../App.css"

const Landing = () => {
  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden rounded-lg border dark:bg-[#1F1F1F] bg-background md:shadow-xl">
       <span className="pointer-events-none z-10 whitespace-pre-wrap bg-gradient-to-b dark:from-[#7077A1] dark:via-[#424769] dark:to-[#2D3250] from-[#E3F4F4] via-[#D2E9E9] to-[#C4DFDF] bg-clip-text text-center text-8xl font-bold leading-none tracking-wide text-transparent font-sunflowers">
         RedHawk
       </span>
  
       <RetroGrid />
    </div>  
    // <main className="min-h-screen w-full flex flex-col">
      
    // </main>
  );
}
 
export default Landing;