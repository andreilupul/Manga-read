import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import AddManga from './components/AddManga';
import MangaDetails from './components/MangaDetails';
import EditManga from './components/EditManga';
import MangaEpisodes from './components/MangaEpisodes';
import EpisodeDetails from './components/EpisodeDetails';

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-manga" element={<AddManga />} />
          <Route path="/manga/:id" element={<MangaDetails />} />
          <Route path="/manga/:id/episodes" element={<MangaEpisodes />} />
          <Route path="/manga/:id/episodes/:episodeId" element={<EpisodeDetails />} />
          <Route path="/edit-manga/:id" element={<EditManga />} /> {/* Rută corectă */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
