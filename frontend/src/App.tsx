import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./Pages/Landing";
import NavWrapper from "./wrapper/NavWrapper";
import Login from "./Pages/Login";
import AdminLogin from './Pages/Adminlogin';
import CandidateLogin from "./Pages/CandidateLogin";
import ScientistLogin from "./Pages/ScientistLogin";
import Register from "./Pages/Register";
import { Toaster } from "./components/ui/sonner";
import {Header} from "./components/Layout/Header";
import { Dashboard} from "./Pages/Dashboard/Dashboard";

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
        <Route path="/auth/Admin" element={<AdminLogin />} />
        <Route path="/auth/Candidate" element={<CandidateLogin />} />
        <Route path="/auth/Scientist" element={<ScientistLogin />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/home" element={
          <>
          <Header/>
          <Dashboard />
          </>
            
        } />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
