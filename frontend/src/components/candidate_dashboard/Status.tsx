import React, { useEffect, useState } from 'react';
import { Briefcase } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge"; // Import Badge component

interface AppliedJob {
  id: string;
  jobTitle: string;
  companyName: string;
  applicationStatus: string;
}

export const AppliedJobLists: React.FC = () => {
  const [appliedJobs, setAppliedJobs] = useState<AppliedJob[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAppliedJobs = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/candidate/appliedjobs', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setAppliedJobs(data.appliedJobs);
      } else {
        console.error('Error fetching applied jobs:', data.error);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching applied jobs:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppliedJobs();
    const interval = setInterval(fetchAppliedJobs, 5000); // Fetch every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'accepted':
        return 'bg-green-500 text-white'; // Green badge for accepted
      case 'rejected':
        return 'bg-red-500 text-white'; // Red badge for rejected
      case 'pending':
        return 'bg-yellow-500 text-black'; // Yellow badge for pending
      default:
        return 'bg-gray-500 text-white'; // Default gray badge
    }
  };

  if (loading) {
    return <div className="text-center text-white">Loading applied jobs...</div>;
  }

  if (appliedJobs.length === 0) {
    return <div className="text-center text-white">No applied jobs found.</div>;
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
                <CardTitle className="text-xl font-semibold text-primary text-[#82aaff]">
                  {job.jobTitle}
                </CardTitle>
                <p className="text-lg text-muted-foreground">{job.companyName}</p>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="flex items-center justify-between">
                  <Briefcase className="w-4 h-4 mr-2 text-[#80cbc4]" />
                  <Badge className={`py-1 px-3 rounded-full ${getStatusColor(job.applicationStatus)}`}>
                    {job.applicationStatus}
                  </Badge>
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
