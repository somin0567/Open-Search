import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/AuthStore";

const Header = () => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const navigate = useNavigate();

  const handleHeaderBtn = () => {
    if (isLoggedIn) {
      navigate("/signout");
    } else {
      navigate("/signin");
    }
  };

  return (
    <header className="w-full px-4 py-3 flex items-center justify-between bg-white shadow fixed top-0 left-0 z-50">
      <div
        className="text-xl font-bold cursor-pointer"
        onClick={() => navigate("/")}
      >
        Home
      </div>
      <div className="flex justify-end w-full p-2">
        <button
          className="btn btn-circle bg-neutral text-neutral-content p-2 rounded-full"
          onClick={handleHeaderBtn}
        >
          <svg
            width="20"
            height="20"
            fill="none"
            stroke="white"
            strokeWidth="2"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle cx="12" cy="8" r="4" />
            <path d="M4 20c0-4 8-4 8-4s8 0 8 4" />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
