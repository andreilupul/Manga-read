import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditManga = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [mangaList, setMangaList] = useState(JSON.parse(localStorage.getItem('manga')) || []);
  const [currentManga, setCurrentManga] = useState(null);
  const [newEpisode, setNewEpisode] = useState({ title: '', description: '', images: [] });

  const handleEditClick = (index) => {
    setCurrentManga(mangaList[index]);
  };

  const handleDeleteManga = (index) => {
    const updatedMangaList = mangaList.filter((_, i) => i !== index);
    setMangaList(updatedMangaList);
    localStorage.setItem('manga', JSON.stringify(updatedMangaList));
    navigate('/');
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

  const handleCancel = () => {
    navigate('/');
  };

  if (currentManga) {
    return (
      <div>
        <h1>Edit Manga</h1>
        <input
          type="text"
          placeholder="Title"
          value={currentManga.title}
          onChange={(e) => setCurrentManga({ ...currentManga, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Cover Image URL"
          value={currentManga.coverImage}
          onChange={(e) => setCurrentManga({ ...currentManga, coverImage: e.target.value })}
        />
        <textarea
          placeholder="Description"
          value={currentManga.description}
          onChange={(e) => setCurrentManga({ ...currentManga, description: e.target.value })}
        />
        
        <h2>Add Episode</h2>
        <input
          type="text"
          placeholder="Episode Title"
          value={newEpisode.title}
          onChange={(e) => setNewEpisode({ ...newEpisode, title: e.target.value })}
        />
        <textarea
          placeholder="Episode Description"
          value={newEpisode.description}
          onChange={(e) => setNewEpisode({ ...newEpisode, description: e.target.value })}
        />
        <input
          type="text"
          placeholder="Image URL"
          onChange={(e) => setNewEpisode(prev => ({
            ...prev,
            images: [...prev.images, e.target.value]
          }))}
        />
        <button onClick={handleAddEpisode}>Add Episode</button>
        
        <button onClick={handleEditManga}>Save Changes</button>
        <button onClick={handleCancel}>Cancel</button>
        <button onClick={handleDeleteManga}>Delete Manga</button>
      </div>
    );
  }

  return (
    <div>
      <h1>Select Manga to Edit</h1>
      <ul>
        {mangaList.map((manga, index) => (
          <li key={index}>
            <h2>{manga.title}</h2>
            <button onClick={() => handleEditClick(index)}>Edit</button>
            <button onClick={() => handleDeleteManga(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EditManga;
