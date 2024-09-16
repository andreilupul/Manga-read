import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const EditManga = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [mangaList, setMangaList] = useState(JSON.parse(localStorage.getItem('manga')) || []);
  const [currentManga, setCurrentManga] = useState(null);
  const [newEpisode, setNewEpisode] = useState({ title: '', description: '', images: [] });

  const handleEditClick = (index) => {
    setCurrentManga(mangaList[index]);
  };

  const handleDeleteManga = (index) => {
    const updatedMangaList = mangaList.filter((_, i) => i !== index);
    setMangaList(updatedMangaList);
    localStorage.setItem('manga', JSON.stringify(updatedMangaList));
  };

  const handleEditManga = () => {
    const updatedMangaList = mangaList.map((manga, index) => 
      index === parseInt(id, 10) ? currentManga : manga
    );
    setMangaList(updatedMangaList);
    localStorage.setItem('manga', JSON.stringify(updatedMangaList));
    navigate('/');
  };

  const handleAddEpisode = () => {
    setCurrentManga(prev => ({
      ...prev,
      episodes: [...prev.episodes, newEpisode]
    }));
    setNewEpisode({ title: '', description: '', images: [] });
  };

  const handleCancel = () => {
    navigate('/');
  };

  if (currentManga) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '20px',
        }}
      >
        <h1 style={{ margin: '10px' }}>Edit Manga</h1>

        <TextField
          label="Title"
          type="text"
          value={currentManga.title}
          onChange={(e) => setCurrentManga({ ...currentManga, title: e.target.value })}
          sx={{ margin: '10px', width: '100%' }}
        />
        <TextField
          label="Cover Image URL"
          type="text"
          value={currentManga.coverImage}
          onChange={(e) => setCurrentManga({ ...currentManga, coverImage: e.target.value })}
          sx={{ margin: '10px', width: '100%' }}
        />
          <TextField
            label="Description"
            type="text"
            value={currentManga.description}
            onChange={(e) => setCurrentManga({ ...currentManga, description: e.target.value })}
            sx={{ 
              margin: '10px', 
              width: '100%', 
              whiteSpace: 'pre-wrap',  
              wordWrap: 'break-word',  
              maxWidth: '500px',       
            }}
            multiline  
            rows={4}   
          />


        <h2 style={{ margin: '10px' }}>Add Episode</h2>

        <TextField
          label="Episode Title"
          type="text"
          value={newEpisode.title}
          onChange={(e) => setNewEpisode({ ...newEpisode, title: e.target.value })}
          sx={{ margin: '10px', width: '100%' }}
        />
        <TextField
          label="Image URL"
          type="text"
          onChange={(e) => setNewEpisode(prev => ({
            ...prev,
            images: [...prev.images, e.target.value]
          }))}
          sx={{ margin: '10px', width: '100%' }}
        />

        <Button onClick={handleAddEpisode} variant="outlined" sx={{ margin: '10px' }}>
          Add Episode
        </Button>

        <Button onClick={handleEditManga} variant="outlined" sx={{ margin: '10px' }}>
          Save Changes
        </Button>
        <Button onClick={handleCancel} variant="outlined" sx={{ margin: '10px' }}>
          Cancel
        </Button>
        <Button onClick={() => handleDeleteManga(parseInt(id, 10))} variant="outlined" sx={{ margin: '10px' }}>
          Delete Manga
        </Button>
      </Box>
    );
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
              <Button size="small" onClick={() => handleDeleteManga(index)}>
                Delete
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default EditManga;
