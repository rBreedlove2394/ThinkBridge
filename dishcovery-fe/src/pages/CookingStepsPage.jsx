// src/pages/CookingStepsPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getRecipeById } from "../api/spoonacularApi";
import { BackButton } from "../components/common/BackButton.jsx";

export const CookingStepsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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
          err.message || "Something went wrong while loading cooking steps."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (loading) return <p>Loading steps...</p>;

  if (error) {
    return (
      <div className="cooking-page">
        <p className="error-text">{error}</p>
        <BackButton onClick={() => navigate(-1)} iconOnly ariaLabel="Go back" />
      </div>
    );
  }

  if (!recipe || !recipe.steps || recipe.steps.length === 0) {
    return (
      <div className="cooking-page">
        <p>No steps available for this recipe.</p>
      </div>
    );
  }

  return (
    <div className="cooking-page">
      <div className="page-back-row">
        <BackButton
          onClick={() => navigate(-1)}
          iconOnly
          ariaLabel="Back to recipe overview"
        />
      </div>
      <h1 className="cooking-title">Cooking Steps</h1>

      <div className="cooking-steps-wrapper">
        {recipe.steps.map((step, index) => (
          <div key={step.id || index} className="cooking-step-card">
            <h3>
              <strong>Step {index + 1}:</strong>
            </h3>
            <ul className="cooking-step-list">
              {step.instructions.map((line, i) => (
                <li key={i}>{line}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};
