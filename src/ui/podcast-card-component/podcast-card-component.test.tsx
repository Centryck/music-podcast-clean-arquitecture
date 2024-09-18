import { render, screen } from "@testing-library/react";
import PodcastCardComponent from "./";
import { PodcastImage } from "../../domain/entity/podcast/podcast";
import { BrowserRouter as Router } from "react-router-dom";

const IMG: PodcastImage = {
  label:
    "https://is2-ssl.mzstatic.com/image/thumb/Podcasts125/v4/7b/cf/f6/7bcff6bb-5f99-6c2f-c6c5-3a9799f3df21/mza_8544742664200824246.jpg/170x170bb.png",
  attributes: {
    height: "80",
  },
};

const NAME: string = "Podcast Mock";
const ARTIST: string = "Centryck";
const DESCRIPTION: string = "podcast description";
const ID: string = "123456";

const renderElement = () => {
  const utils = render(
    <Router>
      <PodcastCardComponent
        image={IMG}
        name={NAME}
        artist={ARTIST}
        description={DESCRIPTION}
        id={ID}
      />
    </Router>
  );
  const query = {
    cardImg: () => screen.queryByAltText(NAME),
    cardImgUrl: () => screen.queryByTestId("podcast-details-photo-url"),
    cardTextUrl: () => screen.queryByTestId("podcast-details-text-url"),
    podcastName: () => screen.queryByText(NAME),
    podcastArtist: () => screen.queryByText("by " + ARTIST),
    podcastDescription: () => screen.queryByText(DESCRIPTION),
  };

  return {
    ...utils,
    query,
  };
};

describe("PodcastCard", () => {
  it("renders all the items by default", () => {
    const { query } = renderElement();

    expect(query.cardImg()).not.toBeNull();

    expect(query.cardImgUrl()).toHaveAttribute("href", `/podcast/${ID}`);
    expect(query.cardTextUrl()).toHaveAttribute("href", `/podcast/${ID}`);

    expect(query.podcastName()).not.toBeNull();
    expect(query.podcastArtist()).not.toBeNull();
    expect(query.podcastDescription()).not.toBeNull();
  });
});
