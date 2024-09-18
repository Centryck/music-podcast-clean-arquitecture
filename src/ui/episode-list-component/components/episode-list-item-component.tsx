import React from "react";
import { Link } from "react-router-dom";
import { Episode } from "../../../domain/entity/episode/episode";
import "../episodeListComponentStyles.css";

interface EpisodeListItemComponentProps {
  episode: Episode;
}

const EpisodeListItemComponent: React.FC<EpisodeListItemComponentProps> = ({
  episode,
}) => {
  const { name, releaseDate, trackTimeMillis } = episode;

  const episodeUrl = `/podcast/${episode.collectionId}/episode/${episode.id}`;

  const parsedDate = () => {
    const date = new Date(releaseDate);
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    return `${day}/${month + 1}/${year}`;
  };

  const parsedTimeMillis = () => {
    const timeInSeconds = trackTimeMillis / 1000;

    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds - hours * 3600) / 60);
    const seconds = Math.floor(
      timeInSeconds - hours * 3600 - minutes * 60
    ).toFixed();

    const hoursString =
      hours < 1 ? "" : hours.toString().padStart(2, "0") + ":";
    const timeString =
      hoursString +
      minutes.toString().padStart(2, "0") +
      ":" +
      seconds.toString().padStart(2, "0");

    return timeString;
  };

  return (
    <div className="episodeItemContainer" data-testid={"episode-item"}>
      <Link to={episodeUrl} className="episodeTitle">
        {name}
      </Link>
      <div className="dataContainer">
        <span>{parsedDate()}</span>
        <span>{parsedTimeMillis()}</span>
      </div>
    </div>
  );
};

export default EpisodeListItemComponent;
