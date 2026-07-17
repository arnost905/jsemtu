import { useState } from "react";
import API_URL from "../config";
import "../styles/LoginPage.css";
import AppBrand from "../components/AppBrand";

function LoginPage({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(e) {
    e.preventDefault();

    // Demo na Vercelu

    // Lokální vývoj s PHP
    fetch(`${API_URL}/login.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          localStorage.setItem("currentUser", JSON.stringify(data.user));

          onLogin(data.user);
        } else {
          alert(data.message);
        }
      })
      .catch((error) => {
        console.error(error);
        alert("Nepodařilo se spojit se serverem.");
      });
  }

  return (
    <div className="container py-5">
      <div className="card mx-auto" style={{ maxWidth: "420px" }}>
        <div className="card-body">
          <AppBrand />

          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="form-label">Uživatel</label>

              <input
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="form-label">Heslo</label>

              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button className="btn btn-primary w-100">Přihlásit</button>
          </form>
          <br />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
