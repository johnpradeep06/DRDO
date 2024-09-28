import React, { useEffect, useState } from 'react';
import { MapPin, Briefcase } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

// Interface to match the candidate's applied jobs
interface AppliedJob {
  id: string;
  jobTitle: string;
  companyName: string;
  applicationStatus: string;
}

export const AppliedJobLists: React.FC = () => {
  const [userName, setUserName] = useState("");
  const [candidateId,setcandidateId] = useState("");
  const [appliedJobs, setAppliedJobs] = useState<AppliedJob[]>([]);
  const [loading, setLoading] = useState(true);

 

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch("http://localhost:5000/api/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          console.log(`Name from the front end: ${data.name}`);
          setUserName(data.name);
          setUserName(data.id);
        } else {
          console.error("Error fetching user data:", data.error);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const fetchAppliedJobs = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/candidate/view-applied', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setAppliedJobs(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching applied jobs:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppliedJobs();
    const interval = setInterval(fetchAppliedJobs, 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <div className="text-center text-white">Loading applied jobs...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 bg-background shadow-md">
        <h1 className="text-center text-3xl font-bold py-6">My Applied Jobs</h1>
      </header>
      <main className="container mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {appliedJobs.map((job) => (
            <Card key={job.id} className="flex flex-col transition-all hover:shadow-lg hover:scale-105">
              <CardHeader>
                <div className="flex justify-between">
                  <div>
                    <CardTitle className="text-xl font-semibold text-primary text-[#82aaff]">
                      {job.jobTitle}
                    </CardTitle>
                    <p className="text-lg text-muted-foreground ">{job.companyName}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-grow space-y-4">
                <div className="flex items-center justify-end text-[#80cbc4]">
                  <Briefcase className="w-4 h-4 mr-2" />
                  Application Status: {job.applicationStatus}
                </div>
              </CardContent>
              
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default AppliedJobLists;
