import { useState } from 'react';

const AddManga = () => {
  const [title, setTitle] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [description, setDescription] = useState('');
  const [episodes, setEpisodes] = useState([]);
  const [episodeTitle, setEpisodeTitle] = useState('');
  const [episodeImages, setEpisodeImages] = useState([]);
  const [newImage, setNewImage] = useState('');

  const handleAddImage = () => {
    if (newImage) {
      setEpisodeImages([...episodeImages, newImage]);
      setNewImage('');
    }
  };

  const handleAddEpisode = () => {
    if (episodeTitle && episodeImages.length > 0) {
      const newEpisode = { title: episodeTitle, images: episodeImages };
      setEpisodes([...episodes, newEpisode]);
      setEpisodeTitle('');
      setEpisodeImages([]);
    }
  };

  const handleSubmit = () => {
    const newManga = { title, coverImage, description, episodes };
    // Salvează manga în localStorage
    const existingManga = JSON.parse(localStorage.getItem('manga')) || [];
    localStorage.setItem('manga', JSON.stringify([...existingManga, newManga]));
  };

  return (
    <div>
      <h1>Add Manga</h1>
      <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <input type="text" placeholder="Cover Image URL" value={coverImage} onChange={(e) => setCoverImage(e.target.value)} />
      <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>

      <h2>Add Episode</h2>
      <input 
        type="text" 
        placeholder="Episode Title" 
        value={episodeTitle} 
        onChange={(e) => setEpisodeTitle(e.target.value)} 
      />
      <input 
        type="text" 
        placeholder="Image URL" 
        value={newImage} 
        onChange={(e) => setNewImage(e.target.value)} 
      />
      <button onClick={handleAddImage}>Add Image</button>
      
      <div>
        <h3>Images for Episode</h3>
        {episodeImages.map((img, index) => (
          <img key={index} src={img} alt={`Episode ${episodeTitle} - ${index}`} style={{ width: '100px', height: '100px' }} />
        ))}
      </div>
      <button onClick={handleAddEpisode}>Add Episode</button>

      <button onClick={handleSubmit}>Add Manga</button>
    </div>
  );
};

export default AddManga;
