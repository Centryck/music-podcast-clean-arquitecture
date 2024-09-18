import React from "react";
import { Episode } from "../../domain/entity/episode/episode";
import "./episodeCardComponentStyles.css";

export interface EpisodeCardComponentProps {
  episode: Episode;
}

const EpisodeCardComponent: React.FC<EpisodeCardComponentProps> = ({
  episode,
}) => {
  return (
    <div className="episodeCardContainer">
      <span className="episodeCardTitle">{episode.name}</span>

      <span
        dangerouslySetInnerHTML={{ __html: episode.description ?? "" }}
        className="episodeCardDescription"
        data-testid={"episode-description"}
      />

      <audio controls className="episodeReproductor" data-testid="audio-player">
        <source src={episode.episodeUrl} type="audio/mpeg" />
      </audio>
    </div>
  );
};

export default EpisodeCardComponent;
