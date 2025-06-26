export interface AiItem {
  id: number;
  name: string;
  category: string;
}

interface AiListProps {
  aiList?: AiItem[];
}

const AiList = ({ aiList }: AiListProps) => {
  const safeAiList = aiList || [];

  return (
    <ul className="flex flex-col gap-4">
      {safeAiList.map((item) => (
        <li
          key={item.id}
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
            <div className="font-bold text-base">{item.name}</div>
            <div className="text-xs text-gray-400">{item.category}</div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default AiList;
