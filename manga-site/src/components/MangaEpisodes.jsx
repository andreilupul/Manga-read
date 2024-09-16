import React from 'react';
import { useParams } from 'react-router-dom';

const MangaEpisodes = () => {
  const { id } = useParams();
  const mangaList = JSON.parse(localStorage.getItem('manga')) || [];
  const manga = mangaList[id];

  if (!manga) return <div>Manga not found</div>;

  return (
    <div>
      <h1>Episodes of {manga.title}</h1>
      <ul>
        {manga.episodes.map((episode, index) => (
          <li key={index}>{episode.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default MangaEpisodes;
