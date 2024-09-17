// src/components/MangaDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Typography, List, ListItem, ListItemText, Container, Box } from '@mui/material';
import { getMangaByIdFromFirestore } from '../firebase';

const MangaDetails = () => {
  const { id } = useParams();
  const [manga, setManga] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchManga = async () => {
      console.log('Fetching manga with ID:', id); // Verifică ID-ul manga-ului
      try {
        const mangaData = await getMangaByIdFromFirestore(id);
        console.log('Manga data fetched:', mangaData); // Verifică datele obținute
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
          {manga.title}
        </Typography>
        <img
          src={manga.coverImage}
          alt={manga.title}
          style={{
            width: '200px',
            height: 'auto',
            margin: '0 auto',
            display: 'block',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          }}
        />
        <Typography variant="body1" sx={{ color: 'white', marginTop: 2 }}>
          {manga.description}
        </Typography>
      </Box>
      <Typography variant="h6" component="h2" gutterBottom>
        Episodes
      </Typography>
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

export default MangaDetails;
