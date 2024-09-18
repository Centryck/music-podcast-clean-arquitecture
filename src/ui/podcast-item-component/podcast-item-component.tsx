import React from "react";
import { PodcastImage } from "../../domain/entity/podcast/podcast";
import "./podcastItemComponentStyles.css";

interface PodcastItemComponentProps {
  image: PodcastImage;
  name: string;
  artist: string;
}

const PodcastItemComponent: React.FC<PodcastItemComponentProps> = ({
  image,
  name,
  artist,
}) => {
  const nameInUpperCase = name.toUpperCase();
  const imageUrl = image.label;

  return (
    <div className="podcastItemContainer" data-testid={"podcast-item"}>
      <div className="podcastItem">
        <img
          src={imageUrl}
          alt={name}
          height={80}
          width={80}
          className={"roundedImage"}
        />
        <span className="podcastItemName">{nameInUpperCase}</span>
        <span className="podcastItemAuthor">Author: {artist}</span>
      </div>
    </div>
  );
};

export default PodcastItemComponent;
