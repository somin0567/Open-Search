import useSignOut from "../hooks/useSignOut";

const Logout = () => {
  const handleSignout = useSignOut();
  return (
    <div className="pt-16 flex justify-center items-center h-screen overflow-hidden">
      <div className="p-10 w-full max-w-sm">
        <form className="flex flex-col gap-4">
          <button
            type="button"
            onClick={handleSignout}
            className="btn w-full mt-4 py-2"
          >
            로그아웃
          </button>
        </form>
      </div>
    </div>
  );
};

export default Logout;
