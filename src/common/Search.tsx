import { useEffect, useState } from "react";
import aiDb from "../db/data.json";
import AiList, { type AiItem } from "../views/AiList";

const Search = () => {
  const [query, setQuery] = useState("");
  const [filteredAiList, setFilteredAiList] = useState<AiItem[]>([]);

  useEffect(() => {
    const filtered = aiDb.filter(
      (item) =>
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase()),
    );
    setFilteredAiList(filtered);
  }, [query]);

  return (
    <div className="pt-16 flex flex-col h-screen bg-white">
      <div className="fixed top-16 z-10 w-full flex justify-center bg-white">
        <div className="p-4 w-full max-w-sm">
          <input
            type="text"
            placeholder="검색어를 입력해주세요."
            className="input input-bordered w-full pl-10"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="pt-16 w-full flex flex-1 overflow-y-auto justify-center">
        <div className="w-full max-w-sm">
          <AiList aiList={filteredAiList} />
        </div>
      </div>
    </div>
  );
};

export default Search;
