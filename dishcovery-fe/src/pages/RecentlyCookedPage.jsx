import React from "react";
import { Link } from "react-router-dom";
import { RecipeCard } from "../components/recipes/RecipeCard";

export const RecentlyCookedPage = ({ recipes = [], isAuthenticated, onRecipeClick }) => {

  // Not Signed In State
  if (!isAuthenticated) {
    return (
      <div className="favourites-page favourites-empty-state">
        <h1 className="favourites-title">Recently Cooked</h1>

        <p className="favourites-auth-text">
          Please <Link to="/login">sign in</Link> or{" "}
          <Link to="/register">create an account</Link> to save and view your recipes.
        </p>
      </div>
    );
  }

  // Signed In + No Recently Cooked State
  if (recipes.length === 0) {
    return (
      <div className="favourites-page favourites-empty-state">
        <h1 className="favourites-title">Recently Cooked</h1>
        <p>You haven’t marked any recipes as cooked yet.</p>
      </div>
    );
  }

  // Signed In + Has Recently Cooked
  return (
    <div className="favourites-page">
      <h1 className="favourites-title">Recently Cooked</h1>

      <div className="favourites-grid">
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            id={recipe.id}
            title={recipe.title}
            calories={recipe.calories}
            imageUrl={recipe.imageUrl || recipe.image}   // handles both mock + API
            onClick={() => onRecipeClick(recipe)}
          />
        ))}

      </div>
    </div>
  );
};
