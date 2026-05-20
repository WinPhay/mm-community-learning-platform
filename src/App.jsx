import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Course from "./pages/Course"
import Login from "./pages/Login"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/course/:id" element={<Course />} />
    </Routes>
  )
}
