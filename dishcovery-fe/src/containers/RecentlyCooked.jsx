// src/containers/FavouritesContainer.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { RecentlyCookedPage } from "../pages/RecentlyCookedPage";
import { getRecentlyCookedForUser } from "../utils/recentlyCookedStorage";

export const RecentlyCookedContainer = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [recentlyCooked, setRecentlyCooked] = useState([]);

  useEffect(() => {
    if (isAuthenticated && user?.email) {
      setRecentlyCooked(getRecentlyCookedForUser(user.email));
    } else {
      setRecentlyCooked([]);
    }
  }, [isAuthenticated, user]);
  
  const handleRecipeClick = (recipe) => {
    navigate(`/recipe/${recipe.id}`);
  };

  return (
    <RecentlyCookedPage
      recipes={recentlyCooked}
      isAuthenticated={isAuthenticated}
      onRecipeClick={handleRecipeClick}
    />
  );
};
