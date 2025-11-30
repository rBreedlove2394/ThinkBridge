// src/pages/CookingStepsPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getRecipeById } from "../api/spoonacularApi";

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
        <button className="btn-primary" onClick={() => navigate(-1)}>
          Go Back
        </button>
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
      <h1 className="cooking-title">Cooking Steps</h1>

      <div className="cooking-steps-wrapper">
        {recipe.steps.map((step, index) => (
          <div key={step.id || index} className="cooking-step-card">
            <div className="cooking-step-header">
              <span className="cooking-step-number">
                Step {index + 1}
              </span>
              {step.durationSeconds && (
                <span className="cooking-step-duration">
                  ~{Math.round(step.durationSeconds / 60)} min
                </span>
              )}
            </div>
            <h3>
              <strong>Step {index + 1}:</strong> {step.title}
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
