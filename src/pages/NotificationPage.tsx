import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom"; // 페이지 이동을 위한 useNavigate 훅
import '../styles/AboutUsPage.css';

const NotificationPage: React.FC = () => {
  const navigate = useNavigate();
  const hasAlerted = useRef(false); // 경고창이 뜬 상태를 추적하는 ref

  // 로그인 여부 확인
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn'); // 로그인 여부 확인 (예: localStorage에서 로그인 상태 확인)
    
    if (!isLoggedIn && !hasAlerted.current) { 
      alert('로그인 먼저 해주세요.'); // 경고창 띄우기
      hasAlerted.current = true; // 경고창이 뜬 상태로 설정
      navigate('/login'); // 로그인 페이지로 리다이렉트
    }
  }, [navigate]);

  return (
    <div className="aboutus-container">
      알림함
    </div>
  );
};

export default NotificationPage;
