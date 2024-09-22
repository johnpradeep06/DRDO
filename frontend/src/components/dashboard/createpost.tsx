'use client';
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea"; 
import { useNavigate } from 'react-router-dom'; 
import {Toaster, toast} from 'sonner';

export default function JobPostingForm() {
  
  let navigate = useNavigate(); 

  const [formData, setFormData] = useState({
    recruiterName: '',
    jobTitle: '',
    employmentType: '',
    requiredSkills: '',
    requiredExperience: '',
    educationalLevel: '',
    contactInfo: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEmploymentTypeChange = (value: string) => {
    setFormData(prev => ({ ...prev, employmentType: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log(formData); // Log the formData before sending it

    try {
        const response = await fetch('http://localhost:5000/api/job-posting/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        // Handle response based on status
        if (response.ok) {
            const data = await response.json();
            if (data.success) {
                console.log('Job posted:', data.jobTitle);
                toast.success('Job posting created successfully');
                navigate('/');  // Navigate after successful creation
            } else {
                toast.error('Something went wrong during job posting');
            }
        } else {
            const errorData = await response.json();
            toast.error(errorData);
        }
    } catch (error) {
        toast.error('Network error or server unavailable');
        console.error("Error during job posting:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto mt-8 p-6 bg-card rounded-lg shadow-lg shadow-[0_-4px_10px_rgba(0,0,0,0.1)]">
      <h2 className="text-2xl font-bold text-center mb-6">Create Job Posting</h2>
      
      <div className="space-y-2">
        <Label htmlFor="recruiterName">Recruiter Name</Label>
        <Input 
          id="recruiterName" 
          name="recruiterName" 
          value={formData.recruiterName} 
          onChange={handleInputChange} 
          required 
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="jobTitle">Job Title</Label>
        <Input 
          id="jobTitle" 
          name="jobTitle" 
          value={formData.jobTitle} 
          onChange={handleInputChange} 
          required 
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="employmentType">Employment Type</Label>
        <Select onValueChange={handleEmploymentTypeChange} required>
          <SelectTrigger>
            <SelectValue placeholder="Select an employment type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="full-time">Full-Time</SelectItem>
            <SelectItem value="part-time">Part-Time</SelectItem>
            <SelectItem value="intern">Intern</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="requiredSkills">Required Skills</Label>
        <Textarea 
          id="requiredSkills" 
          name="requiredSkills" 
          value={formData.requiredSkills} 
          onChange={handleInputChange} 
          required 
          placeholder="List required skills separated by commas"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="requiredExperience">Required Experience (in years)</Label>
        <Input 
          id="requiredExperience" 
          name="requiredExperience" 
          type="number" 
          value={formData.requiredExperience} 
          onChange={handleInputChange} 
          required 
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="educationalLevel">Educational Level</Label>
        <Input 
          id="educationalLevel" 
          name="educationalLevel" 
          value={formData.educationalLevel} 
          onChange={handleInputChange} 
          required 
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="contactInfo">Contact Information (Phone Number)</Label>
        <Input 
          id="contactInfo" 
          name="contactInfo" 
          type="tel" 
          value={formData.contactInfo} 
          onChange={handleInputChange} 
          required 
        />
      </div>

      <Toaster richColors/>
      
      <Button type="submit" className="w-full">Post Job</Button>
    </form>
  );
}
