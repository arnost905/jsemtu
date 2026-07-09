import "../styles/StatusCircle.css";

const statusColors = {
  work: "#22c55e",
  doctor: "#3b82f6",
  holiday: "#facc15",
  sickness: "#ef4444",
  family: "#fb923c",
  off: "#cbd5e1",
};

function StatusCircle({ status = "work", hour, size = 34, onClick }) {
  return (
    <button
      className="status-circle"
      onClick={onClick}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: statusColors[status],
      }}
    >
      {hour}
    </button>
  );
}

export default StatusCircle;
