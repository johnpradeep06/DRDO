import { BrowserRouter, Routes, Route } from "react-router-dom"
import Landing from "./Pages/Landing"
import NavWrapper from "./wrapper/NavWrapper";
import Login from "./Pages/Login";
import ToggleModeWrapper from "./wrapper/ToggleModeWrapper";
import Register from "./Pages/Register";
import NotFound from "./Pages/NotFound";
import { Toaster } from "./components/ui/sonner";

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
        <Route path="/auth/login" element={
          <ToggleModeWrapper>
            <Login />
          </ToggleModeWrapper>
        } />
        <Route path="/auth/register" element={
          <ToggleModeWrapper>
            <Register />
          </ToggleModeWrapper>
        } />
        <Route path="/home" />
        <Route path="/about-us" />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
