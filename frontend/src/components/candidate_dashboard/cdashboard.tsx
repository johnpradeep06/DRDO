import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

export const Dash: React.FC = () => {
  const navigate = useNavigate();
  const [isResumeUploaded, setIsResumeUploaded] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null); // Reference to the hidden file input

  // Function to check if the resume is already uploaded
  const checkResumeStatus = async () => {
    try {
      const response = await fetch("/api/check-resume-status");
      const data = await response.json();
      if (data.resumeExists) {
        setIsResumeUploaded(true);
      }
    } catch (error) {
      console.error("Error checking resume status:", error);
    }
  };

  useEffect(() => {
    checkResumeStatus();
  }, []);

  // Function to handle resume action
  const handleResumeAction = () => {
    if (isResumeUploaded) {
      navigate("/resume-view");
    } else {
      // Trigger the file input click event to open file picker
      fileInputRef.current?.click();
    }
  };

  // Function to handle file selection and upload
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const formData = new FormData();
        formData.append("resume", file); // Append the file to the form data

        // Send the POST request to upload the file
        const response = await fetch("http://localhost:5000/api/upload-resume", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();

        if (data.success) {
          setIsResumeUploaded(true); // Set resume uploaded status
        }
      } catch (error) {
        console.error("Error uploading resume:", error);
      }
    }
  };

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex justify-between items-center">
        <Button className="gap-2" onClick={handleResumeAction}>
          <Plus className="h-4 w-4" />
          {isResumeUploaded ? "View Resume" : "Upload Resume"}
        </Button>

        {/* Hidden file input for uploading the resume */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: "none" }} // Hide the file input
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Sample Chart</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">{/* Render Bar Chart here */}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Sample Chart</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">{/* Render Pie Chart here */}</div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};
