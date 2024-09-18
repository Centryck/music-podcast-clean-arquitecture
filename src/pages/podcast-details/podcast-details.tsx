import { useParams } from "react-router-dom";
import HeaderComponent from "../../ui/header-component";
import EpisodeListComponent from "../../ui/episode-list-component";
import { useGetAllEpisodes } from "../../application/episode/use-get-all-episodes";
import PodcastCardComponent from "../../ui/podcast-card-component";
import { useGetSinglePodcast } from "../../application/podcast/use-get-single-podcast";
import "./podcastDetailsStyles.css";

const PodcastDetails = () => {
  const { podcastId } = useParams();

  const { episodes, isLoading: isLoadingEpisodes } = useGetAllEpisodes(
    Number(podcastId)
  );
  const { podcast, isLoading: isLoadingPodcast } = useGetSinglePodcast(
    podcastId!
  );

  return (
    <div>
      <HeaderComponent isLoading={isLoadingEpisodes || isLoadingPodcast} />

      <div className="podcastDetailsContainer">
        {podcast && (
          <div>
            <PodcastCardComponent
              image={podcast.image[2]}
              name={podcast.name}
              artist={podcast.artist}
              description={podcast.summary}
              id={podcast.id}
            />
          </div>
        )}
        {episodes && (
          <div className="listContainer">
            <EpisodeListComponent episodes={episodes} />
          </div>
        )}
      </div>
    </div>
  );
};

export default PodcastDetails;
