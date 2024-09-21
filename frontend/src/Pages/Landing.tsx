import RetroGrid from "@/components/ui/retro-grid"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { UserIcon, BriefcaseIcon } from "lucide-react"
import { useNavigate } from "react-router-dom";



const Landing = () => {
  const navigate = useNavigate();
  const handleClick = (url: string)=>{
    return ()=>navigate(url);
  }
  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden rounded-lg border dark:bg-[#1F1F1F] bg-background md:shadow-xl">
      <RetroGrid />
      
      <div className="z-10 flex flex-col items-center space-y-6">
        <h1 className="text-4xl font-bold text-center mb-8">Choose Your Role</h1>
        
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <Card 
            className="w-64 hover:shadow-lg transition-shadow duration-300 cursor-pointer transform hover:scale-105 active:scale-95"
            onClick={handleClick("/auth/recruiter")}
            tabIndex={0}
            role="button"
            aria-label="Select Recruiter role"
          >
            <CardHeader className="text-center">
              <CardTitle >Recruiter</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center">
              <BriefcaseIcon className="h-24 w-24 text-primary" />
            </CardContent>
          </Card>

          <Card 
            className="w-64 hover:shadow-lg transition-shadow duration-300 cursor-pointer transform hover:scale-105 active:scale-95"
            onClick={() => console.log('Candidate selected')}
            tabIndex={0}
            role="button"
            aria-label="Select Candidate role"
          >
            <CardHeader className="text-center">
              <CardTitle>Candidate</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center">
              <UserIcon className="h-24 w-24 text-primary" />
            </CardContent>
          </Card>
        </div>

        <Button size="lg" className="mt-8" onClick={handleClick("/auth/register")}>
          Register
        </Button>
      </div>
    </div>
  )
}

export default Landing