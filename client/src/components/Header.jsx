import "../styles/Header.css";

function Header() {
  return (
    <header className="app-header">
      <div className="logo">
        <img src="/kulate-bonyblu.svg" alt="JsemTu" className="app-logo" />

        <div>
          <h1>JsemTu</h1>
          <p>Přehled prezence</p>
        </div>
      </div>
    </header>
  );
}

export default Header;
