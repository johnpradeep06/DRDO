import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./Pages/Landing";
import NavWrapper from "./wrapper/NavWrapper";
import Login from "./Pages/Login";
import AdminLogin from './Pages/Adminlogin';
import CandidateLogin from "./Pages/CandidateLogin";
import ScientistLogin from "./Pages/ScientistLogin";
import Register from "./Pages/Register";
import { Toaster } from "./components/ui/sonner";
import {A_Header} from "./components/Layout/Header/AdminHeader";
import { A_Dashboard} from "./Pages/Dashboard/Admin/Admin";
import { C_Dashboard} from "./Pages/Dashboard/Admin/Candidate";
import { S_Dashboard} from "./Pages/Dashboard/Admin/Scientist";
import {C_Header} from "./components/Layout/Header/CandidateHeader";
import {S_Header} from "./components/Layout/Header/ScientistHeader";

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
        <Route path="/admin" element={
          <>
          <A_Header/>
          <A_Dashboard />
          </>
            
        } />
        <Route path="/candidate" element={
          <>
          <C_Header/>
          <C_Dashboard />
          </>
            
        } />
        <Route path="/scientist" element={
          <>
          <S_Header/>
          <S_Dashboard />
          </>
            
        } />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
