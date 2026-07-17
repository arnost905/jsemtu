import StatusCircle from "./StatusCircle";
import "../styles/SummaryPanel.css";
import { useState } from "react";
import DaySelectorModal from "./DaySelectorModal";
import HourSelectorModal from "./HourSelectorModal";

const items = [
  { key: "all", label: "Všichni" },
  { key: "work", label: "Přítomni" },
  { key: "doctor", label: "Lékař" },
  { key: "holiday", label: "Dovolená" },
  { key: "sickness", label: "Nemoc" },
  { key: "family", label: "Péče" },
  { key: "businessTrip", label: "Služební cesta" },
  { key: "off", label: "Mimo směnu" },
];

function SummaryPanel({
  summary,
  filter,
  onFilterChange,
  selectedHour,
  setSelectedHour,
  currentDay,
  workingDays,
  setSelectedDate,
}) {
  const [editingHour, setEditingHour] = useState(false);
  const [editingDay, setEditingDay] = useState(false);
  return (
    <>
      <div className="summary-header">
        <span className="fw-bold">Stav k : </span>
        <button className="day-display" onClick={() => setEditingDay(true)}>
          📅 {currentDay?.label}
        </button>
        <button className="hour-display" onClick={() => setEditingHour(true)}>
          🕒 {selectedHour}:00
        </button>
      </div>

      <div className="dashboard-summary">
        {items.map((item) => (
          <div
            key={item.key}
            className={`summary-item ${filter === item.key ? "active" : ""}`}
            onClick={() => onFilterChange(item.key)}
            style={{ cursor: "pointer" }}
          >
            <div className="d-flex align-items-center gap-2">
              {item.key !== "all" && (
                <StatusCircle status={item.key} size={18} />
              )}

              <span>{item.label}</span>
            </div>

            <strong>
              {item.key === "all"
                ? Object.values(summary).reduce((a, b) => a + b, 0)
                : summary[item.key]}
            </strong>
          </div>
        ))}
      </div>
      <DaySelectorModal
        show={editingDay}
        workingDays={workingDays}
        currentDay={currentDay}
        onClose={() => setEditingDay(false)}
        onSelect={(day) => {
          setSelectedDate(day.date);
          setEditingDay(false);
        }}
      />

      <HourSelectorModal
        show={editingHour}
        selectedHour={selectedHour}
        onClose={() => setEditingHour(false)}
        onSelect={(hour) => {
          setSelectedHour(hour);
          setEditingHour(false);
        }}
      />
    </>
  );
}

export default SummaryPanel;
