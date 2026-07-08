import { useState } from "react";
import EmployeeRow from "../components/EmployeeRow";
import "../styles/DashboardPage.css";
import { employees } from "../data/employees";

function DashboardPage() {
  const [employeeList] = useState(employees);

  const summary = {
    work: employeeList.filter((e) => e.status === "work").length,
    doctor: employeeList.filter((e) => e.status === "doctor").length,
    holiday: employeeList.filter((e) => e.status === "holiday").length,
    sickness: employeeList.filter((e) => e.status === "sickness").length,
    family: employeeList.filter((e) => e.status === "family").length,
    off: employeeList.filter((e) => e.status === "off").length,
  };

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
        <EmployeeRow key={employee.id} employee={employee} />
      ))}
    </div>
  );
}

export default DashboardPage;
