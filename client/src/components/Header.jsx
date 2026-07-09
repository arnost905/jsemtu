import StatusCircle from "./StatusCircle";
import "../styles/Header.css";

function Header() {
  return (
    <header className="app-header">
      <div className="logo">
        <StatusCircle status="work" size={20} />

        <div>
          <h1>JsemTu</h1>
          <p>Přehled dostupnosti týmu</p>
          <p>👆 Ťapej na kolečko zaměstnance pro změnu stavu</p>
        </div>
      </div>
    </header>
  );
}

export default Header;
