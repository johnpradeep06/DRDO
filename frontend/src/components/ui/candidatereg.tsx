import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';

export function CandidateReg() {
  const [date, setDate] = useState<Date | undefined>();
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
    fields: [] as string[],
    interviewMode: '',
    linkedin: '',
    userId: '', // Ensure userId is part of the form data
  });

  const handleCheckboxChange = (field: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      fields: prevFormData.fields.includes(field)
        ? prevFormData.fields.filter((item) => item !== field)
        : [...prevFormData.fields, field],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const dataToSend = {
      ...formData,
      availabilityDate: date ? format(date, 'yyyy-MM-dd') : null,
    };

    try {
      const response = await fetch('http://localhost:5353/register-details', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        console.log('Form submitted successfully');
      } else {
        const errorData = await response.json();
        console.error('Form submission failed:', errorData);
        alert(`Error: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error during form submission:', error);
      alert('Error during form submission.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl mx-auto p-6 bg-background text-foreground">
      {/* Academic Background Section */}
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Academic Background</h2>
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

        <Label htmlFor="institution">Institution Name</Label>
        <Input
          id="institution"
          placeholder="Enter institution name"
          className="bg-muted text-foreground"
          onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
        />

        <Label htmlFor="graduation-year">Year of Graduation</Label>
        <Input
          id="graduation-year"
          type="number"
          placeholder="Enter graduation year"
          className="bg-muted text-foreground"
          onChange={(e) => setFormData({ ...formData, graduationYear: e.target.value })}
        />

        <Label htmlFor="major">Major/Specialization</Label>
        <Input
          id="major"
          placeholder="e.g., Electrical Engineering"
          className="bg-muted text-foreground"
          onChange={(e) => setFormData({ ...formData, major: e.target.value })}
        />
      </div>

      {/* Professional Experience Section */}
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Professional Experience</h2>
        <Label htmlFor="jobTitle">Job Title</Label>
        <Input
          id="jobTitle"
          placeholder="e.g., Software Engineer"
          className="bg-muted text-foreground"
          onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
        />

        <Label htmlFor="company">Company Name</Label>
        <Input
          id="company"
          placeholder="e.g., TechCorp"
          className="bg-muted text-foreground"
          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
        />

        <Label htmlFor="experience">Years of Experience</Label>
        <Input
          id="experience"
          type="number"
          placeholder="e.g., 5"
          className="bg-muted text-foreground"
          onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
        />
      </div>

      {/* Area of Expertise Section */}
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Area of Expertise</h2>
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

      {/* Interview Preferences Section */}
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Interview Preferences</h2>
        <Label htmlFor="interviewMode">Interview Mode</Label>
        <Select onValueChange={(value) => setFormData({ ...formData, interviewMode: value })}>
          <SelectTrigger id="interviewMode" className="bg-muted text-foreground">
            <SelectValue placeholder="Select mode" />
          </SelectTrigger>
          <SelectContent className="bg-popover text-foreground">
            <SelectItem value="online">Online</SelectItem>
            <SelectItem value="offline">Offline</SelectItem>
          </SelectContent>
        </Select>

        <Label htmlFor="availability-date">Availability Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className={`w-full justify-start text-left font-normal ${!date ? 'text-muted' : ''}`}>
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, 'PPP') : 'Pick a date'}
            </Button>
          </PopoverTrigger>
          <PopoverContent align="start" className="w-auto p-0">
            <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
          </PopoverContent>
        </Popover>
      </div>

      <Button type="submit">Submit</Button>
    </form>
  );
}
export default CandidateReg;