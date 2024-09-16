import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const MangaDetails = () => {
  const { id } = useParams();
  const mangaList = JSON.parse(localStorage.getItem('manga')) || [];
  const manga = mangaList[id];
  const [currentEpisode, setCurrentEpisode] = useState(0);

  // Verifică dacă manga și episodul curent există
  if (!manga) return <div>Manga not found</div>;
  if (manga.episodes.length === 0) return <div>No episodes available</div>;
  if (currentEpisode >= manga.episodes.length) return <div>Episode not found</div>;

  const currentEpisodeData = manga.episodes[currentEpisode];

  return (
    <div>
      <h1>{manga.title}</h1>
      <img src={manga.coverImage} alt={manga.title} />
      <p>{manga.description}</p>
      <div>
        <button onClick={() => setCurrentEpisode((prev) => Math.max(prev - 1, 0))}>Previous Episode</button>
        <button onClick={() => setCurrentEpisode((prev) => Math.min(prev + 1, manga.episodes.length - 1))}>Next Episode</button>
        <Link to={`/manga/${id}/episodes`}>View All Episodes</Link>
      </div>
      <div>
        {currentEpisodeData.images ? (
          currentEpisodeData.images.map((img, index) => (
            <img key={index} src={img} alt={`Episode ${currentEpisode}`} style={{ width: '100px', height: '100px' }} />
          ))
        ) : (
          <p>No images available for this episode</p>
        )}
      </div>
    </div>
  );
};

export default MangaDetails;
