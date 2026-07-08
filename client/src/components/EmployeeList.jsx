import EmployeeRow from "./EmployeeRow";

function EmployeeList({ employees, onHourClick }) {
  return (
    <>
      {employees.map((employee) => (
        <EmployeeRow
          key={employee.id}
          employee={employee}
          onHourClick={onHourClick}
        />
      ))}
    </>
  );
}

export default EmployeeList;
