import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchProducts } from '../../products_api';

function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  const handleSearch = async (event) => {
    event.preventDefault();
    const words = searchQuery.trim().split(/\s+/);
    const products = await searchProducts(searchQuery);
    const filteredProducts = products.filter(product => {
      const nameWords = product.name.trim().toLowerCase().split(/\s+/);
      const categoryWords = product.category.trim().toLowerCase().split(/\s+/);
      const subcategoryWords = product.subcategory.trim().toLowerCase().split(/\s+/);
      const descriptionWords = product.description.trim().toLowerCase().split(/\s+/);
      return words.every(word => nameWords.includes(word.toLowerCase()) ||
        categoryWords.includes(word.toLowerCase()) ||
        subcategoryWords.includes(word.toLowerCase()) ||
        descriptionWords.includes(word.toLowerCase()));
    });
    
    setSearchResults(filteredProducts);
    navigate('/search', { state: { searchQuery, searchResults: products } });
  };

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // const handleKeyDown = (event) => {
  //   if (event.key === 'Enter') {
  //     handleSearch(event);
  //   }
  // };

  return (
    <div className="searchBar">
      <form onSubmit={handleSearch}>
        <div className="search-box">
          <input type="text" value={searchQuery} onChange={handleInputChange} placeholder="Search" />
        </div>
      </form>
    </div>
  );
}

export default SearchBar;
