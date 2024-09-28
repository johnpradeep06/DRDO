import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Define the Candidate type
interface Candidate {
  id: number;
  name: string;
  yearsOfExperience: number;
  relevancyScore: number;
  appliedFor: string;
}

// ProgressCircle Component
function ProgressCircle({ percentage }: { percentage: number }) {
  const circumference = 2 * Math.PI * 18;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center overflow-hidden rounded-full w-12 h-12">
      <svg className="w-12 h-12 transform -rotate-90">
        <circle
          className="text-gray-700"
          strokeWidth="4"
          stroke="currentColor"
          fill="transparent"
          r="18"
          cx="24"
          cy="24"
        />
        <circle
          className="text-blue-400"
          strokeWidth="4"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r="18"
          cx="24"
          cy="24"
        />
      </svg>
      <span className="absolute text-xs font-medium text-blue-400">{percentage}%</span>
    </div>
  );
}

export default function Candidates() {
  const [candidates, setCandidates] = useState<Candidate[]>([]); // Type the state correctly
  const [minScore, setMinScore] = useState(70);

  // Fetch data from the backend
  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/recruiter/appliedjobs/");
        const data = await response.json();
        setCandidates(data); // Assuming the data is already in the correct format
      } catch (err: any) {
        console.error("Error fetching candidates:", err.message); // Safely log error message
      }
    };

    fetchCandidates();
  }, []);

  const handleRejectBelow = () => {
    setCandidates(candidates.filter(candidate => candidate.relevancyScore >= minScore));
  };

  const handleShortlist = (id: number) => {
    alert(`Candidate ${id} shortlisted`);
  };

  const handleReject = (id: number) => {
    setCandidates(candidates.filter(candidate => candidate.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-blue-400">Applied Candidates</h1>
        <div className="bg-gray-800 shadow rounded-lg overflow-hidden">
          <div className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gray-700 space-y-4 sm:space-y-0">
            <h2 className="text-lg font-semibold text-white">Candidate List</h2>
            <div className="flex items-center space-x-2">
              <Label htmlFor="min-score" className="text-sm text-gray-300">
                Min Score:
              </Label>
              <Input
                id="min-score"
                type="number"
                value={minScore}
                onChange={(e) => setMinScore(Number(e.target.value))}
                className="w-20 bg-gray-600 text-white border-gray-500"
              />
              <Button onClick={handleRejectBelow} variant="destructive" size="sm">
                Reject Below
              </Button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-gray-700">
                <TableRow>
                  <TableHead className="text-gray-300 font-bold">Candidate Name</TableHead>
                  <TableHead className="text-gray-300 font-bold">Applied For</TableHead>
                  <TableHead className="text-gray-300 font-bold">Years of Experience</TableHead>
                  <TableHead className="text-gray-300 font-bold">Relevancy Score</TableHead>
                  <TableHead className="text-gray-300 font-bold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {candidates.map((candidate) => (
                  <TableRow key={candidate.id} className="border-b border-gray-700">
                    <TableCell className="font-medium text-gray-300">{candidate.name}</TableCell>
                    <TableCell className="text-gray-400">{candidate.appliedFor}</TableCell>
                    <TableCell className="text-gray-400">{candidate.yearsOfExperience}</TableCell>
                    <TableCell>
                      <ProgressCircle percentage={candidate.relevancyScore} />
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                        <Button onClick={() => handleShortlist(candidate.id)} variant="outline" size="sm" className="border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white">
                          Shortlist
                        </Button>
                        <Button onClick={() => handleReject(candidate.id)} variant="destructive" size="sm">
                          Reject
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
