import { useEffect, useState } from "react";
import { Podcast } from "../../domain/entity/podcast/podcast";
import { Link } from "react-router-dom";
import "./homeStyles.css";
import PodcastItem from "../../ui/podcast-item-component";
import Header from "../../ui/header-component";
import FilterComponent from "../../ui/filter-component";
import { useGetAllPodcasts } from "../../application/podcast/use-get-all-podcasts";

const Home = () => {
  const { podcasts, isLoading } = useGetAllPodcasts();
  const [currentPodcasts, setCurrentPodcasts] = useState<
    Podcast[] | undefined
  >();

  useEffect(() => {
    setCurrentPodcasts(podcasts);
  }, [podcasts]);

  const handleChangeFilterText = (text: string) => {
    const filterText = text.toLowerCase();

    const filterPodcast = podcasts?.filter(
      (podcast) =>
        RegExp(filterText).exec(podcast.name.toLowerCase()) ||
        RegExp(filterText).exec(podcast.artist.toLowerCase())
    );

    setCurrentPodcasts(filterPodcast);
  };

  return (
    <div className="home-container" data-testid="home-page">
      <Header isLoading={isLoading} />

      <FilterComponent
        onChange={handleChangeFilterText}
        podcastNumber={
          currentPodcasts ? `${currentPodcasts?.length}` : undefined
        }
      />
      <div className="podcastListContainer">
        {currentPodcasts?.map((podcast) => (
          <Link
            to={`/podcast/${podcast.id}`}
            state={{ podcastId: podcast.id }}
            key={podcast.id}
            className={"podcastListItem"}
          >
            <PodcastItem
              image={podcast.image[2]}
              name={podcast.name}
              artist={podcast.artist}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
