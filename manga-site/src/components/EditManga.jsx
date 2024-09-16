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

const EditManga = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [mangaList, setMangaList] = useState([]);
  const [currentManga, setCurrentManga] = useState(null);
  const [newEpisode, setNewEpisode] = useState({ title: '', description: '', images: [] });
  const [imageInput, setImageInput] = useState('');

  // Load manga list from local storage
  useEffect(() => {
    const storedMangaList = JSON.parse(localStorage.getItem('manga')) || [];
    setMangaList(storedMangaList);
    if (id !== undefined) {
      setCurrentManga(storedMangaList[parseInt(id, 10)] || null); // Set current manga based on id
    }
  }, [id]);

  const handleEditClick = (index) => {
    navigate(`/edit/${index}`);
  };

  const handleDeleteManga = (index) => {
    const updatedMangaList = mangaList.filter((_, i) => i !== index);
    setMangaList(updatedMangaList);
    localStorage.setItem('manga', JSON.stringify(updatedMangaList));
    if (parseInt(id, 10) === index) {
      navigate('/');
    }
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

  if (id === undefined) {
    // Display list of manga
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
  }

  if (currentManga) {
    // Display edit form for selected manga
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
        <Button onClick={() => handleDeleteManga(parseInt(id, 10))} variant="outlined" sx={{ margin: '10px' }}>
          Delete Manga
        </Button>
      </Box>
    );
  }

  return null;
};

export default EditManga;
