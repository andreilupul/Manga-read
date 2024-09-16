import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav>
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/add-manga">Add Manga</Link></li>
      <li><Link to="/edit-manga/0">Edit Manga (Example)</Link></li> {/* Exemplu cu ID-ul 0 */}
    </ul>
  </nav>
);

export default Navbar;
