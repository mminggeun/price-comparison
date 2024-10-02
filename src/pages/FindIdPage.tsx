import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import findid from "../assets/loginpage.png"; // 이미지 파일 import
import '../styles/FindIdPage.css'; // 스타일 파일 import

// VerifyCodeReq와 CheckCodeReq 인터페이스 정의
interface VerifyCodeReq {
  name: string;
  phoneNumber: string;
}

interface CheckCodeReq {
  name: string;
  phoneNumber: string;
  certificationNumber: string;
}

const FindIdPage: React.FC = () => {
  const [name, setName] = useState<string>(''); // 이름 입력 상태
  const [phoneNumber, setPhoneNumber] = useState<string>(''); // 전화번호 입력 상태
  const [certificationNumber, setCertificationNumber] = useState<string>(''); // 인증번호 입력 상태 추가
  const [error, setError] = useState<string>(''); // 에러 상태
  const [message, setMessage] = useState<string>(''); // 성공 메시지 상태
  const navigate = useNavigate();

  // 인증번호 전송 버튼 클릭 핸들러
  const handleSendCertification = async () => {
    if (!name || !phoneNumber) {
      setError('이름과 전화번호를 모두 입력해주세요.');
      return;
    }
    
    const verifyCodeReq: VerifyCodeReq = { name, phoneNumber };

    try {
      const response = await fetch('http://18.209.20.212:8080/api/users/send-verification-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(verifyCodeReq), // VerifyCodeReq 형식으로 요청
      });

      if (!response.ok) {
        throw new Error('인증번호 전송에 실패했습니다.');
      }

      setMessage('인증번호가 전송되었습니다.');
      setError('');
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message || '서버와의 통신에 실패했습니다.');
      } else {
        setError('알 수 없는 오류가 발생했습니다.');
      }
      setMessage('');
    }
  };

  // 아이디 찾기 폼 제출 핸들러
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !phoneNumber || !certificationNumber) {
      setError('모든 필드를 입력해주세요.');
      return;
    }

    const checkCodeReq: CheckCodeReq = { name, phoneNumber, certificationNumber };

    try {
      const response = await fetch('http://18.209.20.212:8080/api/users/find-username', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(checkCodeReq), // CheckCodeReq 형식으로 요청
      });

      if (!response.ok) {
        throw new Error('아이디 찾기에 실패했습니다.');
      }

      const data = await response.json();
      setMessage(`아이디: ${data.username}`);
      setError('');
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message || '서버와의 통신에 실패했습니다.');
      } else {
        setError('알 수 없는 오류가 발생했습니다.');
      }
      setMessage('');
    }
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
          <div className="findidphoneNumber">전화번호</div>
          <div className="phone-number-container"> {/* 전화번호와 버튼을 감싸는 컨테이너 */}
            <input
              type="text"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="전화번호를 입력해주세요"
            />
            <button 
              type="button" 
              className="certification-button-fi"
              onClick={handleSendCertification}
            >
              인증번호
            </button>
          </div>
        </div>
        <div className="form-group-fi">
          <div className="findidcertificationNumber">인증번호</div> {/* 인증번호 입력칸 추가 */}
          <input
            type="text"
            id="certificationNumber"
            value={certificationNumber}
            onChange={(e) => setCertificationNumber(e.target.value)}
            placeholder="인증번호를 입력해주세요"
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
