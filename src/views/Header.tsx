import { useNavigate } from "react-router-dom";
import AuthChange from "../sign/AuthChange";

const Header = () => {
  const { isLoggedIn } = AuthChange();
  const navigate = useNavigate();

  const handleHeaderBtn = () => {
    if (isLoggedIn) {
      navigate("/signout");
    } else {
      navigate("/signin");
    }
  };

  return (
    <header className="fixed top-0 z-10 w-full navbar text-neutral-content bg-white">
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
