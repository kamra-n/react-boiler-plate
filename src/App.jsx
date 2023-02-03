import { Routes, Route } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Home from "./Pages/Home/Home";
import Profile from "./Pages/Profile/Profile";
import { Protected } from "./Protected";
export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Protected Cmp={Home} />} />
        <Route path="login" element={<Login />} />
        <Route path="profile" element={<Protected Cmp={Profile} />} />

        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </>

  )
}