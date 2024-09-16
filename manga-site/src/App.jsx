import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import Navbar from './components/Navbar';
import Home from './components/Home';
import AddManga from './components/AddManga';
import MangaDetails from './components/MangaDetails';
import EditManga from './components/EditManga';
import MangaEpisodes from './components/MangaEpisodes';
import EpisodeDetails from './components/EpisodeDetails';


const theme = createTheme({
  palette: {
    mode: 'dark', // setează tema pe mod întunecat
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-manga" element={<AddManga />} />
          <Route path="/manga/:id" element={<MangaDetails />} />
          <Route path="/manga/:id/episodes" element={<MangaEpisodes />} />
          <Route path="/manga/:id/episodes/:episodeId" element={<EpisodeDetails />} />
          <Route path="/edit-manga/:id" element={<EditManga />} /> {/* Rută corectă */}
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
