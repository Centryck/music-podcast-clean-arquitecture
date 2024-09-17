interface ImageAttributes {
  height: string;
}

export interface PodcastImage {
  label: string;
  attributes: ImageAttributes;
}

export interface Podcast {
  id: string;
  name: string;
  image: PodcastImage[];
  summary: string;
  rights: string;
  title: string;
  artist: string;
  index?: number;
}

export interface RawPodcast {
  podcast: Podcast[];
}

export interface StoredPodcasts {
  podcast: Podcast[];
  date: Date;
}

export interface StoredSinglePodcast {
  podcast: Podcast;
  date: Date;
}
