import React, { useEffect, useState } from 'react';
import {  MapPin, Briefcase, GraduationCap, DollarSign } from 'lucide-react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import ShinyButton from "@/components/magicui/shiny-button";
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';


interface JobPost {
  id: string;
  recruiterName: string;
  jobTitle: string;
  jobDescription: string;
  employmentType: string;
  requiredSkills: string;
  requiredExperience: string;
  educationalLevel: string;
  contactInfo: string;
  location: string;
  companyName: string;
  salary: string;
}

export const JobLists: React.FC = () => {
  const [userName, setUserName] = useState("");
  const [jobPosts, setJobPosts] = useState<JobPost[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const handleClick = (jobId: string) => {
    return () => navigate(`/candidate/apply?jobId=${jobId}`); // Pass the job ID as a query parameter
  };
  useEffect(() => {
    const fetchUserData = async (id: string) => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:5000/api/user/${id}`, { // Use backticks for template literals
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          setUserName(data.name); // Set the user's full name
        } else {
          console.error("Error fetching user data:", data.error);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
  
    // Assuming you have access to the user's ID here
    const userId = "some-user-id"; // Replace with actual user ID
    fetchUserData(userId);
  }, []);

  const fetchJobPosts = async () => {
    try {
      const token = localStorage.getItem('token'); // Get the token from localStorage

      const response = await fetch('http://localhost:5000/api/candidate/get-jobposts',{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setJobPosts(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching job posts:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobPosts();
    const interval = setInterval(fetchJobPosts, 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <div className="text-center text-white">Loading job posts...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 bg-background shadow-md">
        <h1 className="text-center text-3xl font-bold py-6">Job Listings</h1>
      </header>
      <main className="container mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobPosts.map((job) => (
            <Card key={job.id} className="flex flex-col transition-all hover:shadow-lg hover:scale-105">
              <CardHeader>
                <div className="flex justify-between">
                  <div>
                    <CardTitle className="text-xl font-semibold text-primary text-[#82aaff]">
                      {job.jobTitle}
                    </CardTitle>
                    <p className="text-lg text-muted-foreground ">{job.companyName}</p>
                  </div>
                  <div className="text-right text-sm">
                    <div className="flex items-center justify-end mb-1 text-orange-200">
                      <MapPin className="w-4 h-4 mr-2" />
                      {job.location}
                    </div>
                    <div className="flex items-center justify-end text-[#80cbc4]">
                      <Briefcase className="w-4 h-4 mr-2" />
                      {job.employmentType}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-grow space-y-4">
                <div>
                  <h3 className="font-semibold mb-2 text-[#652bc9]">Description</h3>
                  <p className="text-sm line-clamp-3">{job.jobDescription}</p>
                </div>
                <div className="flex flex-wrap gap-2 ">
                  {job.requiredSkills.split(',').map((skill: string, index: number) => (
                    <Badge key={index} variant="secondary">{skill.trim()}</Badge>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center ">
                    <GraduationCap className="w-4 h-4 mr-2" />
                    {job.educationalLevel}
                  </div>
                  <div className="flex items-center overflow-hidden text-[#ff5370]">
                    <DollarSign className="w-4 h-4 mr-2" />
                    {job.salary}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="mt-auto flex justify-center">
                
              <Button onClick={handleClick(job.id)}>Apply</Button>
                

              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>

  );
};

export default JobLists;