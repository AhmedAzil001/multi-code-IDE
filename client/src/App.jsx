import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Editor from "./pages/Editor";
import ErrorPage from "./pages/ErrorPage";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/login"} element={<Login />} />
          <Route path={"/signup"} element={<SignUp />} />
          <Route path={"/editor/:id"} element={<Editor />} />
          <Route path={"/dashboard"} element={<Dashboard />} />
          <Route path={"*"} element={<ErrorPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
