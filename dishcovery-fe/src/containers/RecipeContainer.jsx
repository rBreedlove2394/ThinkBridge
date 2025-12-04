// src/containers/RecipeContainer.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RecipePage } from "../pages/RecipePage";
import { getRecipeById } from "../api/spoonacularApi";
import { useAuth } from "../context/AuthContext";
import {
  isFavourite as checkFavourite,
  toggleFavourite as toggleFavouriteForUser,
} from "../utils/favouritesStorage";
import { addRecentlyCooked } from "../utils/recentlyCookedStorage";

export const RecipeContainer = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavourite, setIsFavourite] = useState(false);
  const [isCooked, setIsCooked] = useState(false);

  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!id) return;

    const fetchRecipe = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getRecipeById(id);
        setRecipe(data);
        if (isAuthenticated && user?.email) {
          setIsFavourite(checkFavourite(user.email, data.id));
          setIsCooked(false);
        } else {
          setIsFavourite(false);
          setIsCooked(false);
        }
      } catch (err) {
        console.error(err);
        setError(
          err.message || "Something went wrong while loading the recipe."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id, isAuthenticated, user]);

  const handleToggleFavourite = () => {
    if (!recipe) return;

    if (!isAuthenticated || !user?.email) return;

    const { isFavourite: nextFav } = toggleFavouriteForUser(
      user.email,
      recipe
    );
    setIsFavourite(nextFav);
  };

  const handleMarkCooked = () => {
    if (!recipe) return;
    if (!isAuthenticated || !user?.email) return;

    addRecentlyCooked(user.email, recipe);
    setIsCooked(true);
  };

  return (
    <RecipePage
      recipe={recipe}
      loading={loading}
      error={error}
      isFavourite={isFavourite}
      onToggleFavourite={handleToggleFavourite}
      onMarkCooked={handleMarkCooked}
      isCooked={isCooked}
    />
  );
};
