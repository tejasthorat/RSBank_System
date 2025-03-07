import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/UserManagement.css";

const UserManagement = ({ isRootUser }) => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    name: "",
    userId:"",
    password: "",
    email: "",
    department: "",
    branch: "",
    role: "dept_user", // Default to dept_user
  });
  const [showModal, setShowModal] = useState(false); // Control add-user modal visibility
  const [editUser, setEditUser] = useState(null); // Track user being edited
  const [updatedRole, setUpdatedRole] = useState(""); // Track updated role for editing

  const branches = [
    "1 TILAK CHOWK", "2 BAJARPETH", "3 CHAKAN", "4 KADUS",
    "5 NARAYANGAON", "6 BHOSARI", "7 DEHU ROAD", "8 BUDHAWARPETH",
    "9 MANCHAR", "10 SHIRUR", "11 MAHALUNGE", "12 ALEPHATA",
    "13 ALANDI", "14 JUNNAR", "15 PAIT", "16 PABAL", "17 AKURDI", "99 HEAD OFFICE"
  ];

  useEffect(() => {
    fetchUsers();
  }, []);

  // Fetch users from the backend
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/auth/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      alert("⚠️ Error fetching users.");
    }
  };

  // Add a new user
  const handleAddUser = async () => {
    try {
      await axios.post("http://localhost:8080/api/auth/register", newUser);
      fetchUsers();
      setNewUser({ name: "", password: "", email: "", department: "", branch: "", role: "dept_user" });
      setShowModal(false);
      alert("User added successfully!");
    } catch (error) {
      console.error("Error adding user:", error);
      alert("⚠️ Error adding user.");
    }
  };

  // Handle user update (updated to handle all fields)
  const handleUpdateUser = async () => {
    try {
      console.log(`Updating user ${editUser.userId} with new details`);
      
      // Send all updated user fields (name, email, department, branch, role, password, etc.)
      await axios.put(`http://localhost:8080/api/auth/updateUser/${editUser.userId}`, editUser);
      
      // Refresh the user list
      fetchUsers();
      
      // Close the modal
      setEditUser(null);
      
      // Notify the user
      alert("User updated successfully!");
    } catch (error) {
      console.error("Error updating user:", error);
      alert("⚠️ Error updating user.");
    }
  };

  
  

  // Handle input changes for new user
  const handleInputChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  return (
    <div className="user-management-container">
      <h2>User Management</h2>

      {/* Add New User Button */}
      {isRootUser && (
        <button onClick={() => setShowModal(true)} className="add-user-button">
          Add New User
        </button>
      )}

      {/* Modal for Adding New User */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Register New User</h3>
            <input type="text" name="name" placeholder="Name" value={newUser.name} onChange={handleInputChange} required />
            <input type="text" name="userId" placeholder="UserId" value={newUser.userId} onChange={handleInputChange} required />
            <input type="email" name="email" placeholder="Email" value={newUser.email} onChange={handleInputChange} required />
            <input type="password" name="password" placeholder="Password" value={newUser.password} onChange={handleInputChange} required />
            <input type="text" name="department" placeholder="Department" value={newUser.department} onChange={handleInputChange} required />
            <select name="branch" value={newUser.branch} onChange={handleInputChange} required>
              <option value="" disabled>Select Branch</option>
              {branches.map((branch, index) => (
                <option key={index} value={branch}>{branch}</option>
              ))}
            </select>
            <select name="role" value={newUser.role} onChange={handleInputChange} required>
              <option value="dept_user">Department User</option>
              <option value="admin">Admin</option>
            </select>
            <div className="modal-actions">
              <button onClick={handleAddUser}>Register</button>
              <button onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* User List Table */}
      <table className="user-table">
        <thead>
          <tr>
            <th>UserId</th>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Branch</th>
            <th>Role</th>
            {isRootUser && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.userId}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.department}</td>
              <td>{user.branch}</td>
              <td>{user.role}</td>
              {isRootUser && (
                <td>
                  <button
                    onClick={() => {
                      setEditUser(user);
                      setUpdatedRole(user.role);
                    }}
                    className="edit-role-button"
                  >
                    Edit 
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for Editing User */}
      {editUser && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Edit User Information for {editUser.name}</h3>
            <input
              type="text"
              name="name"
              value={editUser.name}
              onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
              required
            />
            <input
              type="text"
              name="userId"
              value={editUser.userId}
              onChange={(e) => setEditUser({ ...editUser, userId: e.target.value })}
              required
            />
            <input
              type="email"
              name="email"
              value={editUser.email}
              onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
              required
            />
            <input
              type="password"
              name="password"
              value={editUser.password}
              onChange={(e) => setEditUser({ ...editUser, password: e.target.value })}
              required
            />
            <input
              type="text"
              name="department"
              value={editUser.department}
              onChange={(e) => setEditUser({ ...editUser, department: e.target.value })}
              required
            />
            <select
              name="branch"
              value={editUser.branch}
              onChange={(e) => setEditUser({ ...editUser, branch: e.target.value })}
              required
            >
              <option value="" disabled>Select Branch</option>
              {branches.map((branch, index) => (
                <option key={index} value={branch}>{branch}</option>
              ))}
            </select>
            <select
              name="role"
              value={editUser.role}
              onChange={(e) => setEditUser({ ...editUser, role: e.target.value })}
              required
            >
              <option value="dept_user">Department User</option>
              <option value="admin">Admin</option>
            </select>
            <div className="modal-actions">
              {/* Use handleUpdateUser instead of handleUpdateRole */}
              <button onClick={handleUpdateUser}>Update User</button>
              <button onClick={() => setEditUser(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}


    </div>
  );
};

export default UserManagement;
