import "../styles/Modal.css";
import { useEffect } from "react";

function HourSelectorModal({ show, onClose, selectedHour, onSelect }) {
  useEffect(() => {
    if (!show) return;

    const timer = setTimeout(() => {
      onClose();
    }, 4000);

    return () => clearTimeout(timer);
  }, [show, onClose]);
  if (!show) return null;

  const hours = [];

  for (let h = 7; h <= 18; h++) {
    hours.push(h);
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-window" onClick={(e) => e.stopPropagation()}>
        <div className="modal-title">Vyber hodinu</div>

        {hours.map((hour) => (
          <div
            key={hour}
            className={`modal-item ${selectedHour === hour ? "active" : ""}`}
            onClick={() => onSelect(hour)}
          >
            {hour}:00
          </div>
        ))}
      </div>
    </div>
  );
}

export default HourSelectorModal;
