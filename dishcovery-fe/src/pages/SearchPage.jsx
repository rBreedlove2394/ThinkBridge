// src/pages/SearchPage.jsx
import React from "react";
import { SmartFilter } from "../components/filters/SmartFilter";
import { RecipeSearchBar } from "../components/search/RecipeSearchBar";
import { RecipeCard } from "../components/recipes/RecipeCard";
import { Loader } from "../components/common/Loader";

export const SearchPage = ({
  onApplyFilters,
  onResetFilters,
  onSearch,
  recipes,
  loading,
  error,
}) => {
  return (
    <div className="search-page">
      <section className="search-hero">
        <h1 className="search-title">Find your next dish</h1>
        <p className="search-subtitle">
          Search by recipe name, ingredient, cuisine, or filter by dietary
          preferences and time.
        </p>

        <RecipeSearchBar onSearch={onSearch} />
      </section>

      <section className="search-filters">
        <SmartFilter
          onApply={onApplyFilters}
          onReset={onResetFilters}
        />
      </section>

      {error && (
        <div className="error-banner">
          {error}
        </div>
      )}

      <section className="search-results">
        {loading ? (
          <Loader />
        ) : recipes.length === 0 ? (
          <p className="search-empty">
            No recipes yet. Try searching for something like “pasta” or “chicken”.
          </p>
        ) : (
          <div className="recipe-grid">
            {recipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                id={recipe.id}
                title={recipe.title}
                calories={recipe.calories}
                imageUrl={recipe.imageUrl}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
