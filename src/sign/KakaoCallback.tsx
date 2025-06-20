import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const KakaoCallback = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    if (code) {
      const getAccessToken = async () => {
        const restAPIKey = import.meta.env.VITE_APP_KAKAO_REST_API_KEY;
        const redirectUri = import.meta.env.VITE_APP_KAKAO_REDIRECT_URI;
        const tokenUrl = "https://kauth.kakao.com/oauth/token";

        try {
          const tokenResponse = await fetch(tokenUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
            },
            body: new URLSearchParams({
              grant_type: "authorization_code",
              client_id: restAPIKey,
              redirect_uri: redirectUri,
              code,
            }),
          });
          const tokenData = await tokenResponse.json();
          const accessToken = tokenData.access_token;

          const userInfoResponse = await fetch(
            "https://kapi.kakao.com/v2/user/me",
            {
              headers: { Authorization: `Bearer ${accessToken}` },
            },
          );
          const userInfo = await userInfoResponse.json();
          setUserInfo(userInfo);

          //로컬 스토리지 임시로 해둠
          localStorage.setItem("kakaoUser", JSON.stringify(userInfo));
          navigate("/");
        } catch (error) {
          console.error("카카오 로그인 처리 중 오류:", error);
          navigate("/login");
        }
      };
      getAccessToken();
    }
  }, [navigate]);

  return (
    <div>
      {userInfo ? (
        <div>사용자 정보: {JSON.stringify(userInfo)}</div>
      ) : (
        <div>카카오 로그인 중...</div>
      )}
    </div>
  );
};

export default KakaoCallback;
