import Link from "next/link";
import { Product } from "@/app/types/product"; // Import the Product interface
import ProductCardProps  from '../products-Card/page'; // Ensure this path is correct

// Define the interface for the product card props
interface ProductCardProps {
  product: Product; // Use the imported Product interface here
  
  
}

// Define the ProductCard component using the props interface
const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="product-card bg-white rounded-lg shadow-lg p-4 hover:shadow-2xl transition-all">
      <Link href={`/product/${product._id}`}>
        <div className="relative w-full h-60 mb-4">
          <img
            src={product.productImage.asset.url}
            alt={product.title}
            className="object-cover w-full h-full"
          />
        </div>
        <h2 className="text-lg font-semibold">{product.title}</h2>
        <p className="text-sm">PKR {product.price}</p>
        <p className="text-sm">{product.availability}</p>
        <p className="text-sm">{product.isNewArrival ? "New Arrival!" : ""}</p>
        <p className="text-sm text-red-500">Discount: {product.discountPercentage}%</p>
        <p className="text-sm text-red-500">Best Seller</p>
        <p className="text-sm">{product.tags}</p>
        <p className="text-sm">{product.careInstructions}</p>
        <p className="text-sm">{product.shippingInformation}</p>
        <p className="text-sm">{product.specialOffers}</p>  
      </Link>
    </div>
  );
};

// Default export of the ProductCard component
export default ProductCard;
