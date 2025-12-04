import React from 'react';
import { useNavigate } from 'react-router-dom';

export const RecipeCard = ({ id, title, calories, imageUrl, onClick }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
      return;
    }
    navigate(`/recipe/${id}`);
  };

  // 🧠 Only show calories when we have a real number
  const showCalories =
    calories !== null &&
    calories !== undefined &&
    calories !== "N/A" &&
    !Number.isNaN(calories);

  return (
    <article
      className="recipe-card"
      onClick={handleClick}
      style={{ cursor: "pointer" }}
    >
      <div className="recipe-card-image-wrapper">
        <img src={imageUrl} alt={title} />
      </div>

      <div className="recipe-card-body">
        <h3 className="recipe-card-title">{title}</h3>

        {showCalories && (
          <p className="recipe-card-calories">
            Calories: {Math.round(calories)}
          </p>
        )}
        {/* If calories missing → simply hide line */}
      </div>
    </article>
  );
};
