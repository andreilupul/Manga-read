import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav>
    <ul>
      <li><Link to="/">Home</Link></li>
      <Link to="/add-manga">Add Manga</Link>
      <Link to="/edit-manga">Edit Manga</Link>
    </ul>
  </nav>
);

export default Navbar;
