'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { UploadIcon } from 'lucide-react'

export default function ResumeUploadCard() {
  const [file, setFile] = useState<File | null>(null)
  const [uploadStatus, setUploadStatus] = useState<string | null>(null)
  const token = localStorage.getItem('token');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0])
    }
  }

  const handleUpload = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!file) {
      setUploadStatus('Please select a file first.')
      return
    }

    const formData = new FormData()
    formData.append('resume', file)

    try {
      const response = await fetch('http://localhost:5000/api/candidate/upload', {
        method: 'POST',
        body: formData,
        headers: {
            Authorization: `Bearer ${token}`,
          },
      })

      if (response.ok) {
        setUploadStatus('File uploaded successfully.')
      } else {
        setUploadStatus('Failed to upload the file.')
      }
    } catch (error) {
      console.error('Error uploading file:', error)
      setUploadStatus('An error occurred while uploading the file.')
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Upload Your Resume</CardTitle>
          <CardDescription>Accepted formats: PDF, DOC, DOCX</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleUpload}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="resume">Resume</Label>
                <Input 
                  id="resume" 
                  type="file" 
                  accept=".pdf,.doc,.docx" 
                  onChange={handleFileChange}
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-start">
          <Button type="submit" className="w-full" onClick={(e) => handleUpload(e as any)}>
            <UploadIcon className="mr-2 h-4 w-4" /> Upload Resume
          </Button>
          {uploadStatus && (
            <p className={`mt-2 text-sm ${uploadStatus.includes('success') ? 'text-green-600' : 'text-red-600'}`}>
              {uploadStatus}
            </p>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
