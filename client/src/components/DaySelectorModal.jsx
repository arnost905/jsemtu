import "../styles/Modal.css";
import { useEffect } from "react";

function DaySelectorModal({
  show,
  onClose,
  workingDays,
  currentDay,
  onSelect,
}) {
  useEffect(() => {
    if (!show) return;

    const timer = setTimeout(() => {
      onClose();
    }, 4000);

    return () => clearTimeout(timer);
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-window" onClick={(e) => e.stopPropagation()}>
        <div className="modal-title">Vyber pracovní den</div>

        {workingDays.map((day) => {
          const isSelected = currentDay?.timestamp === day.timestamp;

          const today = new Date();

          const isToday =
            day.day === today.getDate() &&
            day.month === today.getMonth() + 1 &&
            day.year === today.getFullYear();

          return (
            <div
              key={day.timestamp}
              className={`modal-item ${isSelected ? "active" : ""}`}
              onClick={() => onSelect(day)}
            >
              <span className="today-indicator">
                {isToday && <span className="today-dot"></span>}
              </span>

              {day.label}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DaySelectorModal;
