import React from "react";
import Paths from "./paths";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/home";
import PodcastDetails from "../pages/podcast-details";
import EpisodeDetails from "../pages/episode-details";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={Paths.Home} element={<Home />} />
        <Route path={Paths.PodcastDetails} element={<PodcastDetails />} />
        <Route path={Paths.EpisodeDetails} element={<EpisodeDetails />} />
        <Route path="*" element={<div>404</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
