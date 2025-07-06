import { useNavigate } from "react-router-dom";

const Main = () => {
  const navigate = useNavigate();

  return (
    <div className="pt-16 flex justify-center items-center h-screen overflow-hidden">
      <div className="p-10 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl">
        <div className="flex flex-col gap-4 sm:gap-6">
          <button
            className="btn px-6 py-3 text-base sm:text-lg md:text-xl"
            onClick={() => navigate("/search")}
          >
            검색하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default Main;
