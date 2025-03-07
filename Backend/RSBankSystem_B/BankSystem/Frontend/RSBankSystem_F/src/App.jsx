import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import About from "./components/About";
import UserManagement from "./components/UserManagement";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import Report from "./components/Report";
import Home from './components/Home';

function App() {
  // Retrieve the user data from localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const userRole = user?.role || "dept_user"; // Default role is "dept_user"
  const isRootUser = userRole === "admin"; // Determine if the user is a admin user

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* Wrap protected routes inside PrivateRoute */}
          <Route path="/" element={<PrivateRoute element={<Home />} />} />
          <Route path="/about" element={<PrivateRoute element={<About />} />} />

          {/* Conditionally render User Management based on user role */}
          <Route path="/user-management" element={<PrivateRoute element={<UserManagement isRootUser={isRootUser} />} />} />

          <Route path="/report" element={<PrivateRoute element={<Report />} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
