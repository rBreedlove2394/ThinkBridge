// src/pages/NotFoundPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BackButton } from '../components/common/BackButton.jsx';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <section className="page page-not-found">
      <BackButton onClick={() => navigate(-1)} iconOnly ariaLabel="Go back" />
      <h1>404 - Page Not Found</h1>
      <p>Oops! The page you’re looking for doesn’t exist.</p>
      <BackButton onClick={() => navigate('/')} iconOnly ariaLabel="Go to home" />
    </section>
  );
};
