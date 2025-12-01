// src/containers/FavouritesContainer.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { RecentlyCookedPage } from "../pages/RecentlyCookedPage";
import { MOCK_RECIPES } from "../mock/recipes";

export const RecentlyCookedContainer = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const favourites = MOCK_RECIPES.filter((r) => r.isFavourite);
  
  const handleRecipeClick = (recipe) => {
    navigate(`/recipe/${recipe.id}`);
  };

  return (
    <RecentlyCookedPage
      favourites={favourites}
      isAuthenticated={isAuthenticated}
      onRecipeClick={handleRecipeClick}
    />
  );
};
