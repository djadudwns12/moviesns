import React from "react";
import Home from "./Home.js";
import MeetList from "./MeetList.js";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
const Body = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movielist" element={<Home />} />
        <Route path="/meetlist" element={<MeetList />} />
      </Routes>
    </>
  );
};

export default Body;
