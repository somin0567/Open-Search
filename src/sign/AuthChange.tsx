import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../firebase";

const AuthChange = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const stateChange = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });

    return stateChange;
  }, []);

  return { isLoggedIn };
};

export default AuthChange;
