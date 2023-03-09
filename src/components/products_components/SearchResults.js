import React from 'react';
import { useLocation } from 'react-router-dom';

function SearchResults() {
  const location = useLocation();
  const searchResults = location.state ? location.state.searchResults : null;
  console.log(searchResults);
  console.log(location.state);

  return (
    <div>
      <h2>Search Results</h2>
      {searchResults ? (
        <ul>
          {searchResults.map((product) => (
            <li key={product.id}>{product.name}</li>
          ))}
        </ul>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
}

export default SearchResults;
