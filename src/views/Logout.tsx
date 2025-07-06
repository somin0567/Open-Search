import SignOut from "../sign/SignOut";

const Logout = () => {
  const handleSignout = SignOut();
  return (
    <div className="pt-16 flex justify-center items-center h-screen overflow-hidden">
      <div className="p-10 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl">
        <form className="flex flex-col gap-4 sm:gap-6">
          <button
            type="button"
            onClick={handleSignout}
            className="btn w-full mt-4 py-2 text-base sm:text-lg"
          >
            로그아웃
          </button>
        </form>
      </div>
    </div>
  );
};

export default Logout;
