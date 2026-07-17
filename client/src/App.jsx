import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import { useState, useEffect } from "react";

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");

    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  return currentUser ? (
    <DashboardPage
      currentUser={currentUser}
      onLogout={() => {
        localStorage.removeItem("currentUser");
        setCurrentUser(null);
      }}
    />
  ) : (
    <LoginPage onLogin={setCurrentUser} />
  );
}

export default App;
