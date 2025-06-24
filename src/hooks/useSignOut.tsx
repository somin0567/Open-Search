import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const useSignOut = () => {
  const navigate = useNavigate();
  const handleSignout = async () => {
    try {
      await signOut(auth);
      navigate("/signin");
    } catch (error) {
      console.error("로그아웃 실패:", error);
    }
  };

  return handleSignout;
};

export default useSignOut;
