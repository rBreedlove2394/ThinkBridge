// src/pages/LoginPage.jsx
import React from 'react';

export const LoginPage = ({
  form,
  loading,
  error,
  onChange,
  onSubmit,
  onForgotPassword,
}) => {
  const handleForgot = onForgotPassword || (() => {});

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">Login</h1>

        <form className="auth-form" onSubmit={onSubmit}>
          {/* Email */}
          <div className="auth-field">
            <label className="auth-label" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="auth-input"
              value={form.email}
              onChange={(e) => onChange('email', e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="auth-field">
            <label className="auth-label" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="auth-input"
              value={form.password}
              onChange={(e) => onChange('password', e.target.value)}
            />
          </div>

          {error && <p className="auth-error">{error}</p>}

          <button
            type="submit"
            className="auth-submit-btn"
            disabled={loading}
          >
            {loading ? 'Submitting…' : 'Submit'}
          </button>
        </form>

        {onForgotPassword && (
          <button
            type="button"
            className="auth-secondary-link"
            onClick={handleForgot}
          >
            Forgot password?
          </button>
        )}
      </div>
    </div>
  );
};
