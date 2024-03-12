import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

import useGoogleLogin from "../../apis/useGoogleLogin";

function InitialPage() {
  const handleLogin = useGoogleLogin();

  return (
    <div>
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="text-4xl font-semibold z-10">Survey101</div>
        <img
          src="/assets/survey-icon.png"
          alt="survey-icon"
          className="mt-10 mb-10 ml-7"
          width="200"
          height="200"
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleLogin}
        >
          <FontAwesomeIcon icon={faGoogle} className="text-xl mr-2" />
          <span>Signin with Google</span>
        </button>
      </div>
    </div>
  );
}

export default InitialPage;
