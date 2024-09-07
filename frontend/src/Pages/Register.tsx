import React, { useState, useEffect } from 'react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

// Sample data to be replaced with backend data
const sampleData = [
  { id: 'S001', status: 'Active', domain: 'AI/ML', workExperience: '5 Years' },
  { id: 'S002', status: 'Pending', domain: 'Web Development', workExperience: '2 Years' },
  // Add more sample data as needed
];

export const Applicants: React.FC = () => {
  const [data, setData] = useState(sampleData); // Initialize with sample data

  useEffect(() => {
    // Function to fetch data from backend
    const fetchData = async () => {
      try {
        const response = await fetch('/api/candidates'); // Adjust API endpoint as needed
        if (response.ok) {
          const fetchedData = await response.json();
          setData(fetchedData); // Update state with fetched data
        } else {
          console.error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Fetch data when component mounts
  }, []);

  return (
    <Table>
      <TableCaption>A List of Candidates Information</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">SI_NO</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Domain</TableHead>
          <TableHead className="text-right">Work Experience</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item,index) => (
          <TableRow key={item.id}>
            <TableCell className="font-medium">{item.id}</TableCell>
            <TableCell>{item.status}</TableCell>
            <TableCell>{item.domain}</TableCell>
            <TableCell className="text-right">{item.workExperience}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
export default Applicants;

