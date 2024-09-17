// src/components/MangaEpisodes.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Typography, List, ListItem, ListItemText, Container, Box } from '@mui/material';
import { getMangaFromFirestore } from '../firebase'; // Importează funcția din firebase.js

const MangaEpisodes = () => {
  const { id } = useParams();
  const [manga, setManga] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchManga = async () => {
      try {
        const mangaData = await getMangaFromFirestore(id);
        setManga(mangaData);
      } catch (error) {
        setError('Error fetching manga');
        console.error('Error fetching manga:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchManga();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!manga) {
    return <div>Manga not found</div>;
  }

  return (
    <Container sx={{ marginTop: 4, marginBottom: 4 }}>
      <Box sx={{ textAlign: 'center', marginBottom: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Episodes of {manga.title}
        </Typography>
      </Box>
      <List sx={{ padding: 0 }}>
        {manga.episodes && manga.episodes.length > 0 ? (
          manga.episodes.map((episode, index) => (
            <ListItem
              key={index}
              button
              component={Link}
              to={`/manga/${id}/episodes/${index}`}
              sx={{ marginBottom: 1, borderRadius: '4px', '&:hover': { backgroundColor: '#2E236C' }, color: 'white' }}
            >
              <ListItemText primary={episode.title} />
            </ListItem>
          ))
        ) : (
          <ListItem>
            <ListItemText primary="No episodes available" />
          </ListItem>
        )}
      </List>
    </Container>
  );
};

export default MangaEpisodes;
