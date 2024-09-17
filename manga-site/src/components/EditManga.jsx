import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { getMangaByIdFromFirestore, updateMangaInFirestore, deleteMangaFromFirestore, getMangaListFromFirestore, addMangaToFirestore } from '../firebase';

const EditManga = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentManga, setCurrentManga] = useState(null);
  const [newEpisode, setNewEpisode] = useState({ title: '', description: '', images: [] });
  const [imageInput, setImageInput] = useState('');

  // Load manga from Firestore
  useEffect(() => {
    const fetchManga = async () => {
      try {
        const mangaData = await getMangaByIdFromFirestore(id);
        setCurrentManga(mangaData);
      } catch (error) {
        console.error('Error fetching manga:', error);
      }
    };

    fetchManga();
  }, [id]);

  const handleEditManga = async () => {
    try {
      await updateMangaInFirestore(id, currentManga);
      navigate('/');
    } catch (error) {
      console.error('Error updating manga:', error);
    }
  };

  const handleAddEpisode = () => {
    setCurrentManga(prev => ({
      ...prev,
      episodes: [...prev.episodes, newEpisode]
    }));
    setNewEpisode({ title: '', description: '', images: [] });
  };

  const handleAddImage = () => {
    setNewEpisode(prev => ({
      ...prev,
      images: [...prev.images, imageInput]
    }));
    setImageInput('');
  };

  const handleCancel = () => {
    navigate('/');
  };

  const handleDeleteManga = async () => {
    try {
      await deleteMangaFromFirestore(id);
      navigate('/');
    } catch (error) {
      console.error('Error deleting manga:', error);
    }
  };

  if (!currentManga) {
    return <div>Loading...</div>;
  }

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
      <Typography variant="h4" gutterBottom>Edit Manga</Typography>

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

      <Typography variant="h6" gutterBottom>Add Episode</Typography>

      <TextField
        label="Episode Title"
        type="text"
        value={newEpisode.title}
        onChange={(e) => setNewEpisode({ ...newEpisode, title: e.target.value })}
        sx={{ margin: '10px', width: '100%' }}
      />
      <TextField
        label="Episode Description"
        type="text"
        value={newEpisode.description}
        onChange={(e) => setNewEpisode({ ...newEpisode, description: e.target.value })}
        sx={{ margin: '10px', width: '100%' }}
      />
      <TextField
        label="Image URL"
        type="text"
        value={imageInput}
        onChange={(e) => setImageInput(e.target.value)}
        sx={{ margin: '10px', width: '100%' }}
      />
      <Button onClick={handleAddImage} variant="outlined" sx={{ margin: '10px' }}>
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
        {newEpisode.images.map((img, index) => (
          <React.Fragment key={index}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt={`Episode ${newEpisode.title}`} src={img} />
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
                      {`Episode: ${newEpisode.title}`}
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
      <Button onClick={handleEditManga} variant="outlined" sx={{ margin: '10px' }}>
        Save Changes
      </Button>
      <Button onClick={handleCancel} variant="outlined" sx={{ margin: '10px' }}>
        Cancel
      </Button>
      <Button onClick={handleDeleteManga} variant="outlined" sx={{ margin: '10px' }}>
        Delete Manga
      </Button>
    </Box>
  );
};

export default EditManga;
