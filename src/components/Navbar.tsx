import React from "react";
import { Link, useLocation } from "react-router-dom"; // useLocation 훅 추가
import menuImage from "../assets/menuimage.png";
import '../styles/Navbar.css'; // CSS 파일을 import

const Navbar: React.FC = () => {
  const location = useLocation(); // 현재 경로를 가져옴

  // Login 페이지에서는 Navbar를 렌더링하지 않음
  if (location.pathname === "/login") {
    return null; // Navbar를 렌더링하지 않음
  }

  return (
    <nav>
      <ul>
        <img src={menuImage} alt="Menu Icon" className="menu-icon" /> {/* 이미지 추가 */}
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About Us</Link></li>
        <li><Link to="/searchpage">Search Product</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
