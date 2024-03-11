import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <div>
      <p>Error!</p>
      <Link to="/">
        <p>메인 페이지로 돌아가기</p>
      </Link>
    </div>
  );
}

export default ErrorPage;
