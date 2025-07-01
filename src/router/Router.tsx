import { Routes, Route } from "react-router-dom";
import { memo } from "react";
import Main from "../views/Main";
import Register from "../sign/Register";
import SignIn from "../sign/SignIn";
import Logout from "../views/Logout";
import Search from "../common/Search";
import AiView from "../aiData/AiView";
import Review from "../aiData/Review";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/signup" element={<Register />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signout" element={<Logout />} />
      <Route path="/search" element={<Search />} />
      <Route path="/view" element={<AiView />} />
      <Route path="/review" element={<Review />} />
    </Routes>
  );
};

export default memo(Router);
