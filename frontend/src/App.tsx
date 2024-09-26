import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./Pages/Landing";
import NavWrapper from "./wrapper/NavWrapper";
import CLogin from "./Pages/CandidateLogin";
import Register from "./Pages/Register";
import UsersList from "./Pages/displaylist";
import { Toaster } from "./components/ui/sonner";
import { RecruiterDashboard} from "./Pages/Dashboard/recruiter";
import { CandidateDashboard } from "./Pages/Dashboard/candidate";
import JobPostingForm from "./components/admin_dashboard/createpost";
import RLogin from "./Pages/RecruiterLogin";


function App() {
  return (
    <BrowserRouter>
      <Toaster position="bottom-right" />
      <Routes>
        <Route path="/" element={
          <NavWrapper>
            <Landing />
          </NavWrapper>
        } />
        <Route path="/auth/candidate" element={<CLogin/>}/>
        <Route path="/auth/list" element={<UsersList/>}/>
        <Route path="/auth/register" element={<Register />} />
        <Route path="/auth/recruiter" element={<RLogin />} />
        <Route path="/recruiter/createpost" element={<JobPostingForm />} />
        
        <Route path="/admin" element={
          <>
          
          <RecruiterDashboard />
          </>
            
        } />
        <Route path="/candidate" element={
          <>
          
          <CandidateDashboard />
          </>
            
        } />
        
       
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
