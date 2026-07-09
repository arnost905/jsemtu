import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import { useState } from "react";

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  return currentUser ? (
    <DashboardPage
      currentUser={currentUser}
      onLogout={() => setCurrentUser(null)}
    />
  ) : (
    <LoginPage onLogin={setCurrentUser} />
  );
}

export default App;
