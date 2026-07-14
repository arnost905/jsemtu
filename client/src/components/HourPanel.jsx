import HourCircle from "./HourCircle";
import "../styles/HourPanel.css";

function HourPanel({ hours, expanded, onHourClick }) {
  if (!expanded) return null;

  return (
    <div className="hour-panel">
      <div className="hour-circles">
        {hours.map((status, index) => (
          <HourCircle
            key={index}
            status={status}
            hour={index + 7}
            onClick={() => onHourClick?.(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default HourPanel;
