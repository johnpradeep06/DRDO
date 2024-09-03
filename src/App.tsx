import { BrowserRouter, Routes, Route } from "react-router-dom"
import Landing from "./Pages/Landing"
import Navbar from "@/components/navbar";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <div>
            <Navbar />
            <Landing />
          </div>
        } />
        <Route path="/home" />
        <Route path="/auth" element={<AuthRoutes />} />
        <Route path="/about-us" />
        <Route />
      </Routes>
    </BrowserRouter>
  )
}

const AuthRoutes = ()=>(
  <Routes>
    <Route path="/" />
    <Route path="/login" />
    <Route path="/register" />
  </Routes>
)

export default App
