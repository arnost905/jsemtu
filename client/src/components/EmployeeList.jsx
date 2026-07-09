import EmployeeRow from "./EmployeeRow";

function EmployeeList({
  employees,
  currentHour,
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
          currentHour={currentHour}
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
