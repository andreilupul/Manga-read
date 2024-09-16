import * as React from 'react';
import List from '@mui/material/List';
import { useParams, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';

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
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          bgcolor: 'background.paper',
          zIndex: 1000,
          borderBottom: '1px solid #ddd',
          padding: '10px',
          textAlign: 'center', // Center text inside the Box
        }}
      >
        <h2>Episode {episodeIndex + 1}</h2>
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
      </Box>
      
      <List
        sx={{
          width: '100%',
          maxWidth: 3600,
          bgcolor: 'background.paper',
          position: 'relative',
          overflow: 'auto',
          maxHeight: 'auto',
          '& ul': { padding: 0 },
        }}
        subheader={<li />}
      >
        <ul>
          {episode.images.map((img, index) => (
            <li key={index}>
              <img
                src={img}
                alt={`Episode ${episodeIndex + 1} Image ${index}`}
                style={{
                  display: 'block',
                  width: '60%', // Lățimea imaginii este acum 60% din lățimea containerului
                  margin: '20px auto', // Imaginea este centrată și are un spațiu de 20px sus și jos
                  borderRadius: '10px', // Adăugare de colțuri rotunjite pentru estetică
                }}
              />
            </li>
          ))}
        </ul>
      </List>
    </div>
  );
};

export default EpisodeDetails;
