// src/containers/SearchContainer.jsx
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SearchPage } from '../pages/SearchPage';
import { searchRecipesFromSpoonacular } from '../api/spoonacularApi';


export const SearchContainer = () => {
  const [recipes, setRecipes] = useState([]);
  const [filters, setFilters] = useState({
    cuisine: "",
    dietary: "",
    level: "",
    time: "",
  });
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [ingredients, setIngredients] = useState([]);

  const fetchRecipes = async (opts = {}) => {
  const { query: q = query, filters: f = filters,ingredients:ingr =ingredients, } = opts;

  try {
    setLoading(true);
    setError(null);

    const results = await searchRecipesFromSpoonacular({
      query: q,          // can be empty string
      cuisine: f.cuisine,
      dietary: f.dietary,
      time: f.time,
      ingredients: ingr,  // can be empty array
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
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    const initialFilters = {
      cuisine: params.get("cuisine") || "",
      dietary: params.get("dietary") || "",
      level: params.get("level") || "",
      time: params.get("time") || "",
    };

    const initialQuery = params.get("q") || "";

    const ingredientsParam = params.get("ingredients");       // ⬅ NEW
    const initialIngredients = ingredientsParam
      ? ingredientsParam.split(",")
      : [];

    const hasAny =
      initialQuery ||
      initialFilters.cuisine ||
      initialFilters.dietary ||
      initialFilters.time ||
      initialFilters.level ||
      initialIngredients.length > 0;                          // ⬅ UPDATED

    if (!hasAny) return;

    setFilters(initialFilters);
    setQuery(initialQuery);
    setIngredients(initialIngredients);                       // ⬅ NEW

    fetchRecipes({
      query: initialQuery,
      filters: initialFilters,
      ingredients: initialIngredients,                        // ⬅ NEW
    });
  }, [location.search]);

  const handleSearch = (newQuery) => {
    setQuery(newQuery);
    fetchRecipes({ query: newQuery, filters });
  };

  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
    fetchRecipes({ query, filters: newFilters });
  };

  const handleResetFilters = () => {
    const reset = {
      cuisine: "",
      dietary: "",
      level: "",
      time: "",
    };
    setFilters(reset);
    fetchRecipes({ query, filters: reset });
  };

  return (
    <SearchPage
      onApplyFilters={handleApplyFilters}
      onResetFilters={handleResetFilters}
      onSearch={handleSearch}
      recipes={recipes}
      loading={loading}
      error={error}
    />
  );
};
