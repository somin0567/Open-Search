import { useMemo, useState } from "react";
import Fuse from "fuse.js";
import aiDb from "../db/data.json";
import AiList from "../views/AiList";
import type { AiItem } from "../store/AiStore";

const Search = () => {
  const [query, setQuery] = useState("");

  const fuse = useMemo(
    () =>
      new Fuse(aiDb, {
        keys: ["name", "category"],
        threshold: 0.6,
      }),
    [],
  );

  const filteredAiList: AiItem[] = query
    ? fuse.search(query).map((result) => result.item)
    : aiDb;

  return (
    <div className="pt-20 flex flex-col h-screen bg-white">
      <div className="fixed top-16 z-10 w-full flex justify-center bg-white">
        <div className="p-6 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl">
          <input
            type="text"
            placeholder="검색어를 입력해주세요."
            className="input input-bordered w-full pl-10 text-base sm:text-lg"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="pt-16 w-full flex-1 overflow-y-auto flex justify-center">
        <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl">
          <AiList aiList={filteredAiList} />
        </div>
      </div>
    </div>
  );
};

export default Search;
