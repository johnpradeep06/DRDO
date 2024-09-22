import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./Pages/Landing";
import NavWrapper from "./wrapper/NavWrapper";
import CLogin from "./Pages/CandidateLogin";
import Register from "./Pages/Register";
import UsersList from "./Pages/displaylist";
import { Toaster } from "./components/ui/sonner";
import { RecruiterDashboard} from "./Pages/Dashboard/Admin/recruiter";
import { CandidateDashboard } from "./Pages/Dashboard/Admin/CandidateDashboard";

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
