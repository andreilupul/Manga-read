// src/components/EpisodeDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { List, Box, Button, Stack, Typography } from '@mui/material';
import { getMangaFromFirestore } from '../firebase'; // Importează funcția din firebase.js

const EpisodeDetails = () => {
  const { id, episodeId } = useParams();
  const navigate = useNavigate();
  const [manga, setManga] = useState(null);
  const [episode, setEpisode] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchManga = async () => {
      try {
        const mangaData = await getMangaFromFirestore(id);
        const episodeIndex = parseInt(episodeId, 10);
        if (mangaData && mangaData.episodes && mangaData.episodes[episodeIndex]) {
          setManga(mangaData);
          setEpisode(mangaData.episodes[episodeIndex]);
        } else {
          setError('Episode not found');
        }
      } catch (error) {
        setError('Error fetching manga');
        console.error('Error fetching manga:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchManga();
  }, [id, episodeId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!manga || !episode) {
    return <div>Data not found</div>;
  }

  const episodeIndex = parseInt(episodeId, 10);

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
          textAlign: 'center',
        }}
      >
        <Typography variant="h6">Episode {episodeIndex + 1}</Typography>
        <Stack direction="row" spacing={2} justifyContent="center" sx={{ marginTop: 2 }}>
          <Button
            variant="contained"
            onClick={goToPreviousEpisode}
            disabled={episodeIndex === 0}
          >
            Previous Episode
          </Button>
          <Button
            variant="contained"
            onClick={goToAllEpisodes}
          >
            All Episodes
          </Button>
          <Button
            variant="contained"
            onClick={goToNextEpisode}
            disabled={episodeIndex === manga.episodes.length - 1}
          >
            Next Episode
          </Button>
        </Stack>
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
                  width: '60%',
                  margin: '20px auto',
                  borderRadius: '10px',
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
