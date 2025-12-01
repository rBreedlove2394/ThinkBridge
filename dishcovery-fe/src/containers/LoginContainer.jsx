// src/containers/LoginContainer.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LoginPage } from "../pages/LoginPage"; // your existing UI component

export const LoginContainer = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState("");

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const result = await login(form.email, form.password);

    if (!result.success) {
      setError(result.message || "Login failed.");
      return;
    }

    // go to home or profile after login
    navigate("/");
  };

  return (
    <LoginPage
      form={form}
      onChange={handleChange}
      onSubmit={handleSubmit}
      error={error}
      isAuthenticated={isAuthenticated}
    />
  );
};
