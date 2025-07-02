import { useNavigate, useParams } from "react-router-dom";

const AiView = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div className="pt-16 p-8 w-full min-h-screen flex justify-center">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <div className="w-24 h-24 mb-4 flex items-center justify-center">
            {/*로고*/}
          </div>
          <div className="text-2xl font-bold">chat gpt</div>
          <div className="text-gray-500 text-sm mb-2">텍스트 생성</div>
          <div className="flex items-center gap-1">{/* 별점 */}</div>
        </div>
        <hr className="mb-6" />

        <div className="mb-6 flex flex-col">
          <div className="font-bold mb-2">요금</div>
          <div className="flex flex-row gap-8 justify-center">
            <div className="flex flex-col items-center">
              <span className="text-gray-500 text-sm">Plus</span>
              <span className="font-bold">20$</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-gray-500 text-sm">Pro</span>
              <span className="font-bold">20$</span>
            </div>
          </div>
        </div>

        <div className="mb-6 flex gap-2">
          <button className="border rounded-full px-4 py-1 text-sm">
            추천 작업
          </button>
          <button className="border rounded-full px-4 py-1 text-sm">
            추천
          </button>
          <button className="border rounded-full px-4 py-1 text-sm">
            작업
          </button>
        </div>
        <hr className="mb-6" />

        <div>
          <div className="font-bold mb-2">리뷰</div>
          <div className="text-gray-400 text-center py-8">리뷰가 없음</div>
          <button
            className="btn mt-4 w-full py-2 font-semibold"
            onClick={() => navigate(`/ai/${id}/review`)}
          >
            리뷰 쓰기
          </button>
        </div>
      </div>
    </div>
  );
};

export default AiView;
