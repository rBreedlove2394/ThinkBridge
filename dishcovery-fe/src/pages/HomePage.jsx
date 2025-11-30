// src/pages/HomePage.jsx
import React from 'react';
import { SmartFilter } from '../components/filters/SmartFilter';
import { RecipeCard } from '../components/recipes/RecipeCard';
import { Loader } from '../components/common/Loader';

export const HomePage = ({
  filters,
  onApplyFilters,
  onResetFilters,
  onStartHere,
  recipes=[],
  loading,
  error,
  selectedIngredients=[],
  onToggleIngredient,
}) => {
  return (
    <div className="home-page">
      {/* Hero section */}
      <section className="home-hero">
        <h1 className="home-title">Welcome to Dishcovery</h1>
        <p className="home-subtitle">
          Discover delicious recipes, personalized meal ideas, and cooking inspiration — all in one place.
        </p>

        <button className="home-start-button" onClick={onStartHere}>
          Start here
        </button>
      </section>

      {/* Filters */}
      <section id="smart-filter-section" className="home-filters">
        <SmartFilter
          onApply={onApplyFilters}
          onReset={onResetFilters}
          // optionally pass custom option arrays here
        />
      </section>

      {/* Ingredient checkbox card (placeholder content based on your Figma) */}
      <section className="home-ingredient-card">
        <div className="ingredient-grid">
          <label className="ingredient-item">
            <input type="checkbox"
    checked={selectedIngredients.includes("Chicken")}
    onChange={() =>
      onToggleIngredient && onToggleIngredient("Chicken")
      
    } style={{ accentColor: "#000" }}/>
            <span>Chicken</span>
          </label>
          <label className="ingredient-item">
            <input type="checkbox"
    checked={selectedIngredients.includes("Steak")}
    onChange={() =>
      onToggleIngredient && onToggleIngredient("Steak")
    } style={{ accentColor: "#000" }}/>
            <span>Steak</span>
          </label>
          <label className="ingredient-item">
            <input type="checkbox"
    checked={selectedIngredients.includes("Carrots")}
    onChange={() =>
      onToggleIngredient && onToggleIngredient("Carrots")
    } style={{ accentColor: "#000" }}/>
            <span>Carrots</span>
          </label>
          <label className="ingredient-item">
            <input type="checkbox"
    checked={selectedIngredients.includes("Onions")}
    onChange={() =>
      onToggleIngredient && onToggleIngredient("Onions")
    } style={{ accentColor: "#000" }}/>
            <span>Onions</span>
          </label>
          <label className="ingredient-item">
            <input type="checkbox"
    checked={selectedIngredients.includes("Tomatoes")}
    onChange={() =>
      onToggleIngredient && onToggleIngredient("Tomatoes")
    }style={{ accentColor: "#000" }} />
            <span>Tomatoes</span>
          </label>
          <label className="ingredient-item">
            <input type="checkbox"
    checked={selectedIngredients.includes("Broccoli")}
    onChange={() =>
      onToggleIngredient && onToggleIngredient("Broccoli")
    } style={{ accentColor: "#000" }}/>
            <span>Broccoli</span>
          </label>
          <label className="ingredient-item">
            <input type="checkbox"
    checked={selectedIngredients.includes("Potatoes")}
    onChange={() =>
      onToggleIngredient && onToggleIngredient("Potatoes")
    } style={{ accentColor: "#000" }}/>
            <span>Potatoes</span>
          </label>
          <label className="ingredient-item">
            <input type="checkbox"
    checked={selectedIngredients.includes("Rice")}
    onChange={() =>
      onToggleIngredient && onToggleIngredient("Rice")
    }style={{ accentColor: "#000" }} />
            <span>Rice</span>
          </label>

          <label className="ingredient-item">
            <input type="checkbox"
    checked={selectedIngredients.includes("Shrimp")}
    onChange={() =>
      onToggleIngredient && onToggleIngredient("Shrimp")
    } style={{ accentColor: "#000" }}/>
            <span>Shrimp</span>
          </label>
          <label className="ingredient-item">
            <input type="checkbox"
    checked={selectedIngredients.includes("Fish")}
    onChange={() =>
      onToggleIngredient && onToggleIngredient("Fish")
    } style={{ accentColor: "#000" }}/>
            <span>Fish (Fresh Water)</span>
          </label>
          <label className="ingredient-item">
            <input type="checkbox"
    checked={selectedIngredients.includes("Fish")}
    onChange={() =>
      onToggleIngredient && onToggleIngredient("Fish")
    } />
            <span>Fish (Salt Water)</span>
          </label>
          <label className="ingredient-item">
            <input type="checkbox"
    checked={selectedIngredients.includes("Clams")}
    onChange={() =>
      onToggleIngredient && onToggleIngredient("Clams")
    } style={{ accentColor: "#000" }}/>
            <span>Clams</span>
          </label>
          <label className="ingredient-item">
            <input type="checkbox"
    checked={selectedIngredients.includes("Crab")}
    onChange={() =>
      onToggleIngredient && onToggleIngredient("Crab")
    } style={{ accentColor: "#000" }}/>
            <span>Crab</span>
          </label>
          <label className="ingredient-item">
            <input type="checkbox"
    checked={selectedIngredients.includes("Lobster")}
    onChange={() =>
      onToggleIngredient && onToggleIngredient("Lobster")
    } style={{ accentColor: "#000" }}/>
            <span>Lobster</span>
          </label>
          <label className="ingredient-item">
            <input type="checkbox"
    checked={selectedIngredients.includes("Fruit")}
    onChange={() =>
      onToggleIngredient && onToggleIngredient("Fruit")
    } style={{ accentColor: "#000" }}/>
            <span>Fruit</span>
          </label>
          <label className="ingredient-item">
            <input type="checkbox"
    checked={selectedIngredients.includes("Red Peppers")}
    onChange={() =>
      onToggleIngredient && onToggleIngredient("Red Peppers")
    }style={{ accentColor: "#000" }} />
            <span>Red Peppers</span>
          </label>
        </div>
      </section>
    </div>
  );
};
