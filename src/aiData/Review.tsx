import { useReducer, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAiStore, { type AiItem } from "../store/AiStore";
import useAuthStore from "../store/AuthStore";
import { fireStore } from "../firebase";
import { collection, doc, setDoc, Timestamp } from "firebase/firestore";

type State = {
  purpose: string | null;
  accuracy: number | null;
  usefulness: number | null;
  speed: number | null;
  star: number | null;
};

type Action =
  | { type: "SET_PURPOSE"; payload: string }
  | { type: "SET_ACCURACY"; payload: number }
  | { type: "SET_USEFULNESS"; payload: number }
  | { type: "SET_SPEED"; payload: number }
  | { type: "SET_STAR"; payload: number | null };

const initialState: State = {
  purpose: null,
  accuracy: null,
  usefulness: null,
  speed: null,
  star: null,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_PURPOSE":
      return { ...state, purpose: action.payload };
    case "SET_ACCURACY":
      return { ...state, accuracy: action.payload };
    case "SET_USEFULNESS":
      return { ...state, usefulness: action.payload };
    case "SET_SPEED":
      return { ...state, speed: action.payload };
    case "SET_STAR":
      return { ...state, star: action.payload };
    default:
      return state;
  }
}

const scoreFields: {
  title: string;
  valueKey: keyof Pick<State, "accuracy" | "usefulness" | "speed">;
  actionType: "SET_ACCURACY" | "SET_USEFULNESS" | "SET_SPEED";
}[] = [
  { title: "정확성", valueKey: "accuracy", actionType: "SET_ACCURACY" },
  { title: "유용성", valueKey: "usefulness", actionType: "SET_USEFULNESS" },
  { title: "속도", valueKey: "speed", actionType: "SET_SPEED" },
];

const AiReviewForm = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [recommend, setRecommend] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const getAiById = useAiStore((store) => store.getAiById);
  const aiItem: AiItem | undefined = getAiById?.(id!);

  const { user } = useAuthStore();

  if (!aiItem) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center bg-white">
        <div className="text-gray-500">AI 정보를 찾을 수 없습니다.</div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      alert("로그인 해주세요");
      navigate("/signin");
      return;
    }

    if (
      !state.purpose ||
      !state.accuracy ||
      !state.usefulness ||
      !state.speed ||
      !state.star
    ) {
      alert("모든 항목을 입력해주세요");
      return;
    }

    try {
      const reviewRef = doc(collection(fireStore, `ai/${aiItem.id}/reviews`));
      await setDoc(reviewRef, {
        userId: user.uid,
        purpose: state.purpose,
        accuracy: state.accuracy,
        usefulness: state.usefulness,
        speed: state.speed,
        star: state.star,
        recommend,
        timestamp: Timestamp.now(),
      });

      alert("리뷰가 등록되었습니다");
      navigate(`/ai/${aiItem.id}`);
    } catch (error) {
      console.log("리뷰 등록 실패:", error);
      alert("리뷰 등록에 실패했습니다");
    }
  };

  const renderStars = () => (
    <div className="rating rating-lg rating-half">
      <input
        type="radio"
        name="star"
        className="rating-hidden"
        aria-label="0 stars"
        checked={state.star === null}
        onChange={() => dispatch({ type: "SET_STAR", payload: null })}
        readOnly
        tabIndex={-1}
      />
      {[...Array(10)].map((_, i) => {
        const value = (i + 1) * 0.5;
        return (
          <input
            key={value}
            type="radio"
            name="star"
            className={`mask mask-star-2 ${
              i % 2 === 0 ? "mask-half-1" : "mask-half-2"
            } bg-yellow-400`}
            aria-label={`${value} star`}
            checked={state.star === value}
            onChange={() => dispatch({ type: "SET_STAR", payload: value })}
          />
        );
      })}
    </div>
  );

  return (
    <div className="pt-16 min-h-screen flex items-center justify-center bg-white">
      <form className="w-full max-w-md p-8" onSubmit={handleSubmit}>
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 flex items-center justify-center">
            <img
              src={aiItem.image}
              alt={aiItem.name}
              className="w-12 h-12 object-contain"
            />
          </div>
          <div>
            <div className="text-lg font-bold">{aiItem.name}</div>
            <div className="text-gray-500 text-sm">{aiItem.category}</div>
          </div>
        </div>
        <div className="divider"></div>

        <div className="mb-4">
          <div className="font-bold mb-1">사용 목적</div>
          <div className="flex gap-2 flex-wrap">
            {["학습", "비즈니스", "취미", "기타"].map((item) => (
              <label
                key={item}
                className={`flex items-center gap-1 border rounded-2xl px-3 py-1 text-sm cursor-pointer ${
                  state.purpose === item ? "bg-gray-200" : ""
                }`}
              >
                <input
                  type="radio"
                  name="purpose"
                  value={item}
                  checked={state.purpose === item}
                  onChange={() =>
                    dispatch({ type: "SET_PURPOSE", payload: item })
                  }
                  className="hidden"
                />
                <span>{item}</span>
              </label>
            ))}
          </div>
        </div>

        {scoreFields.map(({ title, valueKey, actionType }) => (
          <div key={valueKey} className="mb-4">
            <div className="font-bold mb-1">{title}</div>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((n) => (
                <label
                  key={n}
                  className={`flex items-center justify-center w-8 h-8 border rounded-lg cursor-pointer ${
                    state[valueKey] === n ? "bg-gray-200" : ""
                  }`}
                >
                  <input
                    type="radio"
                    name={valueKey}
                    value={n}
                    checked={state[valueKey] === n}
                    onChange={() => dispatch({ type: actionType, payload: n })}
                    className="hidden"
                  />
                  <span>{n}</span>
                </label>
              ))}
            </div>
          </div>
        ))}

        <div className="mb-4">
          <div className="font-bold mb-1">만족도</div>
          {renderStars()}
        </div>

        <div className="mb-4">
          <div className="font-bold mb-1">추천 작업</div>
          <input
            type="text"
            className="input w-full"
            placeholder="추천 작업을 입력해주세요"
            value={recommend}
            onChange={(e) => setRecommend(e.target.value)}
          />
        </div>

        <button className="w-full py-2 btn font-semibold" type="submit">
          작성 완료
        </button>
      </form>
    </div>
  );
};

export default AiReviewForm;
