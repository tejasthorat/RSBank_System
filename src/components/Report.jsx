import React, { useState } from "react";
import axios from "axios";
import "../styles/Report.css"; // Make sure you have corresponding styles

const Report = () => {
  const [fileType, setFileType] = useState(""); // Dropdown selection for file type
  const [circularNumber, setCircularNumber] = useState("");
  const [circularDate, setCircularDate] = useState("");
  const [circularType, setCircularType] = useState("");
  const [otherType, setOtherType] = useState("");
  const [policyName, setPolicyName] = useState("");
  const [policyType, setPolicyType] = useState("");
  const [policyDate, setPolicyDate] = useState("");
  const [manualName, setManualName] = useState("");
  const [manualType, setManualType] = useState("");
  const [manualDate, setManualDate] = useState("");
  const [file, setFile] = useState(null);
  const [storeInDatabase, setStoreInDatabase] = useState(true); // Default to true

  const handleUpload = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append("fileType", fileType);
  
    if (fileType === "Circular") {
      formData.append("circularNumber", circularNumber);
      formData.append("circularDate", circularDate);
      formData.append("circularType", circularType === "Other" ? otherType : circularType);
    } else if (fileType === "Policy") {
      formData.append("policyName", policyName);
      formData.append("policyType", policyType === "Other" ? otherType : policyType);
      formData.append("policyDate", policyDate);
    } else if (fileType === "Manual") {
      formData.append("manualName", manualName);
      formData.append("manualType", manualType === "Other" ? otherType : manualType);
      formData.append("manualDate", manualDate);
    }
  
    formData.append("file", file);
    formData.append("storeInDatabase", storeInDatabase);
  
    // ✅ Log FormData values
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }
  
    try {
      await axios.post("http://localhost:8080/api/files/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("📤 File uploaded successfully.");
    } catch (error) {
      console.error("Error uploading file:", error.response?.data || error.message);
      alert("⚠️ Error uploading file.");
    }
  };
  

  return (
    <div className="report-container">
      <h2>📄 Upload a File</h2>

      {/* Dropdown to Select File Type */}
      <label>Select File Type:</label>
      <select value={fileType} onChange={(e) => setFileType(e.target.value)} required>
        <option value="">Select File Type</option>
        <option value="Circular">Circular</option>
        <option value="Policy">Policy</option>
        <option value="Manual">Manual</option>
      </select>

      {/* Form for Circular Upload */}
      {fileType === "Circular" && (
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
          <select value={circularType} onChange={(e) => setCircularType(e.target.value)} required>
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
          <input type="file" onChange={(e) => setFile(e.target.files[0])} required />

          <label className="report-checkbox">
            <input type="checkbox" checked={storeInDatabase} onChange={(e) => setStoreInDatabase(e.target.checked)} />
            Store in Database
          </label>

          <button type="submit">📤 Upload</button>
        </form>
      )}

      {/* Form for Policy Upload */}
      {fileType === "Policy" && (
        <form onSubmit={handleUpload}>
          <label>Policy Name:</label>
          <input
            type="text"
            placeholder="Enter Policy Name"
            value={policyName}
            onChange={(e) => setPolicyName(e.target.value)}
            required
          />

          <label>📅 Policy Date:</label>
          <input
            type="date"
            value={policyDate}
            onChange={(e) => setPolicyDate(e.target.value)}
            max={new Date().toISOString().split("T")[0]} 
            required
          />

          <label>Policy Type:</label>
          <select value={policyType} onChange={(e) => setPolicyType(e.target.value)} required>
            <option value="">Select Type</option>
            <option value="Loan">Loan</option>
            <option value="Account">Account</option>
            <option value="Recovery">Recovery</option>
            <option value="Mobile Banking">Mobile Banking</option>
            <option value="Other">Other</option>
          </select>

          {policyType === "Other" && (
            <input
              type="text"
              placeholder="Please specify the type"
              value={otherType}
              onChange={(e) => setOtherType(e.target.value)}
              required
            />
          )}

          <label>📁 Choose a File:</label>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} required />

          <label className="report-checkbox">
            <input type="checkbox" checked={storeInDatabase} onChange={(e) => setStoreInDatabase(e.target.checked)} />
            Store in Database
          </label>

          <button type="submit">📤 Upload</button>
        </form>
      )}

      {/* Form for Manual Upload */}
      {fileType === "Manual" && (
        <form onSubmit={handleUpload}>
          <label>Manual Name:</label>
          <input
            type="text"
            placeholder="Enter Manual Name"
            value={manualName}
            onChange={(e) => setManualName(e.target.value)}
            required
          />

          <label>📅 Manual Date:</label>
          <input
            type="date"
            value={manualDate}
            onChange={(e) => setManualDate(e.target.value)}
            max={new Date().toISOString().split("T")[0]} 
            required
          />

          <label>Manual Type:</label>
          <select value={manualType} onChange={(e) => setManualType(e.target.value)} required>
            <option value="">Select Type</option>
            <option value="Loan">Loan</option>
            <option value="Account">Account</option>
            <option value="Recovery">Recovery</option>
            <option value="Mobile Banking">Mobile Banking</option>
            <option value="Other">Other</option>
          </select>

          {manualType === "Other" && (
            <input
              type="text"
              placeholder="Please specify the type"
              value={otherType}
              onChange={(e) => setOtherType(e.target.value)}
              required
            />
          )}

          <label>📁 Choose a File:</label>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} required />

          <button type="submit">📤 Upload</button>
        </form>
      )}
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
