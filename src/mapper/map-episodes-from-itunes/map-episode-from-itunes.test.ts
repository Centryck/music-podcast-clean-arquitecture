import { mapEpisodesResults } from "./map-episode-from-itunes";
import {
  EpisodeResult,
  ItunesEpisode,
} from "../../domain/entity/episode/itunes-episode";
import { Episode } from "../../domain/entity/episode/episode";

describe("mapEpisodesResults", () => {
  it("should correctly map ItunesEpisode to Episode and include index", () => {
    const input: EpisodeResult = {
      results: [
        {
          trackId: 1,
          trackName: "Episode 1",
          description: "Description 1",
          releaseDate: new Date("2024-01-01T00:00:00Z"),
          collectionId: 1001,
          trackTimeMillis: 300000,
          episodeUrl: "http://example.com/episode1",
          collectionName: "Podcast Collection 1",
        } as ItunesEpisode,
        {
          trackId: 2,
          trackName: "Episode 2",
          description: "Description 2",
          releaseDate: new Date("2024-01-02T00:00:00Z"),
          collectionId: 1002,
          trackTimeMillis: 400000,
          episodeUrl: "http://example.com/episode2",
          collectionName: "Podcast Collection 2",
        } as ItunesEpisode,
      ],
      resultCount: 2,
    };

    const expected: Episode[] = [
      {
        id: 1,
        name: "Episode 1",
        description: "Description 1",
        releaseDate: new Date("2024-01-01T00:00:00Z"),
        collectionId: 1001,
        trackTimeMillis: 300000,
        episodeUrl: "http://example.com/episode1",
        collectionName: "Podcast Collection 1",
        index: 0,
      },
      {
        id: 2,
        name: "Episode 2",
        description: "Description 2",
        releaseDate: new Date("2024-01-02T00:00:00Z"),
        collectionId: 1002,
        trackTimeMillis: 400000,
        episodeUrl: "http://example.com/episode2",
        collectionName: "Podcast Collection 2",
        index: 1,
      },
    ];

    const result = mapEpisodesResults(input);

    expect(result).toEqual(expected);
  });

  it("should return an empty array when there are no results", () => {
    const input: EpisodeResult = {
      results: [],
      resultCount: 0,
    };

    const expected: Episode[] = [];

    const result = mapEpisodesResults(input);

    expect(result).toEqual(expected);
  });
});
