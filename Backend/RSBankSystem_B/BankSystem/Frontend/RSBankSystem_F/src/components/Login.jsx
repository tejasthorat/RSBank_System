import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/auth/login", {
        email,
        password,
      });
  
      if (response.data.success) { 
        localStorage.setItem("user", JSON.stringify(response.data.user)); // Save user details including role
        navigate("/");
      } else {
        setError("Invalid email or password");
      }
    } catch (error) {
      setError("Error logging in. Please try again.");
    }
  };
  
  

  return (
    <div className="auth-container">
      <h2 className="auth-title">Login</h2>
      {error && <p className="auth-error">{error}</p>}
      <form className="auth-form" onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          className="auth-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="auth-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="auth-button">Login</button>
      </form>
      <a href="/register" className="auth-link">Don't have an account? Register</a>
    </div>
  );
};

export default Login;

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "../styles/Login.css";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post("http://localhost:8080/api/auth/login", {
//         email,
//         password,
//       });
  
//       if (response.data.success) { 
//         localStorage.setItem("user", JSON.stringify(response.data.user)); // Save user details including role
//         navigate("/");
//       } else {
//         setError("Invalid email or password");
//       }
//     } catch (error) {
//       setError("Error logging in. Please try again.");
//     }
//   };
  
  

//   return (
//     <div className="auth-container">
//       <h2 className="auth-title">Login</h2>
//       {error && <p className="auth-error">{error}</p>}
//       <form className="auth-form" onSubmit={handleLogin}>
//         <input
//           type="email"
//           placeholder="Email"
//           className="auth-input"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           className="auth-input"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <button type="submit" className="auth-button">Login</button>
//       </form>
//       <a href="/register" className="auth-link">Don't have an account? Register</a>
//     </div>
//   );
// };

// export default Login;
