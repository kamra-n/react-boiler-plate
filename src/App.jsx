import { Routes, Route } from "react-router-dom";
export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<h1 className="bg-neutral-900 text-red-600">
          Hello world!
        </h1>} />

        <Route path="login" element={<h1>Login</h1>} />

        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </>

  )
}