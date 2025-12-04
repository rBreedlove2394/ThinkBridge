// src/containers/FavouritesContainer.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FavouritesPage } from "../pages/FavouritesPage";
import { getFavouritesForUser } from "../utils/favouritesStorage";

export const FavouritesContainer = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    if (isAuthenticated && user?.email) {
      setFavourites(getFavouritesForUser(user.email));
    } else {
      setFavourites([]);
    }
  }, [isAuthenticated, user]);
  
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
