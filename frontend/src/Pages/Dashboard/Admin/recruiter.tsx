import { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Assuming you use React Router
import { Package2, Menu, User, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Candidates } from '@/components/dashboard/candidates';
import { Dash } from '@/components/dashboard/dashboard';
import { Jobpost } from '@/components/dashboard/jobpost';
import { Questions } from '@/components/dashboard/questions';

export function RecruiterDashboard() {
  const [userName, setUserName] = useState("");
  const [curDash, setCurDash] = useState<"Dashboard" | "Job Posts" | "Candidates" | "AI Questions">("Dashboard");

  // Fetch the user data from the backend
  useEffect(() => {
    fetch("/api/user") // Replace with your actual API endpoint
      .then((response) => response.json())
      .then((data) => {
        setUserName(data.name); // Assuming the API response has a "name" field
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  // Define the component to render based on curDash state
  const renderCurrentTab = () => {
    switch (curDash) {
      case "Dashboard":
        return <Dash />;
      case "Job Posts":
        return <Jobpost />;
      case "Candidates":
        return <Candidates />;
      case "AI Questions":
        return <Questions />;
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 flex h-16 items-center justify-between gap-4 border-b bg-background px-4 md:px-6">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            to="#"
            className={`transition-colors hover:text-foreground ${
              curDash === "Dashboard" ? "font-bold text-foreground" : "text-muted-foreground"
            }`}
            onClick={() => setCurDash("Dashboard")}
          >
            Dashboard
          </Link>
          <Link
            to="#"
            className={`transition-colors hover:text-foreground ${
              curDash === "Job Posts" ? "font-bold text-foreground" : "text-muted-foreground"
            }`}
            onClick={() => setCurDash("Job Posts")}
          >
            Job Posts
          </Link>
          <Link
            to="#"
            className={`transition-colors hover:text-foreground ${
              curDash === "Candidates" ? "font-bold text-foreground" : "text-muted-foreground"
            }`}
            onClick={() => setCurDash("Candidates")}
          >
            Candidates
          </Link>
          <Link
            to="#"
            className={`relative overflow-hidden rounded-md px-3 py-1 transition-all duration-300 ease-in-out group ${
              curDash === "AI Questions" ? "font-bold text-foreground" : "text-muted-foreground hover:text-white"
            }`}
            onClick={() => setCurDash("AI Questions")}
          >
            <span className="relative z-10 flex items-center gap-1">
              AI Questions
              <Sparkles className="h-4 w-4" />
            </span>
            <span className="absolute inset-0 z-0 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
              <Link to="#" onClick={() => setCurDash("Job Posts")} className={`hover:text-foreground ${curDash === "Job Posts" ? "font-bold" : ""}`}>
                Job Posts
              </Link>
              <Link to="#" onClick={() => setCurDash("Candidates")} className={`hover:text-foreground ${curDash === "Candidates" ? "font-bold" : ""}`}>
                Candidates
              </Link>
              <Link
                to="#"
                onClick={() => setCurDash("AI Questions")}
                className={`relative overflow-hidden rounded-md px-3 py-1 group ${
                  curDash === "AI Questions" ? "font-bold" : "text-muted-foreground"
                }`}
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <User className="h-5 w-5" />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>{userName || "Loading..."}</DropdownMenuItem>
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

      <main className="p-4">
        {/* Render the current dashboard content */}
        {renderCurrentTab()}
      </main>
    </div>
  );
}
