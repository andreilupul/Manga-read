import React, { useState } from 'react';

const EditManga = () => {
  const [mangaList, setMangaList] = useState(JSON.parse(localStorage.getItem('manga')) || []);
  
  const handleDeleteManga = (index) => {
    const updatedMangaList = mangaList.filter((_, i) => i !== index);
    setMangaList(updatedMangaList);
    localStorage.setItem('manga', JSON.stringify(updatedMangaList));
  };

  return (
    <div>
      <h1>Edit Manga</h1>
      {mangaList.length === 0 ? (
        <p>No manga available</p>
      ) : (
        <ul>
          {mangaList.map((manga, index) => (
            <li key={index}>
              <h2>{manga.title}</h2>
              <button onClick={() => handleDeleteManga(index)}>Delete</button>
              {/* Poți adăuga aici și funcționalitatea de editare */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EditManga;
