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
  const [formData, setFormData] = useState({
    degree: '',
    institution: '',
    graduationYear: '',
    major: '',
    jobTitle: '',
    company: '',
    experience: '',
    skills: '',
    researchTitle: '',
    researchField: '',
    researchSummary: '',
    fields: [],
    interviewMode: '',
    linkedin: '',
  });

  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  
  const handleCheckboxChange = (field: string) => {
    if (selectedFields.includes(field)) {
      setSelectedFields(selectedFields.filter(item => item !== field));
    } else {
      setSelectedFields([...selectedFields, field]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Prepare the data to send to the API
    const dataToSend = {
      ...formData,
      date: date ? format(date, 'yyyy-MM-dd') : null,
      fields: selectedFields
    };

    try {
      const response = await fetch('http://localhost:5353/register-details', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
      });

      if (response.ok) {
        // Handle successful form submission
        console.log('Form submitted successfully');
      } else {
        // Handle errors from the API
        console.error('Form submission failed');
      }
    } catch (error) {
      console.error('Error during form submission:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl mx-auto p-6 bg-background text-foreground">
      {/* Academic Background Section */}
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Academic Background</h2>
        <div className="space-y-2">
          <Label htmlFor="degree">Highest Degree</Label>
          <Select onValueChange={(value) => setFormData({ ...formData, degree: value })}>
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
          <Input
            id="institution"
            placeholder="Enter institution name"
            className="bg-muted text-foreground"
            onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="graduation-year">Year of Graduation</Label>
          <Input
            id="graduation-year"
            type="number"
            placeholder="Enter graduation year"
            className="bg-muted text-foreground"
            onChange={(e) => setFormData({ ...formData, graduationYear: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="major">Major/Specialization</Label>
          <Input
            id="major"
            placeholder="e.g., Electrical Engineering"
            className="bg-muted text-foreground"
            onChange={(e) => setFormData({ ...formData, major: e.target.value })}
          />
        </div>
      </div>

      {/* Professional Experience Section */}
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Professional Experience</h2>
        {/* Other Input fields */}
      </div>

      {/* Area of Expertise Section */}
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Area of Expertise</h2>
        <div className="space-y-2">
          <Label>Select Multiple Fields</Label>
          <div className="grid grid-cols-2 gap-2">
            {['AI', 'Machine Learning', 'Aerospace', 'Robotics', 'Cybersecurity', 'Data Science'].map((field) => (
              <div className="flex items-center space-x-2" key={field}>
                <Checkbox id={field.toLowerCase()} onCheckedChange={() => handleCheckboxChange(field)} />
                <label htmlFor={field.toLowerCase()} className="text-foreground">{field}</label>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Interview Preferences Section */}
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Interview Preferences</h2>
        <div className="space-y-2">
          <Label htmlFor="interview-mode">Preferred Interview Mode</Label>
          <Select onValueChange={(value) => setFormData({ ...formData, interviewMode: value })}>
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

      {/* Submit Button */}
      <Button type="submit" className="w-full bg-primary text-primary-foreground">Submit Application</Button>
    </form>
  );
}
