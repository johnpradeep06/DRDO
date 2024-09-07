import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';

export function Reg_details() {
    const [date, setDate] = useState<Date | undefined>(undefined);
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
        expertise: [] as string[],
        interviewMode: '',
        availabilityDate: '',
        linkedin: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { id, value, type, checked } = e.target;

        if (type === 'checkbox') {
            setFormData(prev => ({
                ...prev,
                expertise: checked
                    ? [...prev.expertise, id]
                    : prev.expertise.filter(field => field !== id)
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [id]: value
            }));
        }
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            expertise: checked
                ? [...prev.expertise, id]
                : prev.expertise.filter(field => field !== id)
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = {
            ...formData,
            availabilityDate: date ? format(date, 'yyyy-MM-dd') : ''
        };

        try {
            const response = await fetch('/register-details', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const result = await response.json();

            if (response.ok) {
                alert('Form submitted successfully');
            } else {
                alert(`Error: ${result.error || 'Something went wrong'}`);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Failed to submit form');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl mx-auto p-6 bg-background text-foreground">
            <div className="space-y-2">
                <h2 className="text-2xl font-bold">Academic Background</h2>
                <div className="space-y-2">
                    <Label htmlFor="degree">Highest Degree</Label>
                    <Select id="degree" value={formData.degree} onValueChange={(value) => setFormData(prev => ({ ...prev, degree: value }))}>
                        <SelectTrigger className="bg-muted text-foreground">
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
                    <Input id="institution" value={formData.institution} onChange={handleChange} placeholder="Enter institution name" className="bg-muted text-foreground" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="graduationYear">Year of Graduation</Label>
                    <Input id="graduationYear" type="number" value={formData.graduationYear} onChange={handleChange} placeholder="Enter graduation year" className="bg-muted text-foreground" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="major">Major/Specialization</Label>
                    <Input id="major" value={formData.major} onChange={handleChange} placeholder="e.g., Electrical Engineering" className="bg-muted text-foreground" />
                </div>
            </div>

            <div className="space-y-2">
                <h2 className="text-2xl font-bold">Professional Experience</h2>
                <div className="space-y-2">
                    <Label htmlFor="jobTitle">Job Title (Optional)</Label>
                    <Input id="jobTitle" value={formData.jobTitle} onChange={handleChange} placeholder="Enter job title" className="bg-muted text-foreground" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="company">Company Name (Optional)</Label>
                    <Input id="company" value={formData.company} onChange={handleChange} placeholder="Enter company name" className="bg-muted text-foreground" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="experience">Years of Experience</Label>
                    <Input id="experience" type="number" value={formData.experience} onChange={handleChange} placeholder="Enter years of experience" className="bg-muted text-foreground" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="skills">Key Skills/Technologies</Label>
                    <Input id="skills" value={formData.skills} onChange={handleChange} placeholder="Enter skills (comma-separated)" className="bg-muted text-foreground" />
                </div>
            </div>

            <div className="space-y-2">
                <h2 className="text-2xl font-bold">Research/Publications (Optional)</h2>
                <div className="space-y-2">
                    <Label htmlFor="researchTitle">Title of Research Work</Label>
                    <Input id="researchTitle" value={formData.researchTitle} onChange={handleChange} placeholder="Enter research title" className="bg-muted text-foreground" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="researchField">Research Field</Label>
                    <Input id="researchField" value={formData.researchField} onChange={handleChange} placeholder="e.g., AI, Robotics, Cybersecurity" className="bg-muted text-foreground" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="researchSummary">Summary</Label>
                    <Textarea id="researchSummary" value={formData.researchSummary} onChange={handleChange} placeholder="Enter research summary" className="bg-muted text-foreground" />
                </div>
            </div>

            <div className="space-y-2">
                <h2 className="text-2xl font-bold">Area of Expertise</h2>
                <div className="space-y-2">
                    <Label>Select Multiple Fields</Label>
                    <div className="grid grid-cols-2 gap-2">
                        {['AI', 'Machine Learning', 'Aerospace', 'Robotics', 'Cybersecurity', 'Data Science'].map((field) => (
                            <div className="flex items-center space-x-2" key={field}>
                                <Checkbox id={field.toLowerCase()} checked={formData.expertise.includes(field.toLowerCase())} onChange={handleCheckboxChange} />
                                <label htmlFor={field.toLowerCase()} className="text-foreground">{field}</label>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="space-y-2">
                <h2 className="text-2xl font-bold">Interview Preferences</h2>
                <div className="space-y-2">
                    <Label htmlFor="interviewMode">Preferred Interview Mode</Label>
                    <Select id="interviewMode" value={formData.interviewMode} onValueChange={(value) => setFormData(prev => ({ ...prev, interviewMode: value }))}>
                        <SelectTrigger className="bg-muted text-foreground">
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
                                {date ? format(date, 'PPP') : 'Select a date'}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar mode="single" selected={date} onSelect={setDate} />
                        </PopoverContent>
                    </Popover>
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="linkedin">LinkedIn Profile (Optional)</Label>
                <Input id="linkedin" value={formData.linkedin} onChange={handleChange} placeholder="Enter LinkedIn profile URL" className="bg-muted text-foreground" />
            </div>

            <Button type="submit" className="w-full">Submit</Button>
        </form>
    );
}
