import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { Link } from 'react-router-dom';

const Home = () => {
  const mangaList = JSON.parse(localStorage.getItem('manga')) || [];
  
  return (
    <div>
      <h1>Home</h1>
      
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
        {mangaList.map((manga, index) => (
          <div key={index} style={{ flex: '1 1 calc(25% - 16px)', maxWidth: 'calc(25% - 160px)' }}>
            <Link to={`/manga/${index}`} style={{ textDecoration: 'none' }}>
              <Card sx={{ maxWidth: 200 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="auto"
                    image={manga.coverImage} 
                    alt={manga.title}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="" component="div">
                      {manga.title}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
