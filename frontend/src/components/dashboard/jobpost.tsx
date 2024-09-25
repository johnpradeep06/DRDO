import React, { useEffect, useState } from 'react';
import { Trash2, Edit } from 'lucide-react';

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

export const Jobpost: React.FC = () => {
  const [jobPosts, setJobPosts] = useState<JobPost[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchJobPosts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/jobposts');
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
    <div className="min-h-screen bg-[#181818] text-white">
      <header className="sticky top-0 z-10 bg-[#181818] shadow-md">
        <h1 className="text-center text-3xl font-bold py-6">Job Posts</h1>
      </header>
      <main className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobPosts.map((job) => (
            <div
              key={job.id}
              className="bg-[#1E1E1E] rounded-lg p-6 shadow-lg transition-all hover:shadow-xl hover:scale-105"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-blue-400">{job.jobTitle}</h2>
                  <h3 className="text-lg text-gray-400">{job.companyName}</h3>
                </div>
              </div>
              <div className="space-y-2 mb-4">
                <p className="text-sm line-clamp-3">{job.jobDescription}</p>
                <div className="flex justify-between text-sm">
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {job.location}
                  </span>
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {job.employmentType}
                  </span>
                </div>
                <div className="text-sm">
                  <strong>Skills:</strong> {job.requiredSkills}
                </div>
                <div className="text-sm">
                  <strong>Experience:</strong> {job.requiredExperience}
                </div>
                <div className="text-sm">
                  <strong>Education:</strong> {job.educationalLevel}
                </div>
                <div className="text-sm">
                  <strong>Salary:</strong> {job.salary}
                </div>
              </div>
              <div className="flex justify-between">
                <button className="flex items-center bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors">
                  <Edit size={16} className="mr-2" />
                  Edit
                </button>
                <button className="flex items-center bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors">
                  <Trash2 size={16} className="mr-2" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Jobpost;