'use client';
import { useState } from 'react';
import { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea"; 
import { useNavigate } from 'react-router-dom'; 
import { Toaster, toast } from 'sonner';

export default function JobPostingForm() {
  
  let navigate = useNavigate(); 

  const [formData, setFormData] = useState({
    recruiterName: '',
    jobTitle: '',
    jobDescription: '',  // Added field
    employmentType: '',
    requiredSkills: '',
    requiredExperience: '',
    educationalLevel: '',
    contactInfo: '',
    location: '',  // Added field
    companyName: '',  // Added field
    salary: ''  // Added field
  });

  const [token, setToken] = useState('');

  useEffect(() => {
    // Retrieve the token from localStorage when the component mounts
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    } else {
      // If there's no token, redirect to login page
      navigate('/login');
    }
  }, [navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEmploymentTypeChange = (value: string) => {
    setFormData(prev => ({ ...prev, employmentType: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!token) {
      toast.error('You must be logged in to post a job');
      navigate('/login');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/recruiter/post-jobposts/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Include the token in the Authorization header
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.jobTitle);
        toast.success('Job posting created successfully');
        navigate(-1);
      } else {
        const errorData = await response.text();
        toast.error(errorData || 'Error creating job posting');
      }
    } catch (error) {
      toast.error('Network error or server unavailable');
      console.error("Error during job posting:", error);
    }
  };


  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto mt-8 p-6 bg-card rounded-lg shadow-lg">
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
        <Label htmlFor="jobDescription">Job Description</Label>
        <Textarea 
          id="jobDescription" 
          name="jobDescription" 
          value={formData.jobDescription} 
          onChange={handleInputChange} 
          required 
          placeholder="Describe the job role and responsibilities"
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

      <div className="space-y-2">
        <Label htmlFor="location">Location</Label>
        <Input 
          id="location" 
          name="location" 
          value={formData.location} 
          onChange={handleInputChange} 
          required 
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="companyName">Company Name</Label>
        <Input 
          id="companyName" 
          name="companyName" 
          value={formData.companyName} 
          onChange={handleInputChange} 
          required 
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="salary">Salary</Label>
        <Input 
          id="salary" 
          name="salary" 
           
          value={formData.salary} 
          onChange={handleInputChange} 
          required 
        />
      </div>

      <Toaster richColors/>
      
      <Button type="submit" className="w-full">Post Job</Button>
    </form>
  );
}
