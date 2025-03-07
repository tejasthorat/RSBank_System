import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/Header.css"; // Import the CSS file

const Header = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [showHelpDropdown, setShowHelpDropdown] = useState(false);
  const [showViewDropdown, setShowViewDropdown] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const userRole = user?.role || "dept_user"; // Default to "dept_user" if role is not set

  return (
    <nav className="navbar">
      {/* Logo and name container */}
      <div className="logo-container">
        <img
          src="/title.png" // Replace with the actual path
          alt="Bank Logo"
          className="logo-image"
        />
      </div>

      <div className="nav-links">
        <NavLink to="/" className="link">Home</NavLink>

        {user ? (
          <>
          
            {/* View Dropdown (Policy & Manual) */}
            <div
              className="dropdown-container"
              onMouseEnter={() => setShowViewDropdown(true)}
              onMouseLeave={() => setShowViewDropdown(false)}
            >
              <span className="link">View &#9662;</span>
              {showViewDropdown && (
                <div className="dropdown">
                  <NavLink to="/policy" className="dropdown-link">Policy</NavLink>
                  <NavLink to="/manual" className="dropdown-link">Manual</NavLink>
                </div>
              )}
            </div>
            
            {/* Help Dropdown */}
            <div
              className="dropdown-container"
              onMouseEnter={() => setShowHelpDropdown(true)}
              onMouseLeave={() => setShowHelpDropdown(false)}
            >
              <span className="link">Help &#9662;</span>
              {showHelpDropdown && (
                <div className="dropdown">
                  <NavLink to="/about" className="dropdown-link">Our Team</NavLink>
                  <NavLink to="/about" className="dropdown-link">Bank Info</NavLink>
                </div>
              )}
            </div>

            {userRole === "admin" ? (
              <NavLink to="/user-management" className="link">User</NavLink>
            ) : (
              <span className="link disabled">User</span>
            )}

            {userRole === "admin" ? (
              <NavLink to="/report" className="link">Reports</NavLink>
            ) : (
              <span className="link disabled">Reports</span>
            )}

            <button onClick={handleLogout} className="button">Logout</button>
          </>
        ) : (
          <NavLink to="/login" className="link">Login/Register</NavLink>
        )}
      </div>
    </nav>
  );
};

export default Header;
