// src/components/common/BackButton.jsx
import React from "react";

export const BackButton = ({
  label = "Back",
  hint,
  onClick,
  className = "",
  type = "button",
  iconOnly = false,
  ariaLabel,
}) => {
  const classes = [
    "back-button",
    iconOnly ? "back-button--icon-only" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      aria-label={iconOnly ? ariaLabel || label : undefined}
    >
      <span className="back-button__icon" aria-hidden="true">
        ←
      </span>
      {!iconOnly && (
        <span className="back-button__text">
          <span className="back-button__label">{label}</span>
          {hint && <span className="back-button__hint">{hint}</span>}
        </span>
      )}
    </button>
  );
};
