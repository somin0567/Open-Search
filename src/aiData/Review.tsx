import { useReducer } from "react";

type State = {
  purpose: string | null;
  accuracy: number | null;
  usefulness: number | null;
  speed: number | null;
};

type Action =
  | { type: "SET_PURPOSE"; payload: string }
  | { type: "SET_ACCURACY"; payload: number }
  | { type: "SET_USEFULNESS"; payload: number }
  | { type: "SET_SPEED"; payload: number };

const initialState: State = {
  purpose: null,
  accuracy: null,
  usefulness: null,
  speed: null,
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

  return (
    <div className="pt-16 min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md p-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 flex items-center justify-center">
            <svg
              width="48"
              height="48"
              fill="none"
              stroke="black"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v4l3 3" />
            </svg>
          </div>
          <div>
            <div className="text-lg font-bold">ChatGPT</div>
            <div className="text-gray-500 text-sm">텍스트 생성</div>
          </div>
        </div>
        <hr className="mb-4" />

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
          <div key={title} className="mb-4">
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
                    name={title}
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
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((n) => (
              <span
                key={n}
                className={n <= 4 ? "text-yellow-400" : "text-gray-300"}
              >
                <svg
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <polygon points="10,1 12,7 18,7 13,11 15,17 10,13 5,17 7,11 2,7 8,7" />
                </svg>
              </span>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <div className="font-bold mb-1">추천 작업</div>
          <input type="text" className="input w-full" placeholder="내용" />
        </div>

        <button className="w-full py-2 btn font-semibold">작성 완료</button>
      </div>
    </div>
  );
};

export default AiReviewForm;
