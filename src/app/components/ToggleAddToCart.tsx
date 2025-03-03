import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import Link from 'next/link';

interface ToggleAddToCartProps {
    isAdded: boolean; // To determine if the item is in the cart
    onToggle: () => void; // Function to handle adding/removing from cart
    itemCount: number; // Number of items added to the cart
}

const ToggleAddToCart: React.FC<ToggleAddToCartProps> = ({ isAdded, onToggle, itemCount }) => {
    return (
        <div className="fixed bottom-4 right-4">
            <Link href="/cart">
                <button
                    onClick={onToggle}
                    className={`relative flex items-center justify-center bg-orange-500 text-white hover:bg-orange-600 transition duration-300 p-4 rounded-full`}
                >
                    <FaShoppingCart className={`text-2xl ${isAdded ? 'text-yellow-300' : 'text-white'}`} />
                    {itemCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                            {itemCount}
                        </span>
                    )}
                </button>
            </Link>
        </div>
    );
};

export default ToggleAddToCart; 