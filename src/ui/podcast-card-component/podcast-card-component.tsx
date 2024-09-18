import React from "react";
import { Link } from "react-router-dom";
import { PodcastImage } from "../../domain/entity/podcast/podcast";
import "./podcastCardComponentStyles.css";

interface PodcastCardComponentProps {
  image: PodcastImage;
  name: string;
  artist: string;
  description: string;
  id: string;
}

const PodcastCardComponent: React.FC<PodcastCardComponentProps> = ({
  image,
  name,
  artist,
  description,
  id,
}) => {
  const imageUrl = image.label;

  return (
    <div className="podcastCardContainer">
      <Link
        to={`/podcast/${id}`}
        className={"cardImageContainer"}
        data-testid="podcast-details-photo-url"
      >
        <img
          src={imageUrl}
          alt={name}
          height={170}
          width={170}
          className={"cardImage"}
        />
      </Link>
      <Link
        to={`/podcast/${id}`}
        className={"podcastCardTitleBlock"}
        data-testid="podcast-details-text-url"
      >
        <span className="podcastNameCard">{name}</span>
        <span className="podcastArtistCard">by {artist}</span>
      </Link>

      <div className="podcastCardDescriptionBlock">
        <span className="podcastDescriptionLabel">Description:</span>
        <span className="podcastDescriptionText">{description}</span>
      </div>
    </div>
  );
};

export default PodcastCardComponent;
