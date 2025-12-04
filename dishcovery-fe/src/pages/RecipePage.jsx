// src/pages/RecipePage.jsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BackButton } from "../components/common/BackButton.jsx";

export const RecipePage = ({
  recipe,
  loading,
  error,
  isFavourite = false,
  onToggleFavourite,
  onMarkCooked,
  isCooked = false,
}) => {
  const { id } = useParams();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="recipe-page">
        <p>Loading recipe...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="recipe-page">
        <p className="error-text">{error}</p>
        <BackButton onClick={() => navigate(-1)} iconOnly ariaLabel="Go back" />
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="recipe-page">
        <h2>Recipe not found</h2>
        <BackButton
          onClick={() => navigate("/search")}
          iconOnly
          ariaLabel="Back to search"
        />
      </div>
    );
  }

  const {
    title,
    imageUrl,
    calories,
    time,
    servings,
    cuisine,
    dietary,
    ingredients = [],
    instructions = [],
    // optional: if you later add this in your API
    nutritionLines = [],
  } = recipe;

  // Fallback nutrition list if nutritionLines not provided
  const hasNutritionLines =
    Array.isArray(nutritionLines) && nutritionLines.length > 0;

  return (
    <div className="recipe-page">
      {/* Back button */}
      <div className="page-back-row">
        <BackButton
          onClick={() => navigate(-1)}
          iconOnly
          ariaLabel="Back to previous page"
        />
      </div>

      {/* Main 3-column layout */}
      <section className="recipe-detail-layout">
        <div className="recipe-detail-grid">
          {/* LEFT COLUMN: title, meta, image */}
          <div className="recipe-detail-left">
            <h1 className="recipe-title">{title}</h1>

            <div className="recipe-fav-row">
              <div className="recipe-meta">
                {time && <span>{time}</span>}
                {servings && <span>{servings} servings</span>}
                {calories != null && <span>{calories} kcal</span>}
                {cuisine && <span>{cuisine}</span>}
              </div>

              <div className="recipe-action-stack">
                <button
                  type="button"
                  className={`fav-toggle ${isFavourite ? "is-fav" : ""}`}
                  onClick={onToggleFavourite}
                >
                  {isFavourite ? "★ Favourited" : "☆ Add to favourites"}
                </button>
                <button
                  type="button"
                  className="cook-toggle"
                  onClick={onMarkCooked}
                  disabled={isCooked}
                >
                  {isCooked ? "Cook again" : "Mark as cooked"}
                </button>
              </div>
            </div>

            {dietary && dietary.length > 0 && (
              <div className="recipe-tags">
                {dietary.map((tag) => (
                  <span key={tag} className="recipe-tag">
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div className="recipe-detail-image-wrapper">
              {imageUrl && <img src={imageUrl} alt={title} />}
            </div>
          </div>

          {/* MIDDLE COLUMN: Nutrition */}
          <div className="recipe-detail-middle">
            <h2 className="recipe-section-title">Nutrition</h2>
            {hasNutritionLines ? (
              <ul className="nutrition-list">
                {nutritionLines.map((line, idx) => (
                  <li key={idx}>{line}</li>
                ))}
              </ul>
            ) : (
              <ul className="nutrition-list">
                {calories != null && <li>Calories {calories} kcal</li>}
                {time && <li>Ready in {time}</li>}
                {servings && <li>Servings {servings}</li>}
              </ul>
            )}
          </div>

          {/* RIGHT COLUMN: Ingredients */}
          <div className="recipe-detail-right">
            <h2 className="recipe-section-title">Ingredients</h2>
            {ingredients.length > 0 ? (
              <ul className="ingredients-list">
                {ingredients.map((ing, idx) => (
                  <li key={idx}>{ing}</li>
                ))}
              </ul>
            ) : (
              <p>No ingredients available.</p>
            )}
          </div>
        </div>

        {/* Bottom buttons like your design */}
        <div className="recipe-detail-actions" style={{ marginTop: "32px" }}>
          <button
            className="btn-dark"
            onClick={() => navigate(`/recipe/${id}/steps`)}
          >
            Cooking steps
          </button>
          <button
            className="btn-dark"
            style={{ marginLeft: "16px" }}
            onClick={() => navigate(`/recipe/${id}/guided`)}
          >
            Guided Cooking
          </button>
        </div>

      </section>

      
    </div>
  );
};
