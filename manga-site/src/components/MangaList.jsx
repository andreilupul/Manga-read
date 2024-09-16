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

const MangaList = () => {
  const navigate = useNavigate();
  const [mangaList, setMangaList] = useState([]);

  // Load manga list from local storage
  useEffect(() => {
    const storedMangaList = JSON.parse(localStorage.getItem('manga')) || [];
    setMangaList(storedMangaList);
  }, []);

  const handleEditClick = (index) => {
    navigate(`/edit/${index}`);
  };

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
