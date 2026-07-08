import { useState } from "react";
import EmployeeRow from "../components/EmployeeRow";
import "../styles/DashboardPage.css";
import { employees } from "../data/employees";

function DashboardPage() {
  const [employeeList, setEmployeeList] = useState(employees);

  const summary = {
    work: employeeList.filter((e) => e.hours[0] === "work").length,
    doctor: employeeList.filter((e) => e.hours[0] === "doctor").length,
    holiday: employeeList.filter((e) => e.hours[0] === "holiday").length,
    sickness: employeeList.filter((e) => e.hours[0] === "sickness").length,
    family: employeeList.filter((e) => e.hours[0] === "family").length,
    off: employeeList.filter((e) => e.hours[0] === "off").length,
  };
  const STATUS_ORDER = [
    "work",
    "doctor",
    "holiday",
    "sickness",
    "family",
    "off",
  ];
  function handleHourClick(employeeId, hourIndex) {
    setEmployeeList((prev) =>
      prev.map((employee) => {
        if (employee.id !== employeeId) {
          return employee;
        }

        const newHours = [...employee.hours];

        const currentIndex = STATUS_ORDER.indexOf(newHours[hourIndex]);

        const nextIndex = (currentIndex + 1) % STATUS_ORDER.length;

        newHours[hourIndex] = STATUS_ORDER[nextIndex];

        return {
          ...employee,
          hours: newHours,
        };
      }),
    );
  }
  return (
    <div className="dashboard">
      <h1>⬤ JsemTu</h1>

      <p className="text-secondary">Přehled dostupnosti týmu</p>

      <div className="dashboard-summary">
        <div className="summary-item">
          <span>🟢 Přítomni</span>
          <strong>{summary.work}</strong>
        </div>

        <div className="summary-item">
          <span>🔵 Lékař</span>
          <strong>{summary.doctor}</strong>
        </div>

        <div className="summary-item">
          <span>🟡 Dovolená</span>
          <strong>{summary.holiday}</strong>
        </div>

        <div className="summary-item">
          <span>🔴 Nemoc</span>
          <strong>{summary.sickness}</strong>
        </div>

        <div className="summary-item">
          <span>🟠 Péče</span>
          <strong>{summary.family}</strong>
        </div>

        <div className="summary-item">
          <span>⚪ Mimo směnu</span>
          <strong>{summary.off}</strong>
        </div>
      </div>

      {employeeList.map((employee) => (
        <EmployeeRow
          key={employee.id}
          employee={employee}
          onHourClick={handleHourClick}
        />
      ))}
    </div>
  );
}

export default DashboardPage;
