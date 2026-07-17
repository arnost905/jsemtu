import { useEffect } from "react";
import "../styles/StatusToast.css";

export default function StatusToast({ message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 1200);

    return () => clearTimeout(timer);
  }, [message, onClose]);

  return <div className="status-toast">{message}</div>;
}
