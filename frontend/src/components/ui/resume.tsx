"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { UploadIcon, FileIcon, CheckCircleIcon } from "lucide-react"

export function Resume() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile)
      const reader = new FileReader()
      reader.onload = (e) => setPreview(e.target?.result as string)
      reader.readAsDataURL(selectedFile)
    } else {
      alert("Please select a PDF file")
      setFile(null)
      setPreview(null)
    }
  }

  const handleSubmit = () => {
    if (file) {
      // Here you would typically upload the file to your server
      console.log("Uploading file:", file.name)
      // For demo purposes, we'll just log the file name
      alert(`Resume "${file.name}" uploaded successfully!`)
    } else {
      alert("Please select a file before submitting")
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Upload Your Resume</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-center w-full">
          <Label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <UploadIcon className="w-10 h-10 mb-3 text-gray-400" />
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500">PDF (MAX. 5MB)</p>
            </div>
            <Input
              id="dropzone-file"
              type="file"
              className="hidden"
              accept=".pdf"
              onChange={handleFileChange}
            />
          </Label>
        </div>
        {file && (
          <div className="flex items-center space-x-2">
            <FileIcon className="w-5 h-5 text-blue-500" />
            <span className="text-sm text-gray-500">{file.name}</span>
            <CheckCircleIcon className="w-5 h-5 text-green-500" />
          </div>
        )}
        {preview && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Preview:</h3>
            <iframe src={preview} className="w-full h-96 border rounded" title="Resume Preview" />
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={handleSubmit} className="w-full" disabled={!file}>
          Submit Resume
        </Button>
      </CardFooter>
    </Card>
  )
}
