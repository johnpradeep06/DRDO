import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./Pages/Landing";
import NavWrapper from "./wrapper/NavWrapper";
import Login from "./Pages/Login";
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
        <Route path="/auth/login" element={<Login />} />
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
