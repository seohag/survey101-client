import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <div>
      <p>존재하지 않는 주소 입니다.</p>
      <Link to="/">
        <p>메인 페이지로 돌아가기</p>
      </Link>
    </div>
  );
}

export default ErrorPage;
