import { useNavigate } from "react-router-dom";

export interface AiItem {
  id: number;
  name: string;
  category: string;
  image: string;
}

interface AiListProps {
  aiList?: AiItem[];
}

const AiList = ({ aiList }: AiListProps) => {
  const safeAiList = aiList || [];
  const navigate = useNavigate();

  return (
    <ul className="flex flex-col gap-4">
      {safeAiList.map((item) => (
        <li
          key={item.id}
          onClick={() => navigate("/ai/${item.id}")}
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
