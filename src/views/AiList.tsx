import { useNavigate } from "react-router-dom";
import type { AiItem } from "../store/AiStore";
import useAiStore from "../store/AiStore";

interface AiListProps {
  aiList: AiItem[];
}

const AiList = ({ aiList }: AiListProps) => {
  const setSelectedAi = useAiStore((state) => state.setSelectedAi);
  const navigate = useNavigate();

  return (
    <ul className="flex flex-col gap-4">
      {aiList.map((item) => (
        <li
          key={item.id}
          onClick={() => {
            setSelectedAi(item);
            navigate(`/ai/${item.id}`);
          }}
          className="flex items-center gap-4 cursor-pointer hover:bg-gray-100 rounded-lg p-2"
        >
          <div className="w-10 h-10 flex items-center justify-center rounded-full">
            <img
              src={item.image}
              alt={item.name}
              className="w-8 h-8 object-contain"
            />
          </div>
          <div>
            <div className="font-bold text-base">{item.name}</div>
            <div className="text-xs text-gray-400">{item.category}</div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default AiList;
