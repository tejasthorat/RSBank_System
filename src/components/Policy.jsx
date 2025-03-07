import React, { useState } from "react";
import "../styles/Policy.css"; // CSS File

const Policy = () => {
  const [policies] = useState([
    { id: 1, name: "Policy Guidelines", type: "Policy", date: "2025-03-01" },
    { id: 2, name: "Employee Manual", type: "Manual", date: "2025-12-15" },
    { id: 3, name: "Leave Policy", type: "Policy", date: "2025-02-10" },
    { id: 4, name: "Office Policy", type: "Policy", date: "2024-07-20" },
  ]);

  const [filterYear, setFilterYear] = useState("");

  const isWithinFinancialYear = (date, yearRange) => {
    const policyDate = new Date(date);
    let start, end;

    switch (yearRange) {
      case "2024-2025":
        start = new Date("2024-04-01");
        end = new Date("2025-03-31");
        break;
      case "2025-2026":
        start = new Date("2025-04-01");
        end = new Date("2026-03-31");
        break;
      case "2026-2027":
        start = new Date("2026-04-01");
        end = new Date("2027-03-31");
        break;
      default:
        return true;
    }

    return policyDate >= start && policyDate <= end;
  };

  const filteredPolicies = policies.filter((policy) => {
    if (filterYear === "") {
      return true;
    }
    return isWithinFinancialYear(policy.date, filterYear);
  });

  return (
    <div className="policy-container">
      <h2 className="policy-title">📄 Policy Documents</h2>

      <div className="search-container">
        <select
          className="circular-type-select"
          value={filterYear}
          onChange={(e) => setFilterYear(e.target.value)}
        >
          <option value="">All Years</option>
          <option value="2024-2025">2024-2025</option>
          <option value="2025-2026">2025-2026</option>
          <option value="2026-2027">2026-2027</option>
        </select>
      </div>

      {filteredPolicies.length > 0 ? (
        <table className="policy-table">
          <thead>
            <tr>
              <th>Sr. No.</th>
              <th>Policy Name</th>
              <th>Type</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredPolicies.map((policy, index) => (
              <tr key={policy.id}>
                <td>{index + 1}</td>
                <td>{policy.name}</td>
                <td>{policy.type}</td>
                <td>{policy.date}</td>
                <td>
                  <button className="download-btn">📥 Download</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No policies available for the selected year.</p>
      )}
    </div>
  );
};

export default Policy;