import { Link } from 'react-router-dom';

const Home = () => {
  const mangaList = JSON.parse(localStorage.getItem('manga')) || [];

  return (
    <div>
      <h1>Home</h1>
      <div>
        {mangaList.map((manga, index) => (
          <div key={index}>
            <Link to={`/manga/${index}`}>
              <img src={manga.coverImage} alt={manga.title} />
              <h2>{manga.title}</h2>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
