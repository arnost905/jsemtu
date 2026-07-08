import HourCircle from "./HourCircle";
import "../styles/HourPanel.css";

function HourPanel({ hours, expanded, onHourClick }) {
  if (!expanded) return null;

  return (
    <div className="hour-panel">
      {hours.map((status, index) => (
        <HourCircle
          key={index}
          status={status}
          onClick={() => onHourClick(index)}
        />
      ))}
    </div>
  );
}

export default HourPanel;
