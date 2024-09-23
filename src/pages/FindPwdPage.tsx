import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import findpwd from "../assets/loginpage.png";
import '../styles/FindPwdPage.css'; // 스타일 파일 import

const FindPwdPage: React.FC = () => {
  const [username, setUsername] = useState<string>(''); // 아이디 입력 상태 추가
  const [email, setEmail] = useState<string>(''); // 이메일 입력 상태
  const [error, setError] = useState<string>(''); // 에러 상태
  const [message, setMessage] = useState<string>(''); // 성공 메시지 상태
  const navigate = useNavigate();

  // 비밀번호 찾기 폼 제출 핸들러
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !email) {
      setError('아이디와 이메일을 모두 입력해주세요.');
      return;
    }

    // 서버에 아이디와 이메일을 보내 비밀번호 찾기 요청을 보냅니다.
    setMessage(`입력하신 이메일로 비밀번호 재설정 링크가 전송되었습니다.`);
    setError(''); // 에러 초기화
  };

  return (
    <div className="find-pwd-page">
        <img src={findpwd} alt="Login Page" className="findpwd-image" />
      <h2>비밀번호 찾기</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group-pwd">
            <div className="findpwdname">이름</div>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)} // 아이디 입력 핸들러 추가
            placeholder="아이디를 입력해주세요"
          />
        </div>
        <div className="form-group-pwd">
            <div className="findpwdemail">이메일</div>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일을 입력해주세요"
          />
        </div>
        {error && <p className="error-message-pwd">{error}</p>}
        {message && <p className="success-message-pwd">{message}</p>}
        <button type="submit" className="submit-button-pwd">비밀번호 찾기</button>
      </form>
      <button onClick={() => navigate('/login')} className="back-button-pwd">
        로그인 페이지로 돌아가기
      </button>
      <div className="copyright-text-pwd">
        Copyright ⓒ PRICE PLATFORM
      </div>
    </div>
  );
};

export default FindPwdPage;
