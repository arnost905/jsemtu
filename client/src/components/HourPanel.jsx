import StatusCircle from "./StatusCircle";
import "../styles/HourPanel.css";

function HourPanel({ hours, statusColors }) {
  return (
    <div className="hour-panel">
      {hours.map((hour, index) => (
        <StatusCircle key={index} size={24} color={statusColors[hour]} />
      ))}
    </div>
  );
}

export default HourPanel;
