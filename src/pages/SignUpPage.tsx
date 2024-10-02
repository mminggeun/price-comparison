import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useMutation } from 'react-query';
import axios from 'axios';
import { AxiosError } from 'axios';
import loginpage from "../assets/loginpage.png";
import '../styles/SignUpPage.css';
import { TermsAndConditions } from "../services/terms1";
import { TermsAndConditions2 } from "../services/terms2";

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
  name: Yup.string().required('이름을 입력해주세요.')
});

const SignUpPage: React.FC = () => {
  const navigate = useNavigate();
  const [isTermsChecked, setIsTermsChecked] = useState(false);
  const [isPrivacyChecked, setIsPrivacyChecked] = useState(false);
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);

  const handleImageClick = () => {
    navigate("/");
  };

  const handleTermsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsTermsChecked(e.target.checked);
  };

  const handlePrivacyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsPrivacyChecked(e.target.checked);
  };

  const handleNextClick = () => {
    if (isTermsChecked && isPrivacyChecked) {
      setIsTermsAccepted(true);
    }
  };

  // 회원가입 mutation 정의
  const registerMutation = useMutation(
    async (UserReq: { username: string; email: string; password: string; phoneNumber: string; name: string; role: string;}) => { 
      const response = await axios.post('http://18.209.20.212:8080/api/users/register', UserReq, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    },
    {
      onSuccess: () => {
        alert('회원가입이 성공적으로 완료되었습니다. 이제 로그인하세요.');
        navigate('/login');
      },
      onError: (error: unknown) => { // error 타입을 unknown으로 지정
        if (error instanceof AxiosError) { // AxiosError 타입인지 확인
          if (error.response) {
            console.error('Error response:', error.response.data);
            alert('회원가입 실패: ' + error.response.data.message);
          } else {
            console.error('Error registering user:', error.message); // 에러 메시지 출력
            alert('회원가입 실패: ' + error.message);
          }
        } else {
          console.error('Unknown error:', error); // 예상하지 못한 에러 처리
          alert('회원가입 실패: 알 수 없는 오류가 발생했습니다.');
        }
      },
    }
  );

  // 폼 제출 핸들러
  const handleSubmit = (values: any) => {
    const UserReq = {
      username: values.username,
      email: values.email,
      password: values.password,
      phoneNumber: values.phoneNumber,
      name: values.name,
      role: 'USER'
    };

    console.log(UserReq);

    // 회원가입 mutation 호출
    registerMutation.mutate(UserReq);
  };

  return (
    <div className="signup-container">
      <img
        src={loginpage}
        alt="Login Page"
        className="login-image"
        onClick={handleImageClick}
        style={{ cursor: 'pointer' }}
      />
      {!isTermsAccepted ? (
        <div className="terms-container">
          <h3>이용약관 동의</h3>
          <p>회원가입을 하기 위해 아래 약관을 읽고 동의해주세요.</p>
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
            disabled={!(isTermsChecked && isPrivacyChecked)}
            onClick={handleNextClick}
          >
            다음
          </button>
        </div>
      ) : (
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
                <div className="field-label">이름</div>
                <Field name="name" type="text" className="input-field" />
                <ErrorMessage name="name" component="div" className="error-message" />
              </div>
              <div className="form-group-su">
                <div className="field-label">아이디</div>
                <Field name="username" type="text" className="input-field" />
                <ErrorMessage name="username" component="div" className="error-message" />
              </div>
              <div className="form-group-su">
                <div className="field-label">비밀번호</div>
                <Field name="password" type="password" className="input-field" />
                <ErrorMessage name="password" component="div" className="error-message" />
              </div>
              <div className="form-group-su">
                <div className="field-label">비밀번호 확인</div>
                <Field name="confirmPassword" type="password" className="input-field" />
                <ErrorMessage name="confirmPassword" component="div" className="error-message" />
              </div>
              <div className="form-group-su">
                <div className="field-label">이메일</div>
                <Field name="email" type="email" className="input-field" />
                <ErrorMessage name="email" component="div" className="error-message" />
              </div>
              <div className="form-group-su">
                <div className="field-label">전화번호</div>
                <Field name="phoneNumber" type="text" className="input-field" />
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
