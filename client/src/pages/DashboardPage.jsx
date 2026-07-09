import { useState } from "react";
import EmployeeRow from "../components/EmployeeRow";
import "../styles/DashboardPage.css";
import { employees } from "../data/employees";
import Header from "../components/Header";
import SummaryPanel from "../components/SummaryPanel";
import EmployeeList from "../components/EmployeeList";

function DashboardPage() {
  const [employeeList, setEmployeeList] = useState(employees);
  const [expandedEmployee, setExpandedEmployee] = useState(null);
  const [filter, setFilter] = useState("all");

  const summary = {
    work: employeeList.filter((e) => e.hours[0] === "work").length,
    doctor: employeeList.filter((e) => e.hours[0] === "doctor").length,
    holiday: employeeList.filter((e) => e.hours[0] === "holiday").length,
    sickness: employeeList.filter((e) => e.hours[0] === "sickness").length,
    family: employeeList.filter((e) => e.hours[0] === "family").length,
    off: employeeList.filter((e) => e.hours[0] === "off").length,
  };
  const filteredEmployees =
    filter === "all"
      ? employeeList
      : employeeList.filter((employee) => employee.hours[0] === filter);
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
      <Header />

      <SummaryPanel
        summary={summary}
        filter={filter}
        onFilterChange={setFilter}
      />

      <EmployeeList
        employees={filteredEmployees}
        onHourClick={handleHourClick}
        expandedEmployee={expandedEmployee}
        setExpandedEmployee={setExpandedEmployee}
      />
      <footer className="app-footer">
        <small>
          JsemTu <strong>v0.8-alfa</strong>
          <br />© 2026 Karel Půček
          <br />
          💡 <a href="mailto:arnost905@gmail.com">Pošli prosím Tě připomínky a návrhy na vylepšení.</a>
        </small>
      </footer>
    </div>
  );
}

export default DashboardPage;
