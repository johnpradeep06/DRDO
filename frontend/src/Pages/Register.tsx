'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    role: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleRoleChange = (value: string) => {
    setFormData(prev => ({ ...prev, role: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      })
      return
    }
    // Here you would typically send the data to your backend
    console.log('Form submitted:', formData)
    toast({
      title: "Success",
      description: "Registration submitted successfully!",
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto p-6 bg-card rounded-lg shadow-lg">
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
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="candidate">Candidate</SelectItem>
            <SelectItem value="scientist">Scientist</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button type="submit" className="w-full">Register</Button>
    </form>
  )
}