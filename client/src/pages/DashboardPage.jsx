import { useState, useEffect } from "react";
import EmployeeRow from "../components/EmployeeRow";
import "../styles/DashboardPage.css";
import Header from "../components/Header";
import SummaryPanel from "../components/SummaryPanel";
import EmployeeList from "../components/EmployeeList";
import API_URL from "../config";
import StatusToast from "../components/StatusToast";
import { STATUS_ORDER, STATUS_LABELS } from "../constants/statuses";
import { getWorkingDays } from "../utils/workingDays";

function DashboardPage({ currentUser, onLogout }) {
  const [employeeList, setEmployeeList] = useState([]);
  const [expandedEmployee, setExpandedEmployee] = useState(null);
  const [filter, setFilter] = useState("all");
  const [selectedHour, setSelectedHour] = useState(new Date().getHours());
  const [toast, setToast] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [workingDays, setWorkingDays] = useState(() => getWorkingDays());
  const currentDay = workingDays.find(
    (day) => day.iso === selectedDate.toISOString().split("T")[0],
  );

  function loadEmployees() {
    fetch(`${API_URL}/employees.php`)
      .then((response) => response.json())
      .then((data) => setEmployeeList(data))
      .catch((error) => console.error(error));
  }
  useEffect(() => {
    loadEmployees();

    const timer = setInterval(loadEmployees, 15000);

    return () => clearInterval(timer);
  }, []);
  function saveEmployees(data) {
    fetch(`${API_URL}/employees.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        if (!result.success) {
          console.error("Nepodařilo se uložit změny.");
        }
      })
      .catch((error) => {
        console.error("Chyba při ukládání:", error);
      });
  }
  function getCurrentStatus(employee, hour) {
    const index = hour - 7;

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
    businessTrip: employeeList.filter(
      (e) => getCurrentStatus(e, selectedHour) === "businessTrip",
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

  function countHours(hours) {
    return hours.filter((status) => status !== "off").length;
  }

  function countStatuses(hours) {
    return {
      work: hours.filter((h) => h === "work").length,
      doctor: hours.filter((h) => h === "doctor").length,
      holiday: hours.filter((h) => h === "holiday").length,
      sickness: hours.filter((h) => h === "sickness").length,
      family: hours.filter((h) => h === "family").length,
      businessTrip: hours.filter((h) => h === "businessTrip").length,
    };
  }

  function handleHourClick(employeeId, hourIndex) {
    setEmployeeList((prev) => {
      const updated = prev.map((employee) => {
        if (employee.id !== employeeId) {
          return employee;
        }

        const newHours = [...employee.hours];

        const currentIndex = STATUS_ORDER.indexOf(newHours[hourIndex]);
        const nextIndex = (currentIndex + 1) % STATUS_ORDER.length;

        const newStatus = STATUS_ORDER[nextIndex];
        newHours[hourIndex] = newStatus;

        const totalHours = countHours(newHours);

        if (totalHours > 8) {
          setToast(`⚠ ${employee.name} má zadáno ${totalHours} hodin.`);
        }

        return {
          ...employee,
          hours: newHours,
        };
      });

      // Uložení na server
      saveEmployees(updated);

      return updated;
    });
  }

  function sendReport() {
    fetch(`${API_URL}/send_report.php`)
      .then(async (response) => {
        console.log("Status:", response.status);

        const text = await response.text();

        console.log("Odpověď:", text);

        return JSON.parse(text);
      })
      .then((result) => {
        if (result.success) {
          alert("✅ Denní přehled byl úspěšně odeslán.");
        } else {
          alert("❌ Odeslání se nezdařilo.");
        }
      })
      .catch((error) => {
        console.error(error);
        alert(error.message);
      });
  }

  function downloadReport() {
    window.open(`${API_URL}/download_report.php`, "_blank");
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

        <div className="d-flex gap-2">
          {(currentUser.role === "admin" || currentUser.role === "manager") && (
            <button className="btn btn-success btn-sm" onClick={downloadReport}>
              📥 Stáhnout přehled
            </button>
          )}

          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={onLogout}
          >
            Odhlásit
          </button>
        </div>
      </div>
      <SummaryPanel
        summary={summary}
        filter={filter}
        onFilterChange={setFilter}
        selectedHour={selectedHour}
        setSelectedHour={setSelectedHour}
        currentDay={currentDay}
        workingDays={workingDays}
        setSelectedDate={setSelectedDate}
      />

      <EmployeeList
        employees={filteredEmployees}
        currentHour={selectedHour}
        currentUser={currentUser}
        onHourClick={handleHourClick}
        expandedEmployee={expandedEmployee}
        setExpandedEmployee={setExpandedEmployee}
      />

      {toast && <StatusToast message={toast} onClose={() => setToast(null)} />}
      <footer className="app-footer">
        <small>
          JsemTu <strong>v0.2.0</strong>
          <br />© 2026 Karel Půček
          <br />
          <p>👆 Ťapej na kolečko zaměstnance pro změnu stavu</p>
          <a href="mailto:karel.pucek@centrum.cz">
            Pošli prosím Tě připomínky a návrhy na vylepšení.
          </a>
        </small>
      </footer>
    </div>
  );
}

export default DashboardPage;
