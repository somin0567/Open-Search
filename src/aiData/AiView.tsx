import { useNavigate, useParams } from "react-router-dom";
import useAiStore from "../store/AiStore";
import useAuthStore from "../store/AuthStore";
import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { fireStore } from "../firebase";
import AiComments from "./AiComments";

const calcAvg = (arr: unknown[]): number | null => {
  const nums = arr.filter((v): v is number => typeof v === "number");
  if (nums.length === 0) return null;
  return nums.reduce((a, b) => a + b, 0) / nums.length;
};

const AiView = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const getAiById = useAiStore((state) => state.getAiById);
  const aiItem = getAiById(id!);

  const { user } = useAuthStore();

  const [avgStar, setAvgStar] = useState<number | null>(null);
  const [avgAccuracy, setAvgAccuracy] = useState<number | null>(null);
  const [avgUsefulness, setAvgUsefulness] = useState<number | null>(null);
  const [avgSpeed, setAvgSpeed] = useState<number | null>(null);
  const [recommendList, setRecommendList] = useState<string[]>([]);
  const [comments, setComments] = useState<
    { nickname: string; comment: string }[]
  >([]);

  const fetchComments = async () => {
    if (!aiItem) return;
    const reviewsRef = collection(fireStore, `ai/${aiItem.id}/reviews`);
    const snapshot = await getDocs(reviewsRef);
    const reviews = snapshot.docs.map((doc) => doc.data());

    setAvgStar(calcAvg(reviews.map((r) => r.star)));
    setAvgAccuracy(calcAvg(reviews.map((r) => r.accuracy)));
    setAvgUsefulness(calcAvg(reviews.map((r) => r.usefulness)));
    setAvgSpeed(calcAvg(reviews.map((r) => r.speed)));

    const recommends = [
      ...new Set(
        reviews
          .map((r) => r.recommend)
          .filter((v): v is string => !!v && v.trim() !== ""),
      ),
    ];
    setRecommendList(recommends);

    setComments(
      reviews
        .filter((r) => r.comment && r.comment.trim() !== "")
        .map((r) => ({
          nickname: r.nickname || "익명",
          comment: r.comment,
        })),
    );
  };

  useEffect(() => {
    fetchComments();
  }, [aiItem]);

  if (!aiItem) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center bg-white">
        <div className="text-gray-500">AI 정보를 찾을 수 없습니다.</div>
      </div>
    );
  }

  const handleAddComment = async (comment: string) => {
    if (!user) return;
    const reviewDocRef = doc(fireStore, `ai/${aiItem.id}/reviews`, user.uid);
    const reviewSnap = await getDoc(reviewDocRef);

    if (!reviewSnap.exists()) {
      await setDoc(
        reviewDocRef,
        {
          comment,
          nickname: user.displayName || "익명",
        },
        { merge: true },
      );
    } else {
      await updateDoc(reviewDocRef, {
        comment,
        nickname: user.displayName || "익명",
      });
    }
    await fetchComments();
  };

  const handleReviewClick = async () => {
    if (!user) {
      alert("로그인 후 리뷰 작성해주세요.");
      navigate("/signin");
      return;
    }

    const reviewDocRef = doc(fireStore, `ai/${aiItem.id}/reviews`, user.uid);
    const reviewSnap = await getDoc(reviewDocRef);
    if (reviewSnap.exists()) {
      alert("이미 리뷰를 등록하셨습니다.");
      return;
    }
    navigate(`/ai/${id}/review`);
  };

  return (
    <div className="pt-20 p-8 w-full min-h-screen flex justify-center">
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
          <div className="flex items-center gap-2">
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
                  typeof avgStar === "number" &&
                  Math.abs(value - avgStar) < 0.26;
                return (
                  <input
                    key={value}
                    type="radio"
                    name="avg-rating"
                    className={`mask mask-star-2 ${
                      i % 2 === 0 ? "mask-half-1" : "mask-half-2"
                    } bg-yellow-400`}
                    aria-label={`${value} star`}
                    checked={checked}
                    readOnly
                    tabIndex={-1}
                  />
                );
              })}
            </div>
            <span className="text-gray-600 text-sm">
              {avgStar !== null ? avgStar.toFixed(1) : "0.0"} / 5
            </span>
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
          </div>
        </div>
        <div className="mb-4 flex gap-2 flex-wrap">
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
          <div className="flex flex-col gap-2">
            <div>
              <span className="font-semibold">정확성: </span>
              {avgAccuracy !== null ? avgAccuracy : "-"}
            </div>
            <div>
              <span className="font-semibold">유용성: </span>
              {avgUsefulness !== null ? avgUsefulness : "-"}
            </div>
            <div>
              <span className="font-semibold">속도: </span>
              {avgSpeed !== null ? avgSpeed : "-"}
            </div>
          </div>
        </div>

        <div className="divider"></div>

        <AiComments
          comments={comments}
          onAddComment={handleAddComment}
          isLoggedIn={!!user}
          nickname={user?.displayName || "익명"}
        />

        <div className="divider"></div>

        <div>
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
