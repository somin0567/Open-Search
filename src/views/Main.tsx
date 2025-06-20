import { useNavigate } from "react-router-dom";

const Main = () => {
  const navigate = useNavigate();

  return (
    <div className=" pt-16 flex justify-center items-center h-screen overflow-hidden">
      <div className="p-10 w-full max-w-sm">
        <div className="flex flex-col gap-4">
          <button className="btn" onClick={() => navigate("/search")}>
            검색하기
          </button>
          <button className="btn">리뷰 쓰기</button>
        </div>
      </div>
    </div>
  );
};

export default Main;
