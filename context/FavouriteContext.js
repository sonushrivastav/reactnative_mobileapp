import React, { createContext, useContext, useState } from 'react';

const FavoriteContext = createContext();

export const useFavoriteContext = () => {
  return useContext(FavoriteContext);
};

export const FavoriteProvider = ({ children }) => {
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const [cart,setCart] = useState([])

  const addFavorite = (product) => {
    setFavoriteProducts([...favoriteProducts, product]);
  };

  const addToCart = (prod) => {
    const itemIndex = cart.findIndex((cartItem) =>
      cartItem?.id === prod?.id
    )
    if (itemIndex !== -1) {
      return
    } else {
      
      setCart(prev=>[...prev, prod])
    }
  }
  
  const removeCart = (prodId) => {
    const updateCart = cart.filter((prod)=> prod?.id !== prodId)
    setCart(updateCart)
  }

  const removeFavorite = (productId) => {
    const updatedFavorites = favoriteProducts.filter((product) => product.id !== productId);
    setFavoriteProducts(updatedFavorites);
  };

  return (
    <FavoriteContext.Provider value={{ favoriteProducts, addFavorite, cart,removeFavorite ,addToCart,removeCart}}>
      {children}
    </FavoriteContext.Provider>
  );
};

