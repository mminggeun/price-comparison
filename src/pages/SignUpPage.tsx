import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 페이지 이동을 위한 훅
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import loginpage from "../assets/loginpage.png";
import '../styles/SignUpPage.css'; // 스타일 파일 import
import { TermsAndConditions } from "../services/terms1"; // 약관 파일 
import { TermsAndConditions2 } from "../services/terms2"; // 약관 파일 import

// 회원가입 폼 유효성 검사 스키마
const validationSchema = Yup.object({
  username: Yup.string()
    .min(4, '아이디는 최소 4글자 이상이어야 합니다.')
    .required('아이디를 입력해주세요.'),
  email: Yup.string().email('유효한 이메일을 입력해주세요.').required('이메일을 입력해주세요.'),
  password: Yup.string()
    .min(8, '비밀번호는 최소 8자 이상이어야 합니다.')
    .required('비밀번호를 입력해주세요.'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], '비밀번호가 일치하지 않습니다.')
    .required('비밀번호를 다시 입력해주세요.'),
  phoneNumber: Yup.string()
    .matches(/^[0-9]{10,11}$/, '유효한 전화번호를 입력해주세요.')
    .required('전화번호를 입력해주세요.'),
  name: Yup.string()
    .required('이름을 입력해주세요.')
});

const SignUpPage: React.FC = () => {
  const navigate = useNavigate(); // 페이지 이동을 위한 훅
  const [isTermsChecked, setIsTermsChecked] = useState(false); // 이용약관 체크 상태
  const [isPrivacyChecked, setIsPrivacyChecked] = useState(false); // 개인정보 처리방침 체크 상태
  const [isTermsAccepted, setIsTermsAccepted] = useState(false); // 최종 체크 상태

  const handleImageClick = () => {
    navigate("/"); // 홈 경로로 이동
  };

  // 체크박스 핸들러
  const handleTermsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsTermsChecked(e.target.checked);
  };

  const handlePrivacyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsPrivacyChecked(e.target.checked);
  };

  // "다음" 버튼 클릭 시 회원가입 폼을 띄우기 위한 함수
  const handleNextClick = () => {
    if (isTermsChecked && isPrivacyChecked) {
      setIsTermsAccepted(true);
    }
  };

  // 회원가입 폼 제출 처리 함수
  const handleSubmit = (values: any) => {
    console.log(values); // 폼 제출 시 처리 로직 (예: 서버 요청)
    navigate('/'); // 회원가입 성공 후 리디렉션
  };

  return (
    <div className="signup-container">
      <img
        src={loginpage}
        alt="Login Page"
        className="login-image"
        onClick={handleImageClick} // 클릭 핸들러 추가
        style={{ cursor: 'pointer' }} // 클릭 가능한 상태로 보이게 스타일링
      />
      {!isTermsAccepted ? (
        <div className="terms-container">
          <h3>이용약관 동의</h3>
          <p>회원가입을 하기 위해 아래 약관을 읽고 동의해주세요.</p>

          {/* 약관 컴포넌트 삽입 */}
          <div className="terms-box">
            <TermsAndConditions />
          </div>

          <div className="terms1">
            <label>
              <input
                type="checkbox"
                id="terms"
                onChange={handleTermsChange}
                checked={isTermsChecked}
              />
              이용약관에 동의합니다.
            </label>
          </div>
        
          <div className="terms-box">
            <TermsAndConditions2 />
          </div>

          <div className="terms2">
            <label>
              <input
                type="checkbox"
                id="privacy"
                onChange={handlePrivacyChange}
                checked={isPrivacyChecked}
              />
              개인정보 처리방침에 동의합니다.
            </label>
          </div>

          <button
            className="signup-button1"
            disabled={!(isTermsChecked && isPrivacyChecked)} // 두 체크박스 모두 선택되면 버튼 활성화
            onClick={handleNextClick}
          >
            다음
          </button>
        </div>
      ) : (
        // 회원가입 폼
        <Formik
          initialValues={{
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            phoneNumber: '',
            name: ''
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="form-group-su">
                <div className="field-label">아이디</div>
                <Field name="username" type="text" className="input-field" placeholder="8~12 자리의 영문, 숫자만 가능"/>
                <ErrorMessage name="username" component="div" className="error-message" />
              </div>

              <div className="form-group-su">
                <div className="field-label">비밀번호</div>
                <Field name="password" type="password" className="input-field" placeholder="8~15 자리의 영문자, 숫자, 특수문자 3가지 조합"/>
                <ErrorMessage name="password" component="div" className="error-message" />
              </div>

              <div className="form-group-su">
                <div className="field-label">비밀번호 확인</div>
                <Field name="confirmPassword" type="password" className="input-field" />
                <ErrorMessage name="confirmPassword" component="div" className="error-message" />
              </div>

              <div className="form-group-su">
                <div className="field-label">이메일</div>
                <Field name="email" type="email" className="input-field" placeholder="example@naver.com"/>
                <ErrorMessage name="email" component="div" className="error-message" />
              </div>

              <div className="form-group-su">
                <div className="field-label">이름</div>
                <Field name="name" type="text" className="input-field" />
                <ErrorMessage name="name" component="div" className="error-message" />
              </div>

              <div className="form-group-su">
                <div className="field-label">전화번호</div>
                <Field name="phoneNumber" type="text" className="input-field" placeholder="01012345678"/>
                <ErrorMessage name="phoneNumber" component="div" className="error-message" />
              </div>

              <button type="submit" className="signup-button2" disabled={isSubmitting}>
                회원가입
              </button>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};

export default SignUpPage;
