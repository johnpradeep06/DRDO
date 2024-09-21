import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./Pages/Landing";
import NavWrapper from "./wrapper/NavWrapper";

import Register from "./Pages/Register";
import UsersList from "./Pages/displaylist";
import { Toaster } from "./components/ui/sonner";
import {A_Header} from "./components/Layout/Header/AdminHeader";
import { A_Dashboard} from "./Pages/Dashboard/Admin/Admin";

import Login from "./Pages/RecruiterLogin";


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
        <Route path="/auth/list" element={<UsersList/>}/>
        <Route path="/auth/register" element={<Register />} />
        <Route path="/auth/recruiter" element={<Login />} />

        <Route path="/admin" element={
          <>
          <A_Header/>
          <A_Dashboard />
          </>
            
        } />
        
       
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
