// src/containers/RecipeContainer.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RecipePage } from "../pages/RecipePage";
import { getRecipeById } from "../api/spoonacularApi";

export const RecipeContainer = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchRecipe = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getRecipeById(id);
        setRecipe(data);
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
  }, [id]);

  return <RecipePage recipe={recipe} loading={loading} error={error} />;
};
