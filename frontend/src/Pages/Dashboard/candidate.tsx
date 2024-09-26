import { useState, useEffect } from "react";
import { Link } from "react-router-dom"; 
import { Menu, User, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";


import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Candidates } from '@/components/admin_dashboard/candidates';
import { Dash } from '@/components/candidate_dashboard/cdashboard';
import { JobLists } from '@/components/candidate_dashboard/joblistings';
import { Questions } from '@/components/admin_dashboard/questions';

export function CandidateDashboard() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/"); // Redirect to the login page after logging out
  };
  

  const [userName, setUserName] = useState("");
  const [curDash, setCurDash] = useState<"Dashboard" | "Job Listings" | "Application Status" | "Interview Schedules">("Dashboard");

  // Fetch the user data from the backend
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch("http://localhost:5000/api/candidate", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          console.log(`Name from the front end: {data.name}`);
          setUserName(data.name); // Set the user's full name
        } else {
          console.error("Error fetching user data:", data.error);
        }
        console.log(`Set the username: {UserName}`);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  // Define the component to render based on curDash state
  const renderCurrentTab = () => {
    switch (curDash) {
      case "Dashboard":
        return <Dash />;
      case "Job Listings":
        return <JobLists />;
      case "Application Status":
        return <Candidates />;
      case "Interview Schedules":
        return <Questions />;
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0  flex h-16 items-center justify-between gap-4 border-b bg-background px-4 md:px-6">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            to="#"
            className={`transition-colors hover:text-blue-500 hover:-translate-y-0.5 ${curDash === "Dashboard" ? "font-bold text-blue-500" : "text-muted-foreground"}`}
            onClick={() => setCurDash("Dashboard")}
          >
            Dashboard
          </Link>
          <Link
            to="#"
            className={`transition-colors hover:text-blue-500 hover:-translate-y-0.5 ${curDash === "Job Listings" ? "font-bold text-blue-500" : "text-muted-foreground"}`}
            onClick={() => setCurDash("Job Listings")}
          >
            Job Listings
          </Link>
          <Link
            to="#"
            className={`transition-colors hover:text-blue-500 hover:-translate-y-0.5 ${curDash === "Application Status" ? "font-bold text-blue-500" : "text-muted-foreground"}`}
            onClick={() => setCurDash("Application Status")}
          >
            Application Status
          </Link>
          <Link
            to="#"
            className={`transition-colors hover:text-blue-500 hover:-translate-y-0.5 ${curDash === "Interview Schedules" ? "font-bold  text-blue-500" : "text-muted-foreground"}`}
            onClick={() => setCurDash("Interview Schedules")}
          >
            Intreview Schedules
          </Link>
          
        </nav>
        
        {/* Mobile navigation */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="shrink-0 md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Link to="#" onClick={() => setCurDash("Dashboard")} className={`hover:text-foreground ${curDash === "Dashboard" ? "font-bold" : ""}`}>
                Dashboard
              </Link>
              <Link to="#" onClick={() => setCurDash("Job Listings")} className={`hover:text-foreground ${curDash === "Job Listings" ? "font-bold" : ""}`}>
                Job Posts
              </Link>
              <Link to="#" onClick={() => setCurDash("Application Status")} className={`hover:text-foreground ${curDash === "Application Status" ? "font-bold" : ""}`}>
                Candidates
              </Link>

              <Link
                to="#"
                onClick={() => setCurDash("Interview Schedules")}
                className={`relative overflow-hidden rounded-md px-3 py-1 group ${curDash === "Interview Schedules" ? "font-bold" : "text-muted-foreground"}`}
              >
                
                <span className="relative z-10 flex items-center gap-1">
                
                  AI Questions
                 
                  <Sparkles className="h-4 w-4" />
                </span>
                <span className="absolute inset-0 z-0 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
              </Link>

            </nav>
          </SheetContent>
        </Sheet>
        
        {/* User Menu */}
        
        <div className="flex items-center gap-x-2">
          <p>{userName}</p>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <User className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>{userName || "No name available"}</DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <main className="p-4">
        {/* Render the current dashboard content */}
        {renderCurrentTab()}
      </main>
    </div>
  );
}
