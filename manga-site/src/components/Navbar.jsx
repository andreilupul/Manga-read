// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const Navbar = () => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
        Manga Site
      </Typography>
      <Button color="inherit" component={Link} to="/">Home</Button>
      <Button color="inherit" component={Link} to="/add-manga">Add Manga</Button>
      <Button color="inherit" component={Link} to="/edit-manga/0">Edit Manga</Button>
    </Toolbar>
  </AppBar>
);

export default Navbar;
