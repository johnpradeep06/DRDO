import { BrowserRouter, Routes, Route } from "react-router-dom"
import Landing from "./Pages/Landing"
import NavWrapper from "./wrapper/NavWrapper";
import Login from "./Pages/Login";
import ToggleModeWrapper from "./wrapper/ToggleModeWrapper";

function App() {

  return (
    <BrowserRouter>
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
        <Route path="/auth/register" />
        <Route path="/home" />
        <Route path="/about-us" />
        <Route />
      </Routes>
    </BrowserRouter>
  )
}

export default App
