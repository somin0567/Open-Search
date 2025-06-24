import { Routes, Route } from "react-router-dom";
import { memo } from "react";
import Main from "../views/Main";
import Search from "../views/Search";
import Register from "../sign/Register";
import SignIn from "../sign/SignIn";
import Logout from "../views/Logout";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/signup" element={<Register />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signout" element={<Logout />} />
      <Route path="/search" element={<Search />} />
    </Routes>
  );
};

export default memo(Router);
