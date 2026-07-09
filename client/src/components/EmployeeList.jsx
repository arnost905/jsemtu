import EmployeeRow from "./EmployeeRow";

function EmployeeList({
  employees,
  currentHour,
  currentUser,
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
          currentUser={currentUser}
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
