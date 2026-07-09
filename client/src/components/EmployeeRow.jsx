import StatusCircle from "./StatusCircle";
import "../styles/EmployeeRow.css";
//import { useState } from "react";
import HourPanel from "./HourPanel";

function EmployeeRow({
  employee,
  currentHour,
  onHourClick,
  expanded,
  onToggle,
}) {
  //const [expanded, setExpanded] = useState(false);

  // Zatím vezmeme stav z první hodiny směny
  const index = currentHour - employee.shiftStart;

  const currentStatus =
    index >= 0 && index < employee.hours.length ? employee.hours[index] : "off";
  return (
    <>
      <div
        className={`employee-row ${expanded ? "expanded" : ""}`}
        onClick={onToggle}
      >
        <div className="employee-left">
          <span className="expand-icon">▶</span>

          <span className="employee-name">{employee.name}</span>
        </div>

        <StatusCircle status={currentStatus} size={34} />
      </div>

      <HourPanel
        hours={employee.hours}
        shiftStart={employee.shiftStart}
        expanded={expanded}
        onHourClick={(hourIndex) => onHourClick(employee.id, hourIndex)}
      />
    </>
  );
}

export default EmployeeRow;
