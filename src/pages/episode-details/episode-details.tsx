import { useParams } from "react-router-dom";
import Header from "../../ui/header-component";
import EpisodeCard from "../../ui/episode-card-component";
import { useGetSingleEpisode } from "../../application/episode/use-get-single-episode";
import PodcastCard from "../../ui/podcast-card-component";
import { useGetSinglePodcast } from "../../application/podcast/use-get-single-podcast";
import "./episodeDetailsStyles.css";

const EpisodeDetails = () => {
  const { podcastId, episodeId } = useParams();

  const { episode, isLoading: isEpisodeLoading } = useGetSingleEpisode(
    Number(podcastId),
    Number(episodeId)
  );
  const { podcast, isLoading: isPodcastLoading } = useGetSinglePodcast(
    podcastId!
  );

  return (
    <div data-testid={"episode-details-page"}>
      <Header isLoading={isEpisodeLoading || isPodcastLoading} />
      <div className="episodeDetailsContainer">
        {podcast && (
          <div>
            <PodcastCard
              image={podcast.image[2]}
              name={podcast.name}
              artist={podcast.artist}
              description={podcast.summary}
              id={podcast.id}
            />
          </div>
        )}
        {episode && (
          <div>
            <EpisodeCard episode={episode} />
          </div>
        )}
      </div>
    </div>
  );
};

export default EpisodeDetails;
