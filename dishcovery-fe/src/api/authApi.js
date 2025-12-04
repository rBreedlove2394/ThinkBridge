// src/api/authApi.js
import { apiClient } from './client';
import { API_ROUTES } from './endpoints';

const USE_MOCK_AUTH =
  (import.meta.env.VITE_USE_MOCK_AUTH || '').toLowerCase() !== 'false';
const MOCK_USERS_KEY = 'dishcovery_mock_users';

const readMockUsers = () => {
  try {
    const stored = localStorage.getItem(MOCK_USERS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const writeMockUsers = (users) => {
  localStorage.setItem(MOCK_USERS_KEY, JSON.stringify(users));
};

const createToken = (email) =>
  btoa(`${email}-${Date.now()}-${Math.random().toString(36).slice(2)}`);

const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

const mockRegister = async ({ firstName, lastName, email, password }) => {
  await delay();
  const users = readMockUsers();
  const existing = users.find(
    (u) => u.email.trim().toLowerCase() === email.trim().toLowerCase()
  );
  if (existing) {
    const err = new Error('User already exists.');
    err.status = 409;
    throw err;
  }

  const newUser = {
    firstName,
    lastName,
    email,
    password,
    name: `${firstName || ''} ${lastName || ''}`.trim() || email,
  };

  users.push(newUser);
  writeMockUsers(users);

  // Return token + user to mimic real API
  return {
    user: { email, name: newUser.name },
    token: createToken(email),
  };
};

const mockLogin = async ({ email, password }) => {
  await delay();
  const users = readMockUsers();
  const user = users.find(
    (u) => u.email.trim().toLowerCase() === email.trim().toLowerCase()
  );

  if (!user || user.password !== password) {
    const err = new Error('Invalid email or password.');
    err.status = 401;
    throw err;
  }

  return {
    user: { email: user.email, name: user.name || user.email },
    token: createToken(email),
  };
};

export function registerUser(payload) {
  if (USE_MOCK_AUTH) {
    return mockRegister(payload);
  }

  return apiClient(API_ROUTES.AUTH.REGISTER, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function loginUser(payload) {
  if (USE_MOCK_AUTH) {
    return mockLogin(payload);
  }

  return apiClient(API_ROUTES.AUTH.LOGIN, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}
