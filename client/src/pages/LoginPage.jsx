import { useState } from "react";

function LoginPage({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(e) {
    e.preventDefault();

    // Demo na Vercelu
    if (window.location.hostname !== "localhost") {
      if (username === "demo" && password === "demo") {
        onLogin({
          id: 99,
          name: "Demo účet",
          role: "employee",
        });
      } else {
        alert("Pro demo použij přihlášení demo / demo");
      }
      return;
    }

    // Lokální vývoj s PHP
    fetch("http://localhost/JsemTu/api/login.php", {
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
          <h2 className="text-center mb-4">JsemTu</h2>

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
          <small>
            <strong>Demo účet:</strong> demo / demo
          </small>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
