import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const KakaoAuth: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const authCode = searchParams.get('code');

    if (authCode) {
      // 카카오 API로 액세스 토큰을 요청
      const getAccessToken = async () => {
        try {
          const clientId = 'c1cf3f3adfcae6267cfe6f3afb78b583'; // 카카오 REST API 키
          const redirectUri = 'http://localhost:3000/auth/kakao';
          
          const tokenResponse = await fetch(
            `https://kauth.kakao.com/oauth/token`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
              body: new URLSearchParams({
                grant_type: 'authorization_code',
                client_id: clientId,
                redirect_uri: redirectUri,
                code: authCode,
              }).toString(),
            }
          );

          const tokenData = await tokenResponse.json();
          const accessToken = tokenData.access_token;

          if (accessToken) {
            // 액세스 토큰을 사용해 사용자 정보 요청
            const userResponse = await fetch(
              `https://kapi.kakao.com/v2/user/me`,
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
      console.error('카카오 로그인 인증 코드가 없습니다.');
    }
  }, [location, navigate]);

  return <div>카카오 로그인 처리 중...</div>;
};

export default KakaoAuth;
