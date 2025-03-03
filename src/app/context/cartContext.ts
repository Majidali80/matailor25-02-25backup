import React, { createContext, useContext, useState } from 'react';
import { CartItem } from '../types/cart';

interface CartContextType {
    cart: CartItem[];
    addToCart: (item: CartItem) => void;
    updateQuantity: (productId: string, action: 'increase' | 'decrease') => void;
    removeFromCart: (productId: string) => void;
    clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const addToCart = (item: CartItem) => {
        setCartItems((prevItems) => [...prevItems, item]);
    };

    const updateQuantity = (productId: string, action: 'increase' | 'decrease') => {
        setCartItems((prevItems) => {
            return prevItems.map(item => {
                if (item.productId === productId) {
                    return {
                        ...item,
                        quantity: action === 'increase' ? item.quantity + 1 : Math.max(item.quantity - 1, 1),
                    };
                }
                return item;
            });
        });
    };

    const removeFromCart = (productId: string) => {
        setCartItems((prevItems) => prevItems.filter(item => item.productId !== productId));
    };

    const clearCart = () => {
        setCartItems([]);
    };

    return (
        <CartContext.Provider value={{ cart: cartItems, addToCart, updateQuantity, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}; 