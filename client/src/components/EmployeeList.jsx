import EmployeeRow from "./EmployeeRow";

function EmployeeList({
  employees,
  onHourClick,
  expandedEmployee,
  setExpandedEmployee,
}) {
  return (
    <>
      {employees.map((employee) => (
        <EmployeeRow
          key={employee.id}
          employee={employee}
          onHourClick={onHourClick}
          expanded={expandedEmployee === employee.id}
          onToggle={() =>
            setExpandedEmployee(
              expandedEmployee === employee.id ? null : employee.id,
            )
          }
        />
      ))}
    </>
  );
}

export default EmployeeList;
