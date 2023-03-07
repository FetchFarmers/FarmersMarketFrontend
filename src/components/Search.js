import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Search({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    event.preventDefault();
    onSearch(searchTerm);
  }

  return (
    <form onSubmit={handleSearch}>
      <input type="text" placeholder="Search for products" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} />
      <button type="submit">Search</button>
    </form>
  );
}

export default Search;