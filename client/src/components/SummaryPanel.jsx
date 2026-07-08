import StatusCircle from "./StatusCircle";
import "../styles/DashboardPage.css";

const items = [
  { key: "all", label: "Všichni" },
  { key: "work", label: "Přítomni" },
  { key: "doctor", label: "Lékař" },
  { key: "holiday", label: "Dovolená" },
  { key: "sickness", label: "Nemoc" },
  { key: "family", label: "Péče" },
  { key: "off", label: "Mimo směnu" },
];

function SummaryPanel({ summary, filter, onFilterChange }) {
  return (
    <div className="dashboard-summary">
      {items.map((item) => (
        <div
          key={item.key}
          className={`summary-item ${filter === item.key ? "active" : ""}`}
          onClick={() => onFilterChange(item.key)}
          style={{ cursor: "pointer" }}
        >
          <div className="d-flex align-items-center gap-2">
            {item.key !== "all" && <StatusCircle status={item.key} size={18} />}

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
  );
}

export default SummaryPanel;
