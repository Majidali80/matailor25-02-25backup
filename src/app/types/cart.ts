import { CustomizationDetails } from './customization'; // Adjust the import path as necessary

export interface CartItem {
    _id: string;
    productId: string;
    name: string;
    title: string;
    price: number;
    quantity: number;
    productImage: {
      asset: {
        url: string;
      };
    };
    customization?: CustomizationDetails;
    naapProvided?: boolean;
    sout?: boolean;
    category?: string;
    uploadDesign?: File[];
    tags?: string[];
    careInstructions?: string;
    discountPercentage?: number;
} 
    

// In your cart context
const addToCart = (item: CartItem) => {
  // Implementation to add item to cart
};