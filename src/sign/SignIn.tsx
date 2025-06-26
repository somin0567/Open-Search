import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Login from "../views/Login";
import useAuthStore from "../store/AuthStore";

export type LoginFormType = {
  email: string;
  password: string;
};

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormType>();

  const loginWithEmail = useAuthStore((state) => state.loginWithEmail);
  const navigate = useNavigate();

  const onSubmit = async (data: LoginFormType) => {
    try {
      await loginWithEmail(data.email, data.password);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Login
      register={register}
      handleSubmit={handleSubmit}
      errors={errors}
      onSubmit={onSubmit}
    />
  );
};

export default SignIn;
