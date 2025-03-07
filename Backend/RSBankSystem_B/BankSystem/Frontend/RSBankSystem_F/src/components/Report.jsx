import React, { useState } from "react";
import axios from "axios";
import "../styles/Report.css"; // Make sure you have corresponding styles

const Report = () => {
  const [circularNumber, setCircularNumber] = useState("");
  const [circularDate, setCircularDate] = useState("");
  const [circularType, setCircularType] = useState("");
  const [otherType, setOtherType] = useState("");
  const [file, setFile] = useState(null);
  const [storeInDatabase, setStoreInDatabase] = useState(true); // Default to true

  const handleUpload = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("circularNumber", circularNumber);
    formData.append("circularDate", circularDate);
    formData.append("circularType", circularType === "Other" ? otherType : circularType);
    formData.append("file", file);
    formData.append("storeInDatabase", storeInDatabase); // Include the storeInDatabase parameter

    try {
      await axios.post("http://localhost:8080/api/files/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("📤 File uploaded successfully.");
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("⚠️ Error uploading file.");
    }
  };

  return (
    <div className="report-container">
      <h2>📄 Upload a Circular</h2>
      <form onSubmit={handleUpload}>
        <label>Circular Number:</label>
        <input
          type="text"
          placeholder="Enter Circular Number"
          value={circularNumber}
          onChange={(e) => setCircularNumber(e.target.value)}
          required
        />

        <label>📅 Circular Date:</label>
        <input
          type="date"
          value={circularDate}
          onChange={(e) => setCircularDate(e.target.value)}
          max={new Date().toISOString().split("T")[0]} // Restrict to today's date
          required
        />

        <label>Circular Type:</label>
        <select
          value={circularType}
          onChange={(e) => setCircularType(e.target.value)}
          required
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

        {circularType === "Other" && (
          <input
            type="text"
            placeholder="Please specify the type"
            value={otherType}
            onChange={(e) => setOtherType(e.target.value)}
            required
          />
        )}

        <label>📁 Choose a File:</label>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          required
        />

        <label className="report-checkbox">
          <input
            type="checkbox"
            checked={storeInDatabase}
            onChange={(e) => setStoreInDatabase(e.target.checked)}
          />
          Store in Database
        </label>

        <button type="submit">📤 Upload</button>
      </form>
    </div>
  );
};

export default Report;



// import React, { useState } from "react";
// import axios from "axios";
// import "../styles/Report.css";

// const Report = () => {
//   const [file, setFile] = useState(null);
//   const [storeInDatabase, setStoreInDatabase] = useState(true);
//   const [message, setMessage] = useState("");

//   const handleFileChange = (event) => {
//     setFile(event.target.files[0]);
//   };

//   const handleUpload = async () => {
//     if (!file) {
//       setMessage("Please select a file.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("storeInDatabase", storeInDatabase);

//     try {
//       const response = await axios.post(
//         "http://localhost:8080/api/files/upload",
//         formData,
//         { headers: { "Content-Type": "multipart/form-data" } }
//       );
//       setMessage(response.data);
//       alert("File upload successfully.");
//     } catch (error) {
//         alert("File upload failed.");
//       setMessage("File upload failed.");
//     }
//   };

//   return (
//     <div className="report-container">
//       <h2>Upload a File</h2>
      
//       {/* Custom File Input */}
//       <label htmlFor="file-upload" className="report-file-upload">
//         {file ? file.name : "Choose a File"}
//       </label>
//       <input id="file-upload" type="file" onChange={handleFileChange} />

//       <label className="report-checkbox">
//         <input
//           type="checkbox"
//           checked={storeInDatabase}
//           onChange={() => setStoreInDatabase(!storeInDatabase)}
//         />
//         Store in Database
//       </label>

//       <button className="report-button" onClick={handleUpload}>Upload</button>
//       {message && <p className="report-message">{message}</p>}
//     </div>
//   );
// };

// export default Report;
