import React from "react";
import { Episode } from "../../domain/entity/episode/episode";
import EpisodeListItemComponent from "./components";
import "./episodeListComponentStyles.css";

interface EpisodeListProps {
  episodes: Episode[];
}

const EpisodeList: React.FC<EpisodeListProps> = ({ episodes }) => {
  return (
    <div className="episodeListContainer">
      <span className="episodesNumber">Episodes: {episodes.length}</span>

      <div className="episodeListData">
        <div className="episodeItemContainer">
          <strong className="episodeListTitle">Title</strong>
          <div className="dataContainer">
            <strong>Date</strong>
            <strong>Duration</strong>
          </div>
        </div>
        {episodes.map((episode) => (
          <EpisodeListItemComponent episode={episode} key={episode.id} />
        ))}
      </div>
    </div>
  );
};

export default EpisodeList;
