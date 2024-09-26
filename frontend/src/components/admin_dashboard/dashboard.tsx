import React from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useNavigate } from "react-router-dom"


export const Dash: React.FC = () => {
  const navigate =  useNavigate();
  const handleClick = (url: string)=>{
    return ()=>navigate(url);
  }
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex justify-between items-center">
        <Button className="gap-2" onClick={handleClick('/recruiter/createpost')}>
          <Plus className="h-4 w-4" />
          Create Job Post
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Bar Chart</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              {/* Render Bar Chart here */}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Pie Chart</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              {/* Render Pie Chart here */}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
