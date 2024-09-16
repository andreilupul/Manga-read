import { useState } from 'react';
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

const AddManga = () => {
  const [title, setTitle] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [description, setDescription] = useState('');
  const [episodes, setEpisodes] = useState([]);
  const [episodeTitle, setEpisodeTitle] = useState('');
  const [episodeImages, setEpisodeImages] = useState([]);
  const [newImage, setNewImage] = useState('');

  const handleAddImage = () => {
    if (newImage) {
      setEpisodeImages([...episodeImages, newImage]);
      setNewImage('');
    }
  };

  const handleAddEpisode = () => {
    if (episodeTitle && episodeImages.length > 0) {
      const newEpisode = { title: episodeTitle, images: episodeImages };
      setEpisodes([...episodes, newEpisode]);
      setEpisodeTitle('');
      setEpisodeImages([]);
    }
  };

  const handleSubmit = () => {
    const newManga = { title, coverImage, description, episodes };
    const existingManga = JSON.parse(localStorage.getItem('manga')) || [];
    localStorage.setItem('manga', JSON.stringify([...existingManga, newManga]));
    setTitle('');
    setCoverImage('');
    setDescription('');
    setEpisodes([]);
  };

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
      <h1 style={{ margin: '10px' }}>Add Manga</h1>

      <TextField
        label="Title"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        sx={{ margin: '10px', width: '100%' }}
      />
      <TextField
        label="Cover Image URL"
        type="text"
        value={coverImage}
        onChange={(e) => setCoverImage(e.target.value)}
        sx={{ margin: '10px', width: '100%' }}
      />
      <TextField
        label="Description"
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        sx={{ margin: '10px', width: '100%' }}
      />

      <h2 style={{ margin: '10px' }}>Add Episode</h2>

      <TextField
        label="Episode Title"
        type="text"
        value={episodeTitle}
        onChange={(e) => setEpisodeTitle(e.target.value)}
        sx={{ margin: '10px', width: '100%' }}
      />

      <TextField
        label="Image URL"
        type="text"
        value={newImage}
        onChange={(e) => setNewImage(e.target.value)}
        sx={{ margin: '10px', width: '100%' }}
      />

      <Button
        onClick={handleAddImage}
        variant="outlined"
        sx={{ margin: '10px' }}
      >
        Add Image
      </Button>

      {/* List of episode images with scroll and only 3 visible at a time */}
      <List
        sx={{
          width: '100%',
          maxWidth: 360,
          bgcolor: 'background.paper',
          maxHeight: 250, // Adjust height for 3 images and scrolling
          overflowY: 'auto', // Enable scrolling
          margin: '10px',
        }}
      >
        {episodeImages.map((img, index) => (
          <React.Fragment key={index}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt={`Episode ${episodeTitle}`} src={img} />
              </ListItemAvatar>
              <ListItemText
                primary={`Image ${index + 1}`}
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      sx={{ color: 'text.primary', display: 'inline' }}
                    >
                      {`Episode: ${episodeTitle}`}
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </React.Fragment>
        ))}
      </List>

      <Button onClick={handleAddEpisode} variant="outlined" sx={{ margin: '10px' }}>
        Add Episode
      </Button>
      <Button onClick={handleSubmit} variant="outlined" sx={{ margin: '10px' }}>
        Add Manga
      </Button>
    </Box>
  );
};

export default AddManga;
