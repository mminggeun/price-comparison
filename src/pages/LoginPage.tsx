import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // 페이지 이동을 위한 훅
import loginpage from "../assets/loginpage.png";
import '../styles/LoginPage.css'; // 로그인 페이지 스타일 파일 import

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const navigate = useNavigate(); // 페이지 이동을 위한 훅

  // 폼 제출 핸들러
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 간단한 이메일과 비밀번호 유효성 검사
    if (!email || !password) {
      setError("이메일과 비밀번호를 입력해주세요.");
      return;
    }

    if (email === "test@example.com" && password === "password") {
      // 로그인 성공 시, 메인 페이지로 이동
      navigate("/");
    } else {
      // 로그인 실패 시 오류 메시지 표시
      setError("유효하지 않은 로그인 정보입니다.");
    }
  };

  return (
    <div className="login-container">
      {/* loginpage 이미지 추가 */}
      <img src={loginpage} alt="Login Page" className="login-image" />
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">이메일:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일을 입력하세요"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">비밀번호:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호를 입력하세요"
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="login-button">로그인</button>
      </form>
    </div>
  );
};

export default LoginPage;
