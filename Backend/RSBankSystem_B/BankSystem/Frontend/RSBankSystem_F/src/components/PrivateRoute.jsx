import { Navigate } from "react-router-dom";

// PrivateRoute component
const PrivateRoute = ({ element }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  
  // If user is not logged in, redirect to the login page
  if (!user) {
    return <Navigate to="/login" />;
  }

  // If user is logged in, render the protected element
  return element;
};

export default PrivateRoute;
