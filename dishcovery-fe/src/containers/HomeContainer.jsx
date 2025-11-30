// src/containers/HomeContainer.jsx
import React, { useState } from "react";
import { HomePage } from "../pages/HomePage";
import { useNavigate } from "react-router-dom";
import { searchRecipesFromSpoonacular } from "../api/spoonacularApi";

export const HomeContainer = () => {
  const [filters, setFilters] = useState({
    cuisine: "",
    dietary: "",
    level: "",
    time: "",
  });

  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  const navigate = useNavigate();
  const handleToggleIngredient = (ingredient) => {
    setSelectedIngredients((prev) =>
      prev.includes(ingredient)
        ? prev.filter((i) => i !== ingredient)
        : [...prev, ingredient]
    );
  };
  const fetchRecipes = async (newFilters) => {
    try {
      setLoading(true);
      setError(null);

      const results = await searchRecipesFromSpoonacular({
        query: "", // home page: no text search, just filters
        cuisine: newFilters.cuisine,
        dietary: newFilters.dietary,
        time: newFilters.time,
        // level is client-side only for now, we’re not sending it to API
      });

      setRecipes(results);
    } catch (err) {
      console.error(err);
      setError(
        err.message || "Something went wrong while fetching recipes."
      );
    } finally {
      setLoading(false);
    }
  };

   const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);

    const params = new URLSearchParams();
    if (newFilters.cuisine) params.set('cuisine', newFilters.cuisine);
    if (newFilters.dietary) params.set('dietary', newFilters.dietary);
    if (newFilters.level) params.set('level', newFilters.level);
    if (newFilters.time) params.set('time', newFilters.time);
    if (selectedIngredients.length > 0) {
      params.set("ingredients", selectedIngredients.join(","));
    }
    const queryString = params.toString();
    if (queryString) {
      navigate(`/search?${queryString}`);
    } else {
      navigate('/search');
    }
  };

  const handleResetFilters = () => {
    const reset = {
      cuisine: "",
      dietary: "",
      level: "",
      time: "",
    };
    setFilters(reset);
    setRecipes([]);
    setError(null);
  };

  const handleStartHere = () => {
    navigate("/search");
  };

  return (
    <HomePage
      filters={filters}
      onApplyFilters={handleApplyFilters}
      onResetFilters={handleResetFilters}
      onStartHere={handleStartHere}
      recipes={recipes}
      loading={loading}
      error={error}
      selectedIngredients={selectedIngredients}          
      onToggleIngredient={handleToggleIngredient}    
    />
  );
};
