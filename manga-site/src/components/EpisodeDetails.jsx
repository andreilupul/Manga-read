import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EpisodeDetails = () => {
  const { id, episodeId } = useParams();
  const navigate = useNavigate();
  const mangaList = JSON.parse(localStorage.getItem('manga')) || [];
  const manga = mangaList[id];
  const episodeIndex = parseInt(episodeId, 10);
  const episode = manga ? manga.episodes[episodeIndex] : null;

  if (!manga) return <div>Manga not found</div>;
  if (episode === undefined) return <div>Episode not found</div>;

  const goToPreviousEpisode = () => {
    if (episodeIndex > 0) {
      navigate(`/manga/${id}/episodes/${episodeIndex - 1}`);
    }
  };

  const goToNextEpisode = () => {
    if (episodeIndex < manga.episodes.length - 1) {
      navigate(`/manga/${id}/episodes/${episodeIndex + 1}`);
    }
  };

  const goToAllEpisodes = () => {
    navigate(`/manga/${id}/episodes`);
  };

  return (
    <div>
      <h1>{episode.title}</h1>
      <p>{episode.description}</p>
      {/* Afișează imaginile episodului */}
      <div>
        {episode.images.map((img, index) => (
          <img key={index} src={img} alt={`Episode ${episode.title} Image ${index}`} />
        ))}
      </div>
      <div>
        <button onClick={goToPreviousEpisode} disabled={episodeIndex === 0}>
          Previous Episode
        </button>
        <button onClick={goToAllEpisodes}>
          All Episodes
        </button>
        <button onClick={goToNextEpisode} disabled={episodeIndex === manga.episodes.length - 1}>
          Next Episode
        </button>
      </div>
    </div>
  );
};

export default EpisodeDetails;
