import { useEffect } from "react";
import "../styles/StatusBubble.css";

export default function StatusBubble({ message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 1200);

    return () => clearTimeout(timer);
  }, [message, onClose]);

  return <div className="status-bubble">{message}</div>;
}
