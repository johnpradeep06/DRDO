import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'

export function Reg_details() {
    const [date, setDate] = useState<Date>()
  
    return (
      <form className="space-y-8 max-w-2xl mx-auto p-6 bg-background text-foreground">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Academic Background</h2>
          <div className="space-y-2">
            <Label htmlFor="degree">Highest Degree</Label>
            <Select>
              <SelectTrigger id="degree" className="bg-muted text-foreground">
                <SelectValue placeholder="Select degree" />
              </SelectTrigger>
              <SelectContent className="bg-popover text-foreground">
                <SelectItem value="bachelors">Bachelor's</SelectItem>
                <SelectItem value="masters">Master's</SelectItem>
                <SelectItem value="phd">Ph.D.</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="institution">Institution Name</Label>
            <Input id="institution" placeholder="Enter institution name" className="bg-muted text-foreground" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="graduation-year">Year of Graduation</Label>
            <Input id="graduation-year" type="number" placeholder="Enter graduation year" className="bg-muted text-foreground" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="major">Major/Specialization</Label>
            <Input id="major" placeholder="e.g., Electrical Engineering" className="bg-muted text-foreground" />
          </div>
        </div>
  
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Professional Experience</h2>
          <div className="space-y-2">
            <Label htmlFor="job-title">Job Title (Optional)</Label>
            <Input id="job-title" placeholder="Enter job title" className="bg-muted text-foreground" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="company">Company Name (Optional)</Label>
            <Input id="company" placeholder="Enter company name" className="bg-muted text-foreground" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="experience">Years of Experience</Label>
            <Input id="experience" type="number" placeholder="Enter years of experience" className="bg-muted text-foreground" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="skills">Key Skills/Technologies</Label>
            <Input id="skills" placeholder="Enter skills (comma-separated)" className="bg-muted text-foreground" />
          </div>
        </div>
  
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Research/Publications (Optional)</h2>
          <div className="space-y-2">
            <Label htmlFor="research-title">Title of Research Work</Label>
            <Input id="research-title" placeholder="Enter research title" className="bg-muted text-foreground" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="research-field">Research Field</Label>
            <Input id="research-field" placeholder="e.g., AI, Robotics, Cybersecurity" className="bg-muted text-foreground" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="research-summary">Summary</Label>
            <Textarea id="research-summary" placeholder="Enter research summary" className="bg-muted text-foreground" />
          </div>
        </div>
  
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Area of Expertise</h2>
          <div className="space-y-2">
            <Label>Select Multiple Fields</Label>
            <div className="grid grid-cols-2 gap-2">
              {['AI', 'Machine Learning', 'Aerospace', 'Robotics', 'Cybersecurity', 'Data Science'].map((field) => (
                <div className="flex items-center space-x-2" key={field}>
                  <Checkbox id={field.toLowerCase()} />
                  <label htmlFor={field.toLowerCase()} className="text-foreground">{field}</label>
                </div>
              ))}
            </div>
          </div>
        </div>
  
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Interview Preferences</h2>
          <div className="space-y-2">
            <Label htmlFor="interview-mode">Preferred Interview Mode</Label>
            <Select>
              <SelectTrigger id="interview-mode" className="bg-muted text-foreground">
                <SelectValue placeholder="Select interview mode" />
              </SelectTrigger>
              <SelectContent className="bg-popover text-foreground">
                <SelectItem value="in-person">In-person</SelectItem>
                <SelectItem value="virtual">Virtual</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Availability Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className={`w-full justify-start text-left font-normal bg-muted text-foreground ${!date && 'text-muted-foreground'}`}>
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, 'PPP') : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
              </PopoverContent>
            </Popover>
          </div>
        </div>
  
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">LinkedIn Profile (Optional)</h2>
          <div className="space-y-2">
            <Label htmlFor="linkedin">LinkedIn URL</Label>
            <Input id="linkedin" type="url" placeholder="Enter LinkedIn profile URL" className="bg-muted text-foreground" />
          </div>
        </div>
  
        <Button type="submit" className="w-full bg-primary text-primary-foreground">Submit Application</Button>
      </form>
    )
  }
  