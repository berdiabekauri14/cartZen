import { Route, Routes } from "react-router";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import About from "./pages/About";
import Signup from "./pages/Signup";
import Login from "./pages/Login";


export default function App() {
  return (
    <>
      <Nav />
      <br />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/signUp" element={<Signup />} />
        <Route path="/logIn" element={<Login />} />
      </Routes>
      <br />
      <footer>
        <p>©2025 Berdia bekauri</p>
      </footer>
    </>
  )
}