import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import findpwd from "../assets/loginpage.png";
import '../styles/FindPwdPage.css'; // 스타일 파일 import

const FindPwdPage: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [username, setUsername] = useState<string>(''); // 아이디 입력 상태 추가
  const [email, setEmail] = useState<string>(''); // 이메일 입력 상태
  const [error, setError] = useState<string>(''); // 에러 상태
  const [message, setMessage] = useState<string>(''); // 성공 메시지 상태
  const [newPassword, setNewPassword] = useState<string>(''); // 새 비밀번호 상태
  const navigate = useNavigate();

  // 비밀번호 찾기 폼 제출 핸들러
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !username || !email) {
      setError('모든 필드를 입력해주세요.');
      return;
    }

    // FindPasswordReq 객체 생성
    const findPasswordReq = {
      name,     // 이름
      username, // 아이디
      email     // 이메일
    };

    try {
      // 서버로 POST 요청 보내기
      const response = await fetch('http://18.209.20.212:8080/api/users/find-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(findPasswordReq), // FindPasswordReq 객체 전송
      });

      const data = await response.json();

      if (response.ok) {
        // 서버로부터 새 비밀번호를 받았을 때
        setNewPassword(data.newPassword); // 응답에서 새 비밀번호를 가져옴
        setMessage('새로운 비밀번호가 발급되었습니다.');
        setError('');
      } else {
        // 서버로부터 에러 응답을 받으면 에러 메시지 설정
        setError(data.message || '비밀번호 찾기에 실패했습니다. 다시 시도해주세요.');
        setMessage('');
      }
    } catch (err) {
      // 네트워크 에러 처리
      setError('서버와 통신하는 동안 오류가 발생했습니다. 나중에 다시 시도해주세요.');
      setMessage('');
    }
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
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="이름을 입력해주세요"
          />
        </div>
        <div className="form-group-pwd">
          <div className="findpwdemail">아이디</div>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
        {newPassword && <p className="new-password">새 비밀번호: {newPassword}</p>} {/* 새 비밀번호 표시 */}
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
