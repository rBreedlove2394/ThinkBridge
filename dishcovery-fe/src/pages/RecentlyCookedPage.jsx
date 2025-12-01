import React from "react";
import { Link } from "react-router-dom";
import { RecipeCard } from "../components/recipes/RecipeCard";

export const RecentlyCookedPage = ({ favourites = [], isAuthenticated, onRecipeClick }) => {

  console.log("favouritesfavouritesfavourites", favourites)

  // Not Signed In State
  if (!isAuthenticated) {
    return (
      <div className="favourites-page favourites-empty-state">
        <h1 className="favourites-title">Recently Cooked</h1>

        <p className="favourites-auth-text">
          Please <Link to="/login">sign in</Link> or{" "}
          <Link to="/register">create an account</Link> to save and view your favourite recipes.
        </p>
      </div>
    );
  }

  // Signed In + No Favourites State
  if (favourites.length === 0) {
    return (
      <div className="favourites-page favourites-empty-state">
        <h1 className="favourites-title">Favourites</h1>
        <p>You haven’t added any favourite recipes yet.</p>
      </div>
    );
  }

  // Signed In + Has Favourites
  return (
    <div className="favourites-page">
      <h1 className="favourites-title">Recently Cooked</h1>

      <div className="favourites-grid">
        {favourites.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            id={recipe.id}
            title={recipe.title}
            calories={recipe.calories}
            imageUrl={recipe.imageUrl || recipe.image}   // handles both mock + API
          />
        ))}

      </div>
    </div>
  );
};
