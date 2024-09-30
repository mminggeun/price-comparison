import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const NaverAuth: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const authCode = searchParams.get('code');
    const state = searchParams.get('state');

    if (authCode && state) {
      // 네이버 API로 액세스 토큰 요청
      const getAccessToken = async () => {
        try {
          const clientId = 'Q70cMQb9uvxhQwuOPy5C'; // 네이버 클라이언트 아이디
          const clientSecret = '4IVTEGcDLV'; // 네이버 클라이언트 시크릿
          const redirectUri = 'http://localhost:3000/auth/naver'; // 리다이렉트 URI

          const tokenResponse = await fetch(
            `https://nid.naver.com/oauth2.0/token`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
              body: new URLSearchParams({
                grant_type: 'authorization_code',
                client_id: clientId,
                client_secret: clientSecret,
                redirect_uri: redirectUri,
                code: authCode,
                state: state,
              }).toString(),
            }
          );

          const tokenData = await tokenResponse.json();
          const accessToken = tokenData.access_token;

          if (accessToken) {
            // 액세스 토큰으로 사용자 정보 요청
            const userResponse = await fetch(
              `https://openapi.naver.com/v1/nid/me`,
              {
                method: 'GET',
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              }
            );

            const userData = await userResponse.json();
            console.log('사용자 정보:', userData); // 사용자 정보를 콘솔에 출력

            // 로그인 후 메인 페이지로 이동
            navigate('/');
          }
        } catch (error) {
          console.error('토큰 요청 오류:', error);
        }
      };

      getAccessToken();
    } else {
      console.error('네이버 로그인 인증 코드 또는 상태 값이 없습니다.');
    }
  }, [location, navigate]);

  return <div>네이버 로그인 처리 중...</div>;
};

export default NaverAuth;
