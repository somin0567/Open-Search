import { useNavigate, useParams } from "react-router-dom";
import useAiStore from "../store/AiStore";
import useAuthStore from "../store/AuthStore";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { fireStore } from "../firebase";

const AiView = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const getAiById = useAiStore((state) => state.getAiById);
  const aiItem = getAiById(id!);

  const { user } = useAuthStore();

  const [avgStar, setAvgStar] = useState<number | null>(null);
  const [recommendList, setRecommendList] = useState<string[]>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      if (!aiItem) return;
      const reviewsRef = collection(fireStore, `ai/${aiItem.id}/reviews`);
      const snapshot = await getDocs(reviewsRef);
      const reviews = snapshot.docs.map((doc) => doc.data());

      const starArr = reviews
        .map((r) => r.star)
        .filter((v): v is number => typeof v === "number");
      const avg =
        starArr.length > 0
          ? starArr.reduce((a, b) => a + b, 0) / starArr.length
          : null;
      setAvgStar(avg);

      const recommends = [
        ...new Set(
          reviews
            .map((r) => r.recommend)
            .filter((v): v is string => !!v && v.trim() != ""),
        ),
      ];
      setRecommendList(recommends);
    };
    fetchReviews();
  }, [aiItem]);

  if (!aiItem) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center bg-white">
        <div className="text-gray-500">AI 정보를 찾을 수 없습니다.</div>
      </div>
    );
  }

  const handleReviewClick = () => {
    if (!user) {
      alert("로그인 후 리뷰 작성해주세요.");
      navigate("/signin");
      return;
    }
    navigate(`/ai/${id}/review`);
  };

  return (
    <div className="pt-16 p-8 w-full min-h-screen flex justify-center">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <div className="w-24 h-24 mb-4 flex items-center justify-center">
            <img
              src={aiItem.image}
              alt={aiItem.name}
              className="w-20 h-20 object-contain"
            />
          </div>
          <div className="text-2xl font-bold">{aiItem.name}</div>
          <div className="text-gray-500 text-sm mb-2">{aiItem.category}</div>
          <div className="rating rating-lg rating-half">
            <input
              type="radio"
              name="avg-rating"
              className="rating-hidden"
              aria-label="0 stars"
              readOnly
              tabIndex={-1}
            />
            {[...Array(10)].map((_, i) => {
              const value = (i + 1) * 0.5;
              const checked =
                typeof avgStar === "number" && Math.abs(value - avgStar) < 0.26;
              return (
                <input
                  key={value}
                  type="radio"
                  name="avg-rating"
                  className={`mask mask-star-2 ${i % 2 === 0 ? "mask-half-1" : "mask-half-2"} bg-yellow-400`}
                  aria-label={`${value} star`}
                  checked={checked}
                  readOnly
                  tabIndex={-1}
                />
              );
            })}
          </div>
        </div>
        <div className="divider"></div>

        <div className="mb-6 flex flex-col">
          <div className="font-bold mb-2">요금</div>
          <div className="flex flex-row gap-8 justify-center">
            <div className="flex flex-col items-center">
              <span className="text-gray-500 text-sm">Plus</span>
              <span className="font-bold">{aiItem.price}</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-gray-500 text-sm">Pro</span>
              <span className="font-bold">20$</span>
            </div>
          </div>
        </div>

        <div className="mb-6 flex gap-2 flex-wrap">
          {recommendList.length > 0 ? (
            recommendList.map((rec) => (
              <button
                key={rec}
                className="border rounded-full px-4 py-1 text-sm"
                disabled
              >
                {rec}
              </button>
            ))
          ) : (
            <span className="text-gray-400 text-sm">
              등록된 추천 작업이 없습니다
            </span>
          )}
        </div>
        <div className="divider"></div>

        <div>
          <div className="font-bold mb-2">리뷰</div>
          <div className="text-gray-400 text-center py-8">리뷰가 없음</div>
          <button
            className="btn mt-4 w-full py-2 font-semibold"
            onClick={handleReviewClick}
          >
            리뷰 쓰기
          </button>
        </div>
      </div>
    </div>
  );
};

export default AiView;
