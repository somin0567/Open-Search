import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 z-10 w-full navbar text-neutral-content bg-white">
      <div className="flex justify-end w-full p-2">
        <button
          aria-label="로그인"
          className="btn btn-circle bg-neutral text-neutral-content p-2 rounded-full"
          onClick={() => navigate("/signin")}
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
