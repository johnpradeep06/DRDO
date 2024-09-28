import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UploadIcon } from 'lucide-react';
import { useLocation } from 'react-router-dom';

export default function ResumeUploadCard() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const jobId = queryParams.get('jobId');
  const [file, setFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  const token = localStorage.getItem('token'); // Move token retrieval here

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    if (!file) {
      setUploadStatus('Please select a file first.');
      return;
    }
  
    const formData = new FormData();
    formData.append('resume', file);
    formData.append('jobId', jobId!); // Include jobId in the form data
  
    try {
      const response = await fetch('http://localhost:5000/api/candidate/upload', {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log();
        setUploadStatus('File uploaded successfully!');
      } else {
        const errorData = await response.json();
        setUploadStatus(`Failed to upload the file: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploadStatus('An error occurred while uploading the file.');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload Resume</CardTitle>
        <CardDescription>Upload your resume here.</CardDescription>
      </CardHeader>
      <form onSubmit={handleUpload}>
        <CardContent>
          <Label htmlFor="resume">Resume</Label>
          <Input type="file" id="resume" accept=".pdf" onChange={handleFileChange} />
        </CardContent>
        <CardFooter>
          <Button type="submit">
            Upload <UploadIcon className="ml-2" />
          </Button>
          {uploadStatus && <p>{uploadStatus}</p>}
        </CardFooter>
      </form>
    </Card>
  );
}