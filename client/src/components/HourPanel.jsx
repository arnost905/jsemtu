import HourCircle from "./HourCircle";
import "../styles/HourPanel.css";

function HourPanel({ hours, shiftStart, expanded, onHourClick }) {
  if (!expanded) return null;

  return (
    <div className="hour-panel">
      <div className="hour-circles">
        {hours.map((status, index) => (
          <HourCircle
            key={index}
            status={status}
            hour={shiftStart + index}
            onClick={() => onHourClick?.(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default HourPanel;
