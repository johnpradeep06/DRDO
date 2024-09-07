import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { BookOpen, Award, Microscope, Mail } from "lucide-react"

export default function Component() {
  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="w-20 h-20">
          <AvatarImage alt="Scientist's profile picture" src="/placeholder.svg?height=80&width=80" />
          <AvatarFallback>DR</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <CardTitle className="text-2xl">Dr. Rachel Novak</CardTitle>
          <CardDescription>Quantum Physics Researcher</CardDescription>
          <div className="flex mt-2 gap-2">
            <Badge variant="secondary">Quantum Mechanics</Badge>
            <Badge variant="secondary">Particle Physics</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-semibold flex items-center gap-2 mb-2">
            <BookOpen className="w-4 h-4" /> Education
          </h3>
          <p>Ph.D. in Physics, California Institute of Technology</p>
          <p>M.Sc. in Quantum Computing, MIT</p>
        </div>
        <Separator />
        <div>
          <h3 className="font-semibold flex items-center gap-2 mb-2">
            <Award className="w-4 h-4" /> Notable Achievements
          </h3>
          <ul className="list-disc list-inside space-y-1">
            <li>Nobel Prize in Physics (2030)</li>
            <li>Breakthrough Prize in Fundamental Physics (2028)</li>
            <li>Published over 100 peer-reviewed articles</li>
          </ul>
        </div>
        <Separator />
        <div>
          <h3 className="font-semibold flex items-center gap-2 mb-2">
            <Microscope className="w-4 h-4" /> Current Research
          </h3>
          <p>Exploring quantum entanglement in multi-particle systems and its applications in quantum computing.</p>
        </div>
        <div>
          <h4 className="font-medium mb-2">Research Progress</h4>
          <Progress value={75} className="w-full" />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">View Publications</Button>
        <Button>
          <Mail className="mr-2 h-4 w-4" /> Contact
        </Button>
      </CardFooter>
    </Card>
  )
}