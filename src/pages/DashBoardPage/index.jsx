import useGoogleLogOut from "../../apis/useGoogleLogout";

function DashBoardPage() {
  const handleLogOut = useGoogleLogOut();

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <div className="text-2xl font-bold">전체 설문</div>
        <div className="flex items-center space-x-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
            응답 인사이트 및 보기
          </button>
          <button
            onClick={handleLogOut}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            로그아웃
          </button>
        </div>
      </div>
      <div className="flex flex-wrap mt-4 mx-4">
        <div>Hello</div>
      </div>
    </div>
  );
}

export default DashBoardPage;
