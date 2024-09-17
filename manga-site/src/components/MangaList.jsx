// src/components/MangaList.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { getMangaListFromFirestore } from '../firebase'; // Importă funcția din firebase.js

const MangaList = () => {
  const navigate = useNavigate();
  const [mangaList, setMangaList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMangaList = async () => {
      try {
        const mangaData = await getMangaListFromFirestore();
        setMangaList(mangaData);
      } catch (error) {
        setError('Error fetching manga list');
        console.error('Error fetching manga list:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMangaList();
  }, []);

  const handleEditClick = (index) => {
    navigate(`/edit/${index}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Box sx={{ margin: '20px' }}>
      <h1 style={{ margin: '10px' }}>Select Manga to Edit</h1>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '20px',
        }}
      >
        {mangaList.map((manga, index) => (
          <Card key={index} sx={{ maxWidth: 345 }}>
            <CardMedia
              sx={{ height: 200 }}
              image={manga.coverImage}
              title={manga.title}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {manga.title}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={() => handleEditClick(index)}>
                Edit
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default MangaList;
