import StatusCircle from "./StatusCircle";

function HourCircle({ status, onClick }) {
  return <StatusCircle status={status} size={26} onClick={onClick} />;
}

export default HourCircle;
