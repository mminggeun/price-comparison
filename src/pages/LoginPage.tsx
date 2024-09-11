import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // 페이지 이동을 위한 훅
import loginpage from "../assets/loginpage.png";
import kakaoimage from "../assets/kakao.png"; // 카카오 이미지 import
import naverimage from "../assets/naver.png"; // 네이버 이미지 import
import '../styles/LoginPage.css'; // 로그인 페이지 스타일 파일 import

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState<string>(""); // 아이디로 변경
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const navigate = useNavigate(); // 페이지 이동을 위한 훅

  // 폼 제출 핸들러
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 간단한 아이디와 비밀번호 유효성 검사
    if (!username || !password) {
      setError("아이디와 비밀번호를 입력해주세요.");
      return;
    }

    if (username === "testuser" && password === "password") {
      // 로그인 성공 시, 메인 페이지로 이동
      navigate("/");
    } else {
      // 로그인 실패 시 오류 메시지 표시
      setError("유효하지 않은 로그인 정보입니다.");
    }
  };

  // 카카오 로그인 핸들러
  const handleKakaoLogin = () => {
    // 여기에 카카오 로그인 로직 추가 (Kakao SDK 또는 REST API 사용)
    window.location.href = "https://kauth.kakao.com/oauth/authorize?client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&response_type=code";
  };

  // 네이버 로그인 핸들러
  const handleNaverLogin = () => {
    // 여기에 네이버 로그인 로직 추가 (Naver SDK 또는 REST API 사용)
    window.location.href = "https://nid.naver.com/oauth2.0/authorize?client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&response_type=code";
  };

  // 홈으로 이동하는 함수
  const handleImageClick = () => {
    navigate("/"); // 홈 경로로 이동
  };

  return (
    <div className="page-container">
      <div className="login-container">
        {/* loginpage 이미지 클릭 시 홈으로 이동 */}
        <img
          src={loginpage}
          alt="Login Page"
          className="login-image"
          onClick={handleImageClick} // 클릭 핸들러 추가
          style={{ cursor: 'pointer' }} // 클릭 가능한 상태로 보이게 스타일링
        />
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <div className="username">아이디</div> {/* 아이디 라벨 추가 */}
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <div className="password">비밀번호</div> {/* 비밀번호 라벨 추가 */}
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="login-button">로그인</button>
        </form>

        <div className="separator-container">
          <div className="separator-line"></div>
          <span className="separator-text">또는</span>
          <div className="separator-line"></div>
        </div>

        <div className="social-login-container">
          <button onClick={handleKakaoLogin} className="kakao-login-button">
            <img src={kakaoimage} alt="카카오로 로그인" className="social-login-image1" />
          </button>
          <button onClick={handleNaverLogin} className="naver-login-button">
            <img src={naverimage} alt="네이버로 로그인" className="social-login-image2" />
          </button>
        </div>

        {/* 아이디 찾기, 비밀번호 찾기, 회원가입 추가 */}
        <div className="additional-links">
          <a href="/find-username" className="link">아이디 찾기</a>
          <span className="separator">|</span>
          <a href="/find-password" className="link">비밀번호 찾기</a>
          <span className="separator">|</span>
          <a href="/signup" className="link">회원가입</a>
        </div>
      </div>
      {/* login-container 밖에 Copyright 추가 */}
      <div className="copyright-text">
        Copyright ⓒ PRICE PLATFORM
      </div>
    </div>
  );
};

export default LoginPage;
