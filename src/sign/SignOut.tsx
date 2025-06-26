import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/AuthStore";

const SignOut = () => {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  const handleSignout = async () => {
    try {
      await logout();
      navigate("/signin");
    } catch (error) {
      console.error(error);
    }
  };

  return handleSignout;
};

export default SignOut;
