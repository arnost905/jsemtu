import { useState, useEffect } from "react";
import EmployeeRow from "../components/EmployeeRow";
import "../styles/DashboardPage.css";
import Header from "../components/Header";
import SummaryPanel from "../components/SummaryPanel";
import EmployeeList from "../components/EmployeeList";

function DashboardPage({ currentUser, onLogout }) {
  const [employeeList, setEmployeeList] = useState([]);
  const [expandedEmployee, setExpandedEmployee] = useState(null);
  const [filter, setFilter] = useState("all");
  const [selectedHour, setSelectedHour] = useState(new Date().getHours());

  useEffect(() => {
    // Vývoj s PHP
    //fetch("http://localhost/JsemTu/api/employees.php")

    // Demo (Vercel)
    fetch("/data/employees.json")
      .then((response) => response.json())
      .then((data) => setEmployeeList(data))
      .catch((error) => console.error("Chyba při načítání JSON:", error));
  }, []);

  function getCurrentStatus(employee, hour) {
    const index = hour - employee.shiftStart;

    if (index < 0 || index >= employee.hours.length) {
      return "off";
    }

    return employee.hours[index];
  }
  const summary = {
    work: employeeList.filter(
      (e) => getCurrentStatus(e, selectedHour) === "work",
    ).length,
    doctor: employeeList.filter(
      (e) => getCurrentStatus(e, selectedHour) === "doctor",
    ).length,
    holiday: employeeList.filter(
      (e) => getCurrentStatus(e, selectedHour) === "holiday",
    ).length,
    sickness: employeeList.filter(
      (e) => getCurrentStatus(e, selectedHour) === "sickness",
    ).length,
    family: employeeList.filter(
      (e) => getCurrentStatus(e, selectedHour) === "family",
    ).length,
    off: employeeList.filter((e) => getCurrentStatus(e, selectedHour) === "off")
      .length,
  };
  const filteredEmployees =
    filter === "all"
      ? employeeList
      : employeeList.filter(
          (employee) => getCurrentStatus(employee, selectedHour) === filter,
        );
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
  const roleNames = {
    admin: "Administrátor",
    manager: "Vedoucí",
    employee: "Zaměstnanec",
    viewer: "Pouze náhled",
  };
  return (
    <div className="dashboard">
      <Header />
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          👤 <strong>{currentUser.name} ● </strong>
          <small> {roleNames[currentUser.role]}</small>
        </div>

        <button className="btn btn-outline-secondary btn-sm" onClick={onLogout}>
          Odhlásit
        </button>
      </div>
      <SummaryPanel
        summary={summary}
        filter={filter}
        onFilterChange={setFilter}
        selectedHour={selectedHour}
        setSelectedHour={setSelectedHour}
      />

      <EmployeeList
        employees={filteredEmployees}
        currentHour={selectedHour}
        onHourClick={handleHourClick}
        expandedEmployee={expandedEmployee}
        setExpandedEmployee={setExpandedEmployee}
      />
      <footer className="app-footer">
        <small>
          JsemTu <strong>v0.9-alfa</strong>
          <br />© 2026 Karel Půček
          <br />
          💡{" "}
          <a href="mailto:arnost905@gmail.com">
            Pošli prosím Tě připomínky a návrhy na vylepšení.
          </a>
        </small>
      </footer>
    </div>
  );
}

export default DashboardPage;
