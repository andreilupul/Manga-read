// src/components/MangaEpisodes.jsx
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Typography, List, ListItem, ListItemText, Container, Box } from '@mui/material';

const MangaEpisodes = () => {
  const { id } = useParams();
  const mangaList = JSON.parse(localStorage.getItem('manga')) || [];
  const manga = mangaList[id];

  if (!manga) return <div>Manga not found</div>;

  return (
    <Container sx={{ marginTop: 4, marginBottom: 4 }}>
      <Box sx={{ textAlign: 'center', marginBottom: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Episodes of {manga.title}
        </Typography>
      </Box>
      <List sx={{ padding: 0 }}>
        {manga.episodes.map((episode, index) => (
          <ListItem
            key={index}
            button
            component={Link}
            to={`/manga/${id}/episodes/${index}`}
            sx={{ marginBottom: 1, borderRadius: '4px', '&:hover': { backgroundColor: '#2E236C' }, color: 'white' }}
          >
            <ListItemText primary={episode.title} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default MangaEpisodes;
