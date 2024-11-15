import React from "react";
import { Link } from "react-router-dom";
import { FaSignInAlt } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Header.css";  // CSS dosyasını içe aktar

function Header() {
  return (
    <header className="header bg-primary text-white py-3">
      <nav className="container">
        <div className="d-flex justify-content-between align-items-center">
          <ul className="nav flex-grow-1 justify-content-around m-0 p-0">
            <li className="nav-item">
              <Link to="/" className="nav-link text-white">Ana Sayfa</Link>
            </li>
            <li className="nav-item">
              <Link to="/hastalar" className="nav-link text-white">Hastalar</Link>
            </li>
            <li className="nav-item">
              <Link to="/doktorlar" className="nav-link text-white">Doktorlar</Link>
            </li>
            <li className="nav-item">
              <Link to="/randevular" className="nav-link text-white">Randevular</Link>
            </li>
            <li className="nav-item">
              <Link to="/randevu-al" className="nav-link text-white">Randevu Al</Link>
            </li>
          </ul>
          <Link to="/giris" className="btn btn-light d-flex align-items-center">
            <FaSignInAlt className="me-2" />
            Giriş Yap
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;
