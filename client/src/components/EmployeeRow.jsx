import StatusCircle from "./StatusCircle";
import "../styles/EmployeeRow.css";
//import { useState } from "react";
import HourPanel from "./HourPanel";
import { useState } from "react";
import StatusBubble from "./StatusBubble";
import { STATUS_ORDER, STATUS_LABELS } from "../constants/statuses";

function EmployeeRow({
  employee,
  currentHour,
  currentUser,
  onHourClick,
  expanded,
  onToggle,
}) {
  const [bubble, setBubble] = useState(null);

  // Zatím vezmeme stav z první hodiny směny
  const index = currentHour - 7;

  const currentStatus =
    index >= 0 && index < employee.hours.length ? employee.hours[index] : "off";
  const canEdit =
    currentUser.role === "admin" ||
    currentUser.role === "manager" ||
    currentUser.id === employee.id;

  function showBubble(message) {
    setBubble(message);

    setTimeout(() => {
      setBubble(null);
    }, 1500);
  }
  return (
    <>
      <div
        className={`employee-row ${expanded ? "expanded" : ""}`}
        onClick={onToggle}
      >
        <div className="employee-left">
          <span className="expand-icon">▶</span>

          <span className="employee-name">{employee.name}</span>
          {bubble && (
            <StatusBubble message={bubble} onClose={() => setBubble(null)} />
          )}
        </div>

        <StatusCircle status={currentStatus} size={34} />
      </div>

      <HourPanel
        hours={employee.hours}
        expanded={expanded}
        onHourClick={
          canEdit
            ? (hourIndex) => {
                const current = employee.hours[hourIndex];

                const next =
                  STATUS_ORDER[
                    (STATUS_ORDER.indexOf(current) + 1) % STATUS_ORDER.length
                  ];

                showBubble(STATUS_LABELS[next]);
                onHourClick(employee.id, hourIndex);
              }
            : undefined
        }
      />
    </>
  );
}

export default EmployeeRow;
