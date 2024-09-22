'use client';
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
//import { toast } from "@/components/ui/use-toast";
import { useNavigate } from 'react-router-dom'; 
import {Toaster, toast} from 'sonner';

export default function RegistrationForm() {
  
  let navigate = useNavigate(); 

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
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

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
        toast.error("Passwords do not match");
        return;
    }

    try {
        const response = await fetch('http://localhost:5000/api/register/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                fullName: formData.fullName,
                email: formData.email,
                phoneNumber: formData.phoneNumber,
                password: formData.password,
                role: formData.role,
            }),
        });

        // Handle response based on status
        if (response.ok) {
            const data = await response.json();
            if (data.user) {
                console.log('User registered:', data.user.fullName);
                toast.success('Successfully registered');
                navigate('/');  // Navigate after successful registration
            } else {
                toast.error('Something went wrong during registration');
            }
        } else {
            const errorData = await response.json();
            if (errorData.error === 'User already exists') {
                toast.error('User already exists with this email');
            } else {
                toast.error('Registration failed. Please check your details.');
            }
        }
    } catch (error) {
        toast.error('Network error or server unavailable');
        console.error("Error during registration:", error);
    }
  };


  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto mt-8 p-6 bg-card rounded-lg shadow-lg shadow-[0_-4px_10px_rgba(0,0,0,0.1)]">
      <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
      
      <div className="space-y-2">
        <Label htmlFor="fullName">Full Name</Label>
        <Input 
          id="fullName" 
          name="fullName" 
          value={formData.fullName} 
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
        <Label htmlFor="phoneNumber">Phone Number</Label>
        <Input 
          id="phoneNumber" 
          name="phoneNumber" 
          type="tel" 
          value={formData.phoneNumber} 
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
            <SelectItem value="RECRUITER">RECRUITER</SelectItem>
            <SelectItem value="CANDIDATE">CANDIDATE</SelectItem>
          </SelectContent>
        </Select>
        <Toaster richColors/>
      </div>

      <Button type="submit" className="w-full">Register</Button>
    </form>
  );
}
