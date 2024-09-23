import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import menuImage from "../assets/menuimage.png";
import '../styles/Navbar.css';

const Navbar: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false); // 로그인 상태 관리
  const [username, setUsername] = useState<string | null>(""); // 유저 이름 상태
  const location = useLocation(); // 현재 경로를 가져옴
  const navigate = useNavigate(); // 페이지 이동을 위한 navigate 함수

  // 페이지 로드 시 로그인 상태 확인 (예: 로컬 스토리지에서 사용자 정보를 가져옴)
  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    if (storedUser) {
      setUsername(storedUser); // 유저 이름 설정
      setIsLoggedIn(true); // 로그인 상태 설정
    }
  }, []);

  // 로그아웃 핸들러
  const handleLogout = () => {
    localStorage.removeItem("username"); // 로그인 정보 삭제 (예: 토큰도 함께 삭제)
    setIsLoggedIn(false); // 로그인 상태 초기화
    setUsername(null); // 유저 이름 초기화
    navigate("/login"); // 로그아웃 후 로그인 페이지로 이동
  };

  // Login 또는 Signup 페이지에서는 Navbar를 렌더링하지 않음
  if (location.pathname === "/login" || location.pathname === "/signup" || location.pathname === "/findid"
    || location.pathname === "/findpwd") 
  {
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
        {/* 로그인 여부에 따라 다른 UI 표시 */}
        {!isLoggedIn ? (
          <li>
            <Link to="/login" className={location.pathname === "/login" ? "active" : ""}>Login</Link>
          </li>
        ) : (
          <li>
            <span>{username} 님</span>
            <button onClick={handleLogout} className="logout-button">Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
