import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import findid from "../assets/loginpage.png"; // 이미지 파일 import
import '../styles/FindIdPage.css'; // 스타일 파일 import

const FindIdPage: React.FC = () => {
  const [name, setName] = useState<string>(''); // 이름 입력 상태 추가
  const [email, setEmail] = useState<string>(''); // 이메일 입력 상태
  const [error, setError] = useState<string>(''); // 에러 상태
  const [message, setMessage] = useState<string>(''); // 성공 메시지 상태
  const navigate = useNavigate();

  // 아이디 찾기 폼 제출 핸들러
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email) {
      setError('이름과 이메일을 모두 입력해주세요.');
      return;
    }

    // 여기서 서버에 이름과 이메일을 보내 아이디 찾기 요청을 보냅니다.
    setMessage(`입력하신 이메일로 아이디가 전송되었습니다.`);
    setError(''); // 에러 초기화
  };

  return (
    <div className="find-id-page">
      {/* loginpage 이미지 추가 */}
      <img src={findid} alt="Login Page" className="findid-image" />
      
      <h2>아이디 찾기</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group-fi">
          <div className="findidname">이름</div>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="이름을 입력해주세요"
          />
        </div>
        <div className="form-group-fi">
          <div className="findidemail">이메일</div>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일을 입력해주세요"
          />
        </div>
        {error && <p className="error-message-fi">{error}</p>}
        {message && <p className="success-message-fi">{message}</p>}
        <button type="submit" className="submit-button-fi">아이디 찾기</button>
      </form>
      <button onClick={() => navigate('/login')} className="back-button-fi">
        로그인 페이지로 돌아가기
      </button>
      <div className="copyright-text-fi">
        Copyright ⓒ PRICE PLATFORM
      </div>
    </div>
  );
};

export default FindIdPage;
