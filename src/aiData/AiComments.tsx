import { useState } from "react";

interface AiComment {
  nickname: string;
  comment: string;
}

interface AiCommentsProps {
  comments: AiComment[];
  onAddComment?: (comment: string) => Promise<void>;
  isLoggedIn?: boolean;
  nickname?: string;
}

const AiComments = ({
  comments,
  onAddComment,
  isLoggedIn = false,
}: AiCommentsProps) => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !onAddComment) return;
    setLoading(true);
    await onAddComment(input.trim());
    setInput("");
    setLoading(false);
  };

  return (
    <div className="mb-6">
      <div className="font-bold mb-2">코멘트</div>
      {comments.length > 0 ? (
        <ul className="flex flex-col gap-2 mb-4">
          {comments.map((c, i) => (
            <li key={i} className="flex items-center gap-2">
              <span className="font-semibold">{c.nickname}</span>
              <span className="text-gray-700">{c.comment}</span>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-gray-400 text-sm mb-4">
          등록된 코멘트가 없습니다
        </div>
      )}

      {isLoggedIn ? (
        <form className="flex gap-2" onSubmit={handleSubmit}>
          <input
            type="text"
            className="input input-bordered flex-1 text-base"
            placeholder="코멘트를 입력하세요"
            value={input}
            maxLength={100}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
          />
          <button
            type="submit"
            className="btn"
            disabled={loading || !input.trim()}
          >
            {loading ? "등록 중..." : "등록"}
          </button>
        </form>
      ) : (
        <div className="text-sm text-gray-400">
          로그인 후 코멘트 작성이 가능합니다.
        </div>
      )}
    </div>
  );
};

export default AiComments;
