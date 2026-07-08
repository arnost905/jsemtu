import StatusCircle from "./StatusCircle";
import "../styles/EmployeeRow.css";
import { useState } from "react";
import HourPanel from "./HourPanel";

function EmployeeRow({ employee }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="card mb-2">
      <div className="employee-row">
        <span className="employee-name">{employee.name}</span>

        <div
          onClick={() => setExpanded(!expanded)}
          style={{ cursor: "pointer" }}
        >
          <StatusCircle
            size={34}
            status={employee.status}
            onClick={() => setExpanded(!expanded)}
          />
        </div>
      </div>
    </div>
  );
}

export default EmployeeRow;
