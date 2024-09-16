import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import AddManga from './components/AddManga';
import MangaDetails from './components/MangaDetails';
import EditManga from './components/EditManga';
import MangaEpisodes from './components/MangaEpisodes';
import EpisodeDetails from './components/EpisodeDetails'; // Asigură-te că ai creat această componentă

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
          <Route path="/manga/:id/episodes/:episodeId" element={<EpisodeDetails />} /> {/* Noua rută */}
          <Route path="/edit-manga" element={<EditManga />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
