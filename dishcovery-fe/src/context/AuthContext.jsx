import React, { createContext, useContext, useState, useEffect } from "react";
import { loginUser, registerUser } from "../api/authApi";

const AuthContext = createContext(null);
const STORAGE_KEY = "dishcovery_auth";

const parseAuthPayload = (response = {}, fallbackUser = null) => {
  const payload = response.data || response;

  const token =
    payload?.token ||
    payload?.accessToken ||
    payload?.jwt ||
    payload?.data?.token ||
    null;

  const user =
    payload?.user ||
    payload?.data?.user ||
    payload?.profile ||
    fallbackUser;

  return { user, token };
};

const getErrorMessage = (err, defaultMessage) => {
  if (!err) return defaultMessage;

  if (err.body) {
    try {
      const parsed = JSON.parse(err.body);
      return parsed?.message || parsed?.error || err.body || defaultMessage;
    } catch {
      return err.body || defaultMessage;
    }
  }

  return err.message || defaultMessage;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // hydrate from localStorage on load
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setUser(parsed.user || null);
        setToken(parsed.token || null);
      }
    } catch (err) {
      console.warn("Failed to read auth from storage", err);
    }
  }, []);

  // persist auth state
  useEffect(() => {
    const payload = user ? { user, token: token || null } : null;
    if (payload) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [user, token]);

  const login = async (email, password) => {
    try {
      const response = await loginUser({ email, password });
      const fallbackUser = {
        email,
        name: response?.name || email.split("@")[0],
      };
      const { user: authUser, token: authToken } = parseAuthPayload(
        response,
        fallbackUser
      );

      setUser(authUser);
      setToken(authToken);

      return { success: true };
    } catch (err) {
      console.error("Login failed", err);
      const message = getErrorMessage(
        err,
        "Unable to sign in. Please check your credentials."
      );
      return { success: false, message };
    }
  };

  const signup = async ({ firstName, lastName, email, password }) => {
    try {
      const response = await registerUser({
        firstName,
        lastName,
        email,
        password,
      });

      // Some APIs return user + token on signup. If so, auto-login.
      const fallbackUser = {
        email,
        name: `${firstName || ""} ${lastName || ""}`.trim() || email,
      };
      const { user: authUser, token: authToken } = parseAuthPayload(
        response,
        fallbackUser
      );

      if (authToken) {
        setUser(authUser);
        setToken(authToken);
      }

      return { success: true, autoLoggedIn: !!authToken };
    } catch (err) {
      console.error("Signup failed", err);
      const message = getErrorMessage(
        err,
        "Unable to create account right now."
      );
      return { success: false, message };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  const updateUser = (updates = {}) => {
    setUser((prev) => ({ ...(prev || {}), ...updates }));
  };

  const value = {
    user,
    token,
    isAuthenticated: !!user,
    login,
    signup,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
