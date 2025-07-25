import { useNavigate } from "react-router-dom";
import type {
  UseFormRegister,
  FieldErrors,
  UseFormHandleSubmit,
} from "react-hook-form";
import type { LoginFormType } from "../sign/SignIn";
import GoogleSignIn from "../sign/GoogleSignIn";

type LoginProps = {
  register: UseFormRegister<LoginFormType>;
  handleSubmit: UseFormHandleSubmit<LoginFormType>;
  errors: FieldErrors<LoginFormType>;
  onSubmit: (data: LoginFormType) => void;
};

const Login = ({ register, handleSubmit, errors, onSubmit }: LoginProps) => {
  const navigate = useNavigate();

  return (
    <div className="pt-16 flex justify-center items-center h-screen overflow-hidden">
      <div className="p-10 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl">
        <h2 className="text-2xl font-bold text-center mb-8">로그인</h2>
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
            })}
            className="input w-full px-4 py-2 text-base sm:text-lg"
          />
          {errors.password && (
            <p className="text-red-500 text-sm sm:text-base mt-1">
              {errors.password.message}
            </p>
          )}
          <button
            type="submit"
            className="btn w-full mt-4 py-2 text-base sm:text-lg"
          >
            로그인
          </button>

          <GoogleSignIn />

          <div className="text-center mt-4">
            <button
              onClick={() => navigate("/signup")}
              className="text-blue-500 underline text-sm sm:text-base"
            >
              회원가입 하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
