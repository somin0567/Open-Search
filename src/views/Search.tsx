const Search = () => {
  return (
    <div className="pt-16 flex justify-center h-screen bg-white">
      <div className="w-full max-w-sm">
        <div className="sticky top-16 z-10 mb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="검색어를 입력하세요"
              className="input input-bordered w-full pl-10"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <svg
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
            </span>
          </div>
        </div>

        <ul className="flex flex-col gap-4 overflow-y-auto">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <li
              key={item}
              className="flex items-center gap-4 cursor-pointer hover:bg-gray-100 rounded-lg p-2"
            >
              <div className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full">
                <svg
                  width="32"
                  height="32"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v4l3 3" />
                </svg>
              </div>
              <div>
                <div className="font-bold text-base">chat gpt</div>
                <div className="text-xs text-gray-400">통합형 AI</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Search;
