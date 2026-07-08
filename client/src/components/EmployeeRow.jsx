import StatusCircle from "./StatusCircle";
import "../styles/EmployeeRow.css";
import { useState } from "react";
import HourPanel from "./HourPanel";

function EmployeeRow({ employee }) {
  const [expanded, setExpanded] = useState(false);

  function handleHourClick(index) {
    console.log(`${employee.name} - klik na hodinu ${index}`);
  }

  return (
    <>
      <div className="employee-row">
        <span className="employee-name">{employee.name}</span>

        <StatusCircle
          status={employee.status}
          size={34}
          onClick={() => setExpanded(!expanded)}
        />
      </div>

      <HourPanel
        hours={employee.hours}
        expanded={expanded}
        onHourClick={handleHourClick}
      />
    </>
  );
}

export default EmployeeRow;
