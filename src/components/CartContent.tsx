import React, { createContext, useContext, useState } from 'react';

type CartItem = {
  id: number;
  name: string;
  price: number;
};

type CartContextType = {
  cart: CartItem[];
  totalPrice: number;
  addToCart: (item: CartItem) => void;
  removeFromCart: (item: CartItem, index: number) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const addToCart = (item: CartItem) => {
    setCart(prev => [...prev, item]);
    setTotalPrice(prev => prev + parseFloat(item.price.toString()));
  };

  const removeFromCart = (item: CartItem, index: number) => {
    setCart((prevCart) => {
      const newCart = [...prevCart];
      newCart.splice(index, 1);
      return newCart;
    });

    setTotalPrice(prev => prev - parseFloat(item.price.toString()));
  };

  return (
    <CartContext.Provider value={{ cart, totalPrice, addToCart, removeFromCart}}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};
