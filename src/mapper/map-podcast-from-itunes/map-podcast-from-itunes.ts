import { Podcast, RawPodcast } from "../../domain/entity/podcast/podcast";
import { Entry, ItunesPodcast } from "../../domain/entity/podcast/itunes-podcast";

type Mapper<BackendType, MappedType> = (input: BackendType) => MappedType;

const mapPodcast: Mapper<Entry, Podcast> = input => {
	return {
			id: input.id.attributes["im:id"],
			name: input["im:name"]?.label,
			image: input["im:image"],
			summary: input.summary?.label,
			rights: input.rights?.label,
			title: input.title.label,
			artist: input["im:artist"]?.label
	}
}

const mapPodcasts = (podcasts: Entry[]): Podcast[] => 
podcasts.map(mapPodcast).map((podcast, index) => {
	return {
		...podcast,
		index,
	};
});

export const mapPodcastsFromItunes: Mapper<ItunesPodcast, RawPodcast> = input => {
	
	return {
		podcast: mapPodcasts(input.feed.entry)
	};
};