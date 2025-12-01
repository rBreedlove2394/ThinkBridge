import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

const MOCK_USER = {
  email: "student@uncc.edu",
  password: "dishcovery123",
  name: "Dishcovery Student"
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("dishcovery_user");
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem("dishcovery_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("dishcovery_user");
    }
  }, [user]);

  const login = async (email, password) => {
    if (email === MOCK_USER.email && password === MOCK_USER.password) {
      setUser({ email: MOCK_USER.email, name: MOCK_USER.name });
      return { success: true };
    }

    return { success: false, message: "Invalid email or password." };
  };

  const logout = () => {
    setUser(null);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
