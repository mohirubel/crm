import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state is important

  useEffect(() => {
    // Reading from localStorage is synchronous, but we handle it
    // as if it's an async operation (like a real API call).
    try {
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        setUser(JSON.parse(savedUser));
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      localStorage.removeItem("user");
    } finally {
      // Once verification is done, set loading to false
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    if (email === "admin@inventory.com" && password === "admin123") {
      const userData = { id: 1, email, name: "Admin User", role: "admin" };
      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem("user", JSON.stringify(userData));
      return { success: true };
    } else {
      return { success: false, error: "Invalid email or password" };
    }
  };

  const register = async ({ name, username, phone, email, password }) => {
    const savedUsers = JSON.parse(localStorage.getItem("users")) || [];

    // Check if email already exists
    if (savedUsers.some((u) => u.email === email)) {
      return { success: false, error: "Email already registered" };
    }

    const newUser = {
      id: Date.now(),
      name,
      username,
      phone,
      email,
      password, // ⚠️ In real apps, password should be hashed
    };

    // Auto-login after registration
    setUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem("user", JSON.stringify(newUser));

    return { success: true };
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  const value = {
    isAuthenticated,
    user,
    login,
    register,
    logout,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
