import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../firebase";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Login from "../views/Login";

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

  const navigate = useNavigate();
  const auth = getAuth(app);

  const onSubmit = async (data: LoginFormType) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      console.log("로그인 성공");
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
