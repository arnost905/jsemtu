import EmployeeRow from "../components/EmployeeRow";
import "../styles/DashboardPage.css";
import { employees } from "../data/employees";

function DashboardPage() {
  return (
    <div className="dashboard">
      <h1>JsemTu</h1>

      <p className="text-secondary">Přehled dostupnosti týmu</p>

      {employees.map((employee) => (
        <EmployeeRow key={employee.id} employee={employee} />
      ))}
    </div>
  );
}

export default DashboardPage;
