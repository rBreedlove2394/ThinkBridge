// src/components/search/RecipeSearchBar.jsx
import React, { useState } from 'react';

export const RecipeSearchBar = ({
  placeholder = 'Search by recipe name, ingredient, or cuisine…',
  initialQuery = '',
  onSearch,
}) => {
  const [query, setQuery] = useState(initialQuery);

  const handleSearch = () => {
    if (onSearch) onSearch(query.trim());
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <section className="recipe-search" >
      <div className="recipe-search-inner" style={{border: '2px solid #000000', borderRadius: '25px', padding: '4px 8px', display: 'flex', alignItems: 'center'}}>
        <input
          type="text"
          className="recipe-search-input"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <button
          type="button"
          className="recipe-search-icon"
          onClick={handleSearch}
          aria-label="Search"
          style={{
    background: "none",
    border: "none",
    padding: 0,
    fontSize: "22px",
    cursor: "pointer",
  }}
        >
          {/* replace with your SVG search icon if you have one */}
          🔍
        </button>
      </div>
    </section>
  );
};
