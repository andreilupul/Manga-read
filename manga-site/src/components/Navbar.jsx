// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const Navbar = () => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
        MangaRo
      </Typography>
      <Button
        color="inherit"
        component={Link}
        to="/"
        sx={{
          '&:hover': {
            backgroundColor: '#2E073F',
          },
        }}
      >
        Home
      </Button>
      <Button
        color="inherit"
        component={Link}
        to="/add-manga"
        sx={{
          '&:hover': {
            backgroundColor: '#2E073F',
          },
        }}
      >
        Add Manga
      </Button>
      <Button
        color="inherit"
        component={Link}
        to="/manga-list"
        sx={{
          '&:hover': {
            backgroundColor: '#2E073F',
          },
        }}
      >
        Edit Manga
      </Button>
    </Toolbar>
  </AppBar>
);

export default Navbar;
