import StatusCircle from "./StatusCircle";

function HourCircle({ status, hour, onClick }) {
  return (
    <StatusCircle status={status} hour={hour} size={30} onClick={onClick} />
  );
}

export default HourCircle;
