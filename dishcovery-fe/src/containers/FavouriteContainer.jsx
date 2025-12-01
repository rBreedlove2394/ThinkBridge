// src/containers/FavouritesContainer.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FavouritesPage } from "../pages/FavouritesPage";
import { MOCK_RECIPES } from "../mock/recipes";

export const FavouritesContainer = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const favourites = MOCK_RECIPES.filter((r) => r.isFavourite);
  
  const handleRecipeClick = (recipe) => {
    navigate(`/recipe/${recipe.id}`);
  };

  return (
    <FavouritesPage
      favourites={favourites}
      isAuthenticated={isAuthenticated}
      onRecipeClick={handleRecipeClick}
    />
  );
};
