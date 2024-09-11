import React from "react";
import { Link, useLocation } from "react-router-dom";
import menuImage from "../assets/menuimage.png";
import '../styles/Navbar.css';

const Navbar: React.FC = () => {
  const location = useLocation(); // 현재 경로를 가져옴

  // Login 또는 Signup 페이지에서는 Navbar를 렌더링하지 않음
  if (location.pathname === "/login" || location.pathname === "/signup") {
    return null;
  }

  return (
    <nav>
      <ul>
        <img src={menuImage} alt="Menu Icon" className="menu-icon" /> {/* 이미지 추가 */}
        <li>
          <Link to="/" className={location.pathname === "/" ? "active" : ""}>Home</Link>
        </li>
        <li>
          <Link to="/about" className={location.pathname === "/about" ? "active" : ""}>About Us</Link>
        </li>
        <li>
          <Link to="/searchpage" className={location.pathname === "/searchpage" ? "active" : ""}>Search Product</Link>
        </li>
        <li>
          <Link to="/notification" className={location.pathname === "/notification" ? "active" : ""}>Notification</Link>
        </li>
        <li>
          <Link to="/login" className={location.pathname === "/login" ? "active" : ""}>Login</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
