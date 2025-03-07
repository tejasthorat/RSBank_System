import React from "react";

const Manual = () => {
  // Dummy data for manuals
  const manuals = [
    { name: "UPI User Guide", type: "UPI", date: "2024-01-20" },
    { name: "ATM Usage Guide", type: "ATM", date: "2024-01-25" },
    { name: "POS Transaction Guide", type: "POS", date: "2024-01-30" },
  ];

  return (
    <div className="home-container">
      <h2 className="home-title">Manuals</h2>

      <table className="home-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {manuals.map((manual, index) => (
            <tr key={index}>
              <td>{manual.name}</td>
              <td>{manual.type}</td>
              <td>{manual.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Manual;
