import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';

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
    fetchJobPosts(); // Initial fetch
    const interval = setInterval(fetchJobPosts, 1000); // Fetch every 1 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  if (loading) {
    return <div style={{ textAlign: 'center', color: 'white' }}>Loading job posts...</div>;
  }

  return (
    <div style={{ padding: '20px', backgroundColor: '#181818', color: 'white' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Job Posts</h1>
      <Swiper
        spaceBetween={30}
        slidesPerView={1}
        pagination={{ clickable: true }}
        loop={true}
        autoplay={{ delay: 3000 }}
        navigation={true}
        modules={[Navigation, Pagination, Autoplay]}
        style={{
          paddingBottom: '50px',
        }}
      >
        {jobPosts.map((job) => (
          <SwiperSlide key={job.id}>
            <div
              style={{
                backgroundColor: '#252525',
                borderRadius: '10px',
                padding: '20px',
                margin: '0 auto',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
                textAlign: 'center',
                maxWidth: '800px',
                width: '100%',
                transition: 'transform 0.3s ease',
              }}
            >
              <h2 style={{ color: '#00BFFF', fontSize: '24px' }}>{job.jobTitle}</h2>
              <h3 style={{ color: '#FFB800', fontSize: '20px' }}>{job.companyName}</h3>
              <p style={{ fontSize: '16px', marginTop: '10px' }}><strong>Recruiter:</strong> {job.recruiterName}</p>
              <p style={{ fontSize: '16px' }}>{job.jobDescription}</p>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-around',
                  marginTop: '20px',
                  flexWrap: 'wrap',
                }}
              >
                <p><strong>Skills:</strong> {job.requiredSkills}</p>
                <p><strong>Experience:</strong> {job.requiredExperience}</p>
                <p><strong>Education:</strong> {job.educationalLevel}</p>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-around',
                  marginTop: '10px',
                  flexWrap: 'wrap',
                }}
              >
                <p><strong>Location:</strong> {job.location}</p>
                <p><strong>Salary:</strong> {job.salary ? `$${job.salary}` : 'N/A'}</p>
                <p><strong>Employment Type:</strong> {job.employmentType}</p>
              </div>
              <button
                style={{
                  backgroundColor: '#007bff',
                  color: 'white',
                  padding: '10px 20px',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  marginTop: '20px',
                }}
              >
                Apply
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Jobpost;
