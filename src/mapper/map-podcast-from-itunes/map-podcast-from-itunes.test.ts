import { mapPodcastsFromItunes } from "./map-podcast-from-itunes";
import {
  ItunesPodcast,
  Entry,
} from "../../domain/entity/podcast/itunes-podcast";
import { RawPodcast } from "../../domain/entity/podcast/podcast";

describe("mapPodcastsFromItunes", () => {
  it("should correctly map ItunesPodcast to RawPodcast and include index", () => {
    const input: ItunesPodcast = {
      feed: {
        author: {
          name: { label: "Author Name" },
          uri: { label: "https://authoruri.com" },
        },
        entry: [
          {
            "im:name": { label: "Podcast 1" },
            "im:image": [
              {
                label: "http://example.com/image1.jpg",
                attributes: { height: "60" },
              },
            ],
            summary: { label: "Summary 1" },
            "im:price": {
              label: "Free",
              attributes: { amount: "0.00", currency: "USD" },
            },
            "im:contentType": {
              attributes: { term: "podcast", label: "Podcast" },
            },
            rights: { label: "All rights reserved" },
            title: { label: "Title 1" },
            link: {
              attributes: {
                rel: "alternate",
                type: "text/html",
                href: "https://linkto.com",
              },
            },
            id: { label: "1", attributes: { "im:id": "1" } },
            "im:artist": {
              label: "Artist 1",
              attributes: { href: "https://artistlink.com" },
            },
            category: {
              attributes: {
                "im:id": "1",
                term: "Arts",
                scheme: "http://itunes.apple.com",
                label: "Arts",
              },
            },
            "im:releaseDate": {
              label: new Date("2023-01-01T00:00:00Z"),
              attributes: { label: "2023-01-01" },
            },
          } as Entry,
          {
            "im:name": { label: "Podcast 2" },
            "im:image": [
              {
                label: "http://example.com/image2.jpg",
                attributes: { height: "60" },
              },
            ],
            summary: { label: "Summary 2" },
            "im:price": {
              label: "Paid",
              attributes: { amount: "1.99", currency: "USD" },
            },
            "im:contentType": {
              attributes: { term: "podcast", label: "Podcast" },
            },
            rights: { label: "All rights reserved" },
            title: { label: "Title 2" },
            link: {
              attributes: {
                rel: "alternate",
                type: "text/html",
                href: "https://linkto2.com",
              },
            },
            id: { label: "2", attributes: { "im:id": "2" } },
            "im:artist": {
              label: "Artist 2",
              attributes: { href: "https://artistlink2.com" },
            },
            category: {
              attributes: {
                "im:id": "2",
                term: "Comedy",
                scheme: "http://itunes.apple.com",
                label: "Comedy",
              },
            },
            "im:releaseDate": {
              label: new Date("2023-02-01T00:00:00Z"),
              attributes: { label: "2023-02-01" },
            },
          } as Entry,
        ],
      },
    };

    const expected: RawPodcast = {
      podcast: [
        {
          id: "1",
          name: "Podcast 1",
          image: [
            {
              label: "http://example.com/image1.jpg",
              attributes: { height: "60" },
            },
          ],
          summary: "Summary 1",
          rights: "All rights reserved",
          title: "Title 1",
          artist: "Artist 1",
          index: 0,
        },
        {
          id: "2",
          name: "Podcast 2",
          image: [
            {
              label: "http://example.com/image2.jpg",
              attributes: { height: "60" },
            },
          ],
          summary: "Summary 2",
          rights: "All rights reserved",
          title: "Title 2",
          artist: "Artist 2",
          index: 1,
        },
      ],
    };

    const result = mapPodcastsFromItunes(input);

    expect(result).toEqual(expected);
  });

  it("should handle empty podcast entries gracefully", () => {
    const input: ItunesPodcast = {
      feed: {
        author: {
          name: { label: "Author Name" },
          uri: { label: "https://authoruri.com" },
        },
        entry: [],
      },
    };

    const expected: RawPodcast = {
      podcast: [],
    };

    const result = mapPodcastsFromItunes(input);

    expect(result).toEqual(expected);
  });
});
