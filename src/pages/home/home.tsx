import React from "react";
import { useGetAllPodcasts } from "../../application/podcast/use-get-all-podcasts";
import { useGetAllEpisodes } from "../../application/episode/use-get-all-episodes";

const HomePage = () => {
  const { podcasts, isLoading } = useGetAllPodcasts();

  console.log(podcasts);
  return (
    <div>
      <h1>Welcome to the Music Podcast Clean Architecture</h1>
    </div>
  );
};

export default HomePage;
