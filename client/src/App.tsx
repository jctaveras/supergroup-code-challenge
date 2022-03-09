import React from "react";
import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/home";
import Login from "./pages/Login";
import Header from "./components/Header";
import SignUp from "./pages/SignUp";
import Post from "./pages/Post";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="post" element={<Post />} />
        <Route index element={<HomePage />} />
      </Routes>
    </>
  );
};

export default App;
