import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Register.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [department, setDepartment] = useState("");
  const [branch, setBranch] = useState("");
  const [role, setRole] = useState(""); // Default role is 'user'
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/auth/register", {
        name,
        email,
        password,
        department,
        branch,
        role,
      });
      alert("Registration Successful! Please login.");
      navigate("/login");
    } catch (error) {
      alert("Registration Failed");
    }
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">Register</h2>
      <form className="auth-form" onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Name"
          className="auth-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
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
        <input
          type="text"
          placeholder="Department"
          className="auth-input"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          required
        />
        
        <select
          className="auth-input"
          value={branch}
          onChange={(e) => setBranch(e.target.value)}
          required
        >
          <option value="">Select Branch</option>
          <option value="1 TILAK CHOWK">1 TILAK CHOWK</option>
          <option value="2 BAJARPETH">2 BAJARPETH</option>
          <option value="3 CHAKAN">3 CHAKAN</option>
          <option value="4 KADUS">4 KADUS</option>
          <option value="5 NARAYANGAON">5 NARAYANGAON</option>
          <option value="6 BHOSARI">6 BHOSARI</option>
          <option value="7 DEHU ROAD">7 DEHU ROAD</option>
          <option value="8 BUDHAWARPETH">8 BUDHAWARPETH</option>
          <option value="9 MANCHAR">9 MANCHAR</option>
          <option value="10 SHIRUR">10 SHIRUR</option>
          <option value="11 MAHALUNGE">11 MAHALUNGE</option>
          <option value="12 ALEPHATA">12 ALEPHATA</option>
          <option value="13 ALANDI">13 ALANDI</option>
          <option value="14 JUNNAR">14 JUNNAR</option>
          <option value="15 PAIT">15 PAIT</option>
          <option value="16 PABAL">16 PABAL</option>
          <option value="17 AKURDI">17 AKURDI</option>
          <option value="99 HEAD OFFICE">99 HEAD OFFICE</option>
        </select>

        <select
          className="auth-input"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
        >
          <option value="admin">Admin</option>
          <option value="dept_user">Department User</option>
        </select>
        <button type="submit" className="auth-button">Register</button>
      </form>
      <a href="/login" className="auth-link">Already have an account? Login</a>
    </div>
  );
};

export default Register;
