import StatusCircle from "./StatusCircle";
import "../styles/EmployeeRow.css";
import { useState } from "react";
import HourPanel from "./HourPanel";

function EmployeeRow({ employee, onHourClick }) {
  const [expanded, setExpanded] = useState(false);

  // Zatím vezmeme stav z první hodiny směny
  const currentStatus = employee.hours[0];

  return (
    <>
      <div className="employee-row">
        <span className="employee-name">{employee.name}</span>

        <StatusCircle
          status={currentStatus}
          size={34}
          onClick={() => setExpanded(!expanded)}
        />
      </div>

      <HourPanel
        hours={employee.hours}
        expanded={expanded}
        onHourClick={(hourIndex) => onHourClick(employee.id, hourIndex)}
      />
    </>
  );
}

export default EmployeeRow;
