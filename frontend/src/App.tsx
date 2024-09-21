import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./Pages/Landing";
import NavWrapper from "./wrapper/NavWrapper";

import Register from "./Pages/Register";
import UsersList from "./Pages/displaylist";
import { Toaster } from "./components/ui/sonner";
import { Dashboard} from "./Pages/Dashboard/Admin/recruiter";

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
          
          <Dashboard />
          </>
            
        } />
        
       
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
