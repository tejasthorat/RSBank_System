import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Home.css";

const Home = () => {
  const [files, setFiles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchCircularType, setSearchCircularType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const filesPerPage = 10;
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/files/all");
      const sortedFiles = response.data.sort(
        (a, b) => new Date(b.circularDate) - new Date(a.circularDate)
      );
      setFiles(sortedFiles);
    } catch (error) {
      console.error("Error fetching files:", error);
      alert("⚠️ Error fetching files.");
    }
  };

  const handleSearch = async () => {
    try {
      const params = new URLSearchParams();
      if (searchQuery.trim() !== "") params.append("title", searchQuery);
      // if (searchQuery.trim() !== "") {
      //   params.append("title", searchQuery);             // Pass searchQuery as title
      //   params.append("circularNumber", searchQuery);    // Pass searchQuery as circularNumber
      // }
      if (fromDate !== "") params.append("fromDate", fromDate);
      if (toDate !== "") params.append("toDate", toDate);

      // Add conditions for "Other"
      if (searchCircularType === "Other") {
        params.append("excludeTypes", ["Loan", "Account", "Admin", "Audit","Computer", "RBI","NPCI"].join(","));
      } else if (searchCircularType) {
        params.append("circularType", searchCircularType);
      }

      const response = await axios.get(
        `http://localhost:8080/api/files/search?${params.toString()}`
      );
      const sortedFiles = response.data.sort(
        (a, b) => new Date(b.circularDate) - new Date(a.circularDate)
      );
      setFiles(sortedFiles);
      setCurrentPage(1);
    } catch (error) {
      console.error("Error searching files:", error);
      alert("⚠️ Error searching files.");
    }
  };

  const handleViewFile = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/files/view/${id}`, {
        responseType: "blob",
      });
      const fileURL = URL.createObjectURL(new Blob([response.data], { type: "application/pdf" }));
      window.open(fileURL, "_blank");
    } catch (error) {
      console.error("Error opening file:", error);
      alert("⚠️ Error opening file.");
    }
  };

  const removeFileExtension = (filename) => filename.replace(/\.[^/.]+$/, "");

  const indexOfLastFile = currentPage * filesPerPage;
  const indexOfFirstFile = indexOfLastFile - filesPerPage;
  const currentFiles = files.slice(indexOfFirstFile, indexOfLastFile);

  return (
    <div className="home-container">
      <h2 className="home-title">📜Circulars</h2>

      {/* 🔍 Search Bar */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <div className="date-range-container">
          <label>From Date: </label>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            max={new Date().toISOString().split("T")[0]} // Restrict to today's date
          />

          <span className="date-separator">:</span>

          <label>To Date: </label>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            max={new Date().toISOString().split("T")[0]} // Restrict to today's date
          />
        </div>

        <select
          className="circular-type-select"
          value={searchCircularType}
          onChange={(e) => setSearchCircularType(e.target.value)}
        >
          <option value="">Select Type</option>
          <option value="Loan">Loan</option>
          <option value="Account">Account</option>
          <option value="Admin">Admin</option>
          <option value="Audit">Audit</option>
          <option value="Computer">Computer</option>
          <option value="RBI">RBI</option>
          <option value="NPCI">NPCI</option>
          <option value="Other">Other</option>
        </select>
        <button onClick={handleSearch}>🔍 Search</button>
      </div>

      {/* 📂 File Table */}
      {currentFiles.length === 0 ? (
        <p className="home-content">⚠️ No files found.</p>
      ) : (
        <table className="home-table">
          <thead>
            <tr>
              <th>Sr. No</th>
              <th>Circular Number</th>
              <th>Title</th>
              <th>Circular Date</th>
              <th>Circular Type</th>
            </tr>
          </thead>
          <tbody>
            {currentFiles.map((file, index) => (
              <tr key={file.id}>
                <td>{indexOfFirstFile + index + 1}</td>
                <td>{file.circularNumber || "N/A"}</td>
                <td>
                  <button className="file-title" onClick={() => handleViewFile(file.id)}>
                    {removeFileExtension(file.title)}
                  </button>
                </td>
                <td>{new Date(file.circularDate).toISOString().split("T")[0]}</td>
                <td>{file.circularType || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* ⏩ Pagination Controls */}
      <div className="pagination">
        <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {Math.ceil(files.length / filesPerPage)}
        </span>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === Math.ceil(files.length / filesPerPage)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;


/*
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Home.css"; // Import the CSS file

const Home = () => {
  const [files, setFiles] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchDate, setSearchDate] = useState("");

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/files/all");
      setFiles(response.data);
      console.log(response.data);
    } catch (error) {
      alert("Error fetching files:", error);
      console.error("Error fetching files:", error);
    }
  };

  const handleViewFile = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/files/view/${id}`, {
        responseType: "blob", // Important for binary data
      });
      console.log("Response:", response);
      const fileURL = URL.createObjectURL(new Blob([response.data], { type: "application/pdf" }));
      window.open(fileURL, "_blank"); // Open file in a new tab
    } catch (error) {
      alert("Error opening file:", error);
      console.error("Error opening file:", error);
    }
  };

  const handleSearch = async () => {
    try {
      const title = searchTitle ? searchTitle : "all";
      const date = searchDate ? searchDate : "all";
      const response = await axios.get(`http://localhost:8080/api/files/search/${encodeURIComponent(title)}/${date}`);
      setFiles(response.data);
      console.log(response.data);
    } catch (error) {
      alert("Error searching files:", error.message);
      console.error("Error searching files:", error);
    }
  };

  // const formatDate = (dateString) => {
  //   if (!dateString) return "Invalid Date"; // Handle null/undefined values
  
  //   // Split the date manually (assuming format yyyy-MM-dd)
  //   const [year, month, day] = dateString.split("-");
    
  //   if (!year || !month || !day) return "Invalid Date"; // Ensure valid format
    
  //   return `${day}-${month}-${year}`; // Format as dd-MM-yyyy
  // };
  
  const formatDate = (dateString) => {
    if (!dateString) return "Invalid Date"; // Handle null/undefined values

    // Ensure the date is correctly formatted
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Invalid Date"; // Handle invalid dates

    // Format the date as yyyy-MM-dd
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Ensure 2-digit month
    const day = String(date.getDate()).padStart(2, "0"); // Ensure 2-digit day

    return `${year}-${month}-${day}`;
};

  return (
    <div className="home-container">
      <h2 className="home-title">Latest Circulars</h2>
      
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by Title"
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
        />
        <input
          type="date"
          placeholder="Search by Date"
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {files.length === 0 ? (
        <p className="home-content">No files available.</p>
      ) : (
        <table className="home-table">
          <thead>
            <tr>
              <th>Sr. No</th>
              <th>Title</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {files.map((file, index) => (
              <tr key={file.id}>
                <td className="file-title">{index+1}</td>
                <td>
                  <button className="file-title" onClick={() => handleViewFile(file.id)}>
                    {file.title}
                  </button>
                </td>
                <td className="file-title">{formatDate(file.date)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Home;
*/