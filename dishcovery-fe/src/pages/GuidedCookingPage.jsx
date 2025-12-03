// src/pages/GuidedCookingPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getRecipeById } from "../api/spoonacularApi";
import { BackButton } from "../components/common/BackButton.jsx";

export const GuidedCookingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [recipe, setRecipe] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [paused, setPaused] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch recipe + steps
  useEffect(() => {
    if (!id) return;

    const fetchRecipe = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getRecipeById(id);
        setRecipe(data);
        if (data.steps && data.steps.length > 0) {
          setCurrentIndex(0);
        }
      } catch (err) {
        console.error(err);
        setError(
          err.message || "Something went wrong while loading guided mode."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  const getStepDuration = (index) => {
    if (!recipe || !recipe.steps || !recipe.steps[index]) return 60;
    return recipe.steps[index].durationSeconds || 60;
  };

  // Timer logic
  useEffect(() => {
    if (!recipe || !recipe.steps || recipe.steps.length === 0) return;

    const currentStep = recipe.steps[currentIndex];
    if (!currentStep) return;

    if (secondsLeft <= 0 || paused) return;

    const intervalId = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalId);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [recipe, currentIndex, secondsLeft, paused]);

  // Reset timer when recipe loads or step changes
  useEffect(() => {
    if (!recipe || !recipe.steps || recipe.steps.length === 0) return;
    const duration = getStepDuration(currentIndex);
    setSecondsLeft(duration);
    setPaused(false);
  }, [recipe, currentIndex]);

  const handleNextStep = () => {
    if (!recipe || !recipe.steps) return;

    if (currentIndex < recipe.steps.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
    } else {
      // finished
      navigate(`/recipe/${id}`);
    }
  };

  const handlePauseToggle = () => {
    setPaused((prev) => !prev);
  };

  const handleRestartTimer = () => {
    setSecondsLeft(getStepDuration(currentIndex));
    setPaused(false);
  };

  const formatTime = (totalSeconds) => {
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  if (loading) {
    return (
      <div className="guided-page">
        <p>Loading guided steps...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="guided-page">
        <p className="error-text">{error}</p>
        <BackButton onClick={() => navigate(-1)} iconOnly ariaLabel="Go back" />
      </div>
    );
  }

  if (!recipe || !Array.isArray(recipe.steps) || recipe.steps.length === 0) {
    return (
      <div className="guided-page">
        <p>No guided steps available for this recipe.</p>
      </div>
    );
  }

  const step = recipe.steps[currentIndex];

  return (
    <div className="guided-page">
      <header className="guided-header">
        <BackButton
          onClick={() => navigate(-1)}
          className="back-button--inline"
          iconOnly
          ariaLabel="Back to recipe overview"
        />
        <div className="guided-heading-group">
          <h1 className="guided-title">{recipe.title}</h1>
          <p className="guided-subtitle">
            Step {currentIndex + 1} of {recipe.steps.length}
          </p>
        </div>
      </header>

      <section className="guided-body">
        <div className="guided-left">
          <h2 className="guided-step-title">{step.title}</h2>
          <ul className="guided-step-list">
            {step.instructions.map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ul>
        </div>

        <div className="guided-right">
          <div className="guided-timer-card">
            <p className="guided-timer-label">Timer</p>
            <div className="guided-timer">{formatTime(secondsLeft)}</div>
            <p className="guided-timer-status">
              {paused ? "Paused" : "Counting down"}
            </p>
            <div className="guided-timer-actions">
              <button className="btn-secondary" onClick={handlePauseToggle}>
                {paused ? "Resume" : "Pause"}
              </button>
              <button className="btn-secondary" onClick={handleRestartTimer}>
                Restart
              </button>
            </div>
          </div>

          <div className="guided-next-wrapper">
            <button
              className="btn-dark guided-next-btn"
              onClick={handleNextStep}
            >
              {currentIndex < recipe.steps.length - 1 ? "Next step" : "Finish"}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
