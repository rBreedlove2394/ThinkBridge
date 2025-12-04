// src/containers/RegisterContainer.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RegisterPage } from '../pages/RegisterPage';
import { useAuth } from '../context/AuthContext';

export const RegisterContainer = () => {
  const navigate = useNavigate();
  const { signup, isAuthenticated } = useAuth();
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setError('');
    setSuccessMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // quick basic validation
    if (!form.firstName || !form.email || !form.password) {
      setError('Please fill in required fields.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      const result = await signup({
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        password: form.password,
      });

      if (!result.success) {
        setError(result.message || 'Unable to register. Please try again.');
        return;
      }

      if (result.autoLoggedIn) {
        navigate('/');
      } else {
        setSuccessMessage('Account created successfully! Please sign in.');
        navigate('/login');
      }
    } catch (err) {
      console.error(err);
      setError('Unable to register. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <RegisterPage
      form={form}
      loading={loading}
      error={error}
      successMessage={successMessage}
      onChange={handleChange}
      onSubmit={handleSubmit}
    />
  );
};
