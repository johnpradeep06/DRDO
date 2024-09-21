'use client';
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
//import { toast } from "@/components/ui/use-toast";
import { useNavigate } from 'react-router-dom'; 
import {Toaster,toast} from 'sonner';

export default function RegistrationForm() {
  
  let navigate = useNavigate(); 

  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone_number: '',
    password: '',
    confirmPassword: '',
    role: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (value: string) => {
    setFormData(prev => ({ ...prev, role: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log(formData); // Log the formData before sending it

    if (formData.password !== formData.confirmPassword) {
        toast.error("password mismatch")
        return;
    }

    try {
        const response = await fetch('http://localhost:8000/api/register/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                full_name: formData.full_name,
                email: formData.email,
                phone_number: formData.phone_number,
                password: formData.password,
                role: formData.role,
            }),
        });
        
        if (response.ok) {
            const data = await response.json();
            console.log('User registered:', data.full_name);
            navigate('/');  // Navigate after successful registration
        } else {
            const errorData = await response.json();
            if (errorData.email && Array.isArray(errorData.email)) {
             
              toast.error("Email address already exists");
          }
            console.log(errorData);
            
           
        }
    } catch (error) {
        
        console.error("Error during registration:", error);
    }
};


  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto mt-8 p-6 bg-card rounded-lg shadow-lg shadow-[0_-4px_10px_rgba(0,0,0,0.1)]">
      <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
      
      <div className="space-y-2">
        <Label htmlFor="full_name">Full Name</Label>
        <Input 
          id="full_name" 
          name="full_name" 
          value={formData.full_name} 
          onChange={handleInputChange} 
          required 
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <Input 
          id="email" 
          name="email" 
          type="email" 
          value={formData.email} 
          onChange={handleInputChange} 
          required 
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone_number">Phone Number</Label>
        <Input 
          id="phone_number" 
          name="phone_number" 
          type="tel" 
          value={formData.phone_number} 
          onChange={handleInputChange} 
          required 
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input 
          id="password" 
          name="password" 
          type="password" 
          value={formData.password} 
          onChange={handleInputChange} 
          required 
          minLength={8}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input 
          id="confirmPassword" 
          name="confirmPassword" 
          type="password" 
          value={formData.confirmPassword} 
          onChange={handleInputChange} 
          required 
          minLength={8}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="role">Role</Label>
        <Select onValueChange={handleRoleChange} required>
          <SelectTrigger>
            <SelectValue placeholder="Select a role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="RECRUITER">Recruiter</SelectItem>
            <SelectItem value="CANDIDATE">Candidate</SelectItem>
          </SelectContent>
        </Select>
        <Toaster richColors/>
      </div>

      <Button type="submit" className="w-full" onSubmit={() => toast.success('successfully registered')}>Register</Button>
    </form>
  );
}
