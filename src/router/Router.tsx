import { Routes, Route } from "react-router-dom";
import { memo } from "react";
import Main from "../views/Main";
import Search from "../views/Search";
import Register from "../sign/Register";
import SignIn from "../sign/SignIn";
import KakaoCallback from "../sign/KakaoCallback";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/signup" element={<Register />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/kakaologin" element={<KakaoCallback />} />
      <Route path="/search" element={<Search />} />
    </Routes>
  );
};

export default memo(Router);
