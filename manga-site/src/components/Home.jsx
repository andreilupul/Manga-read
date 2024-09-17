import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getMangaFromFirestore } from '../firebase'; // Importează funcția din firebase.js
import './Home.css'; // Importă fișierul CSS

const Home = () => {
  const [mangaList, setMangaList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchManga = async () => {
      try {
        const mangaData = await getMangaFromFirestore();
        setMangaList(mangaData || []); // Asigură-te că mangaList este întotdeauna un array
      } catch (error) {
        setError('Eroare la încărcarea manga.');
        console.error('Error fetching manga:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchManga();
  }, []);

  if (loading) {
    return <div>Se încarcă...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Home</h1>
      <div className="home-container">
        {mangaList.length > 0 ? (
          mangaList.map((manga, index) => (
            <div key={index} className="manga-card">
              <Link to={`/manga/${index}`} style={{ textDecoration: 'none' }}>
                <img src={manga.coverImage} alt={manga.title} />
                <div className="description">
                  <p>{manga.description}</p>
                </div>
                <div className="manga-title">
                  <h6>{manga.title}</h6>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <div>Nu există manga disponibile.</div>
        )}
      </div>
    </div>
  );
};

export default Home;
