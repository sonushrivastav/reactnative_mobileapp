import React, { createContext, useContext, useState } from 'react';

const FavoriteContext = createContext();

export const useFavoriteContext = () => {
  return useContext(FavoriteContext);
};

export const FavoriteProvider = ({ children }) => {
  const [favoriteProducts, setFavoriteProducts] = useState([]);

  const addFavorite = (product) => {
    setFavoriteProducts([...favoriteProducts, product]);
  };

  const removeFavorite = (productId) => {
    const updatedFavorites = favoriteProducts.filter((product) => product.id !== productId);
    setFavoriteProducts(updatedFavorites);
  };

  return (
    <FavoriteContext.Provider value={{ favoriteProducts, addFavorite, removeFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
};

