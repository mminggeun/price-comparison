import React from "react";
import { Link } from "react-router-dom";
import menuImage from "../assets/menuimage.png";
import '../styles/Navbar.css'; // CSS 파일을 import

const Navbar: React.FC = () => {
  return (
    <nav>
      <ul>
        <img src={menuImage} alt="Menu Icon" className="menu-icon" /> {/* 이미지 추가 */}
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About Us</Link></li>
        <li><Link to="/search">Search Product</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
