import StatusCircle from "./StatusCircle";
import "../styles/SummaryPanel.css";
import { useState, useEffect } from "react";

const items = [
  { key: "all", label: "Všichni" },
  { key: "work", label: "Přítomni" },
  { key: "doctor", label: "Lékař" },
  { key: "holiday", label: "Dovolená" },
  { key: "sickness", label: "Nemoc" },
  { key: "family", label: "Péče" },
  { key: "off", label: "Mimo směnu" },
];

function SummaryPanel({
  summary,
  filter,
  onFilterChange,
  selectedHour,
  setSelectedHour,
}) {
  const [editingHour, setEditingHour] = useState(false);

  return (
    <>
      <div className="summary-header">
        <span className="fw-bold">Stav k : </span>

        {editingHour ? (
          <div className="hour-selector">
            <button onClick={() => setSelectedHour((h) => Math.max(0, h - 1))}>
              ◀
            </button>

            <strong>{selectedHour}:00</strong>

            <button onClick={() => setSelectedHour((h) => Math.min(23, h + 1))}>
              ▶
            </button>
          </div>
        ) : (
          <button className="hour-display" onClick={() => setEditingHour(true)}>
            {selectedHour}:00
          </button>
        )}
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
    </>
  );
}

export default SummaryPanel;
