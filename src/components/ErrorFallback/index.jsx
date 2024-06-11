import { useNavigate } from "react-router-dom";

function ErrorFallback({ error, resetError }) {
  const navigate = useNavigate();
  let errorMessage = "에러가 발생했습니다. 잠시 후 다시 시도해주세요!";
  let errorDetail = error?.message || "알 수 없는 에러가 발생했습니다.";
  let isUnauthorized = false;

  switch (error?.response?.status) {
    case 401:
      errorMessage = "로그인 해주세요.";
      errorDetail = "접근 권한이 없습니다. 로그인 후 다시 시도해주세요.";
      isUnauthorized = true;
      break;
    case 404:
      errorMessage = "존재하지 않는 페이지입니다.";
      errorDetail = "요청한 페이지를 찾을 수 없습니다. URL을 확인해주세요.";
      break;
    case 405:
      errorMessage = "존재하지 않는 설문입니다.";
      errorDetail = "이미 삭제된 설문입니다.";
      break;
    case 500:
      errorMessage = "서버 측 에러입니다.";
      errorDetail = "서버 측 에러입니다.";
      break;
    default:
      if (error?.message.includes("Network Error")) {
        errorMessage = "네트워크 에러입니다.";
        errorDetail = "네트워크 연결을 확인하고 다시 시도해주세요.";
      }
      break;
  }

  const handleClick = () => {
    if (isUnauthorized) {
      navigate("/");
    } else {
      resetError();
    }
  };

  return (
    <div>
      <h1>{errorMessage}</h1>
      <br></br>
      <pre>{errorDetail}</pre>
      <br></br>
      <button type="button" onClick={handleClick}>
        {isUnauthorized ? "로그인하러 가기" : "다시 시도"}
      </button>
    </div>
  );
}

export default ErrorFallback;
