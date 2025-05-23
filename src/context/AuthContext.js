import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);

  const login = (userData) => setUser(userData);
  const logout = () => {
    setUser(null);
    setFavorites([]); // изчиства любими при изход (по избор)
  };

  const addToFavorites = (excursion) => {
    setFavorites((prev) => {
      if (prev.some((fav) => fav.id === excursion.id)) {
        return prev;
      }
      return [...prev, excursion];
    });
  };

  const removeFromFavorites = (id) => {
    setFavorites((prev) => prev.filter((fav) => fav.id !== id));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        favorites,
        addToFavorites,
        removeFromFavorites,
      }}>
      {children}
    </AuthContext.Provider>
  );
}
