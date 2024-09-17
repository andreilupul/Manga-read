import React, { useState } from 'react';
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
import { uploadImage, addMangaToFirestore } from '../firebase';

const AddManga = () => {
  const [title, setTitle] = useState('');
  const [coverImage, setCoverImage] = useState(null); // Fișier, nu URL
  const [description, setDescription] = useState('');
  const [episodes, setEpisodes] = useState([]);
  const [episodeTitle, setEpisodeTitle] = useState('');
  const [episodeImages, setEpisodeImages] = useState([]);
  const [newImage, setNewImage] = useState(null); // Fișier de imagine

  const handleAddImage = () => {
    if (newImage) {
      setEpisodeImages([...episodeImages, newImage]);
      setNewImage(null);
    }
  };

  const handleAddEpisode = () => {
    if (episodeTitle && episodeImages.length > 0) {
      const newEpisode = { title: episodeTitle, images: episodeImages };
      setEpisodes((prevEpisodes) => [...prevEpisodes, newEpisode]);
      setEpisodeTitle('');
      setEpisodeImages([]);
    } else {
      alert('Please provide both a title and at least one image for the episode.');
    }
  };

  const handleSubmit = async () => {
    try {
      // Încarcă imaginea de copertă
      const coverImageUrl = await uploadImage(coverImage);

      // Încarcă imaginile episodului și obține URL-urile
      const episodesWithImageUrls = await Promise.all(
        episodes.map(async (episode) => {
          const imageUrls = await Promise.all(
            episode.images.map((image) => uploadImage(image))
          );
          return { title: episode.title, images: imageUrls };
        })
      );

      // Salvează manga în Firestore cu ID numeric
      const mangaId = await addMangaToFirestore(title, description, coverImageUrl, episodesWithImageUrls);

      alert(`Manga adăugată cu succes! ID-ul Manga: ${mangaId}`);
      // Resetează stările
      setTitle('');
      setCoverImage(null);
      setDescription('');
      setEpisodes([]);
    } catch (error) {
      console.error('Eroare la adăugarea manga:', error);
      alert('Eroare la adăugarea manga.');
    }
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
        label="Cover Image"
        type="file"
        onChange={(e) => setCoverImage(e.target.files[0])}
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
        label="Episode Image"
        type="file"
        onChange={(e) => setNewImage(e.target.files[0])}
        sx={{ margin: '10px', width: '100%' }}
      />

      <Button
        onClick={handleAddImage}
        variant="outlined"
        sx={{ margin: '10px' }}
      >
        Add Image
      </Button>

      <List
        sx={{
          width: '100%',
          maxWidth: 360,
          bgcolor: 'background.paper',
          maxHeight: 250,
          overflowY: 'auto',
          margin: '10px',
        }}
      >
        {episodeImages.map((img, index) => (
          <React.Fragment key={index}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt={`Episode ${episodeTitle}`} src={URL.createObjectURL(img)} />
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
