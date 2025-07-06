import type {
  UseFormRegister,
  FieldErrors,
  UseFormHandleSubmit,
} from "react-hook-form";
import { useNavigate } from "react-router-dom";

export type FormType = {
  email: string;
  password: string;
  passwordConfirm: string;
  nickname: string;
};

type SignUpProps = {
  register: UseFormRegister<FormType>;
  handleSubmit: UseFormHandleSubmit<FormType>;
  errors: FieldErrors<FormType>;
  password: string;
  onSubmit: (data: FormType) => void;
};

const SignUp = ({
  register,
  handleSubmit,
  errors,
  password,
  onSubmit,
}: SignUpProps) => {
  const navigate = useNavigate();

  return (
    <div className="pt-16 flex justify-center items-center h-screen overflow-hidden">
      <div className="p-10 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl">
        <h2 className="text-2xl font-bold text-center mb-8">회원 가입</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 sm:gap-6"
        >
          <input
            type="email"
            placeholder="이메일"
            {...register("email", {
              required: true,
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "유효한 이메일 주소를 입력해주세요.",
              },
            })}
            className="input w-full px-4 py-2 text-base sm:text-lg"
          />
          {errors.email && (
            <p className="text-red-500 text-sm sm:text-base mt-1">
              {errors.email.message}
            </p>
          )}
          <input
            type="password"
            placeholder="비밀번호"
            {...register("password", {
              required: true,
              minLength: {
                value: 6,
                message: "비밀번호는 6자 이상이어야 합니다.",
              },
              maxLength: {
                value: 12,
                message: "비밀번호는 12자 이하이어야 합니다.",
              },
            })}
            className="input w-full px-4 py-2 text-base sm:text-lg"
          />
          {errors.password && (
            <p className="text-red-500 text-sm sm:text-base mt-1">
              {errors.password.message}
            </p>
          )}
          <input
            type="password"
            placeholder="비밀번호 확인"
            {...register("passwordConfirm", {
              required: true,
              validate: (value) =>
                value === password || "비밀번호가 일치하지 않습니다.",
            })}
            className="input w-full px-4 py-2 text-base sm:text-lg"
          />
          {errors.passwordConfirm && (
            <p className="text-red-500 text-sm sm:text-base mt-1">
              {errors.passwordConfirm.message}
            </p>
          )}
          <input
            type="text"
            placeholder="닉네임"
            {...register("nickname", {
              required: true,
              maxLength: {
                value: 10,
                message: "닉네임은 10자 이내로 입력해주세요.",
              },
            })}
            className="input w-full px-4 py-2 text-base sm:text-lg"
          />
          {errors.nickname && (
            <p className="text-red-500 text-sm sm:text-base mt-1">
              {errors.nickname.message}
            </p>
          )}
          <button
            type="submit"
            onClick={() => navigate("/signin")}
            className="btn w-full mt-4 py-2 text-base sm:text-lg"
          >
            회원 가입
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
