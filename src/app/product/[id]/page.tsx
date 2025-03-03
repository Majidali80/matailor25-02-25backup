"use client";

import { useCart } from "../../context/cartContext"; // Import CartContext
import { useEffect, useState } from "react";
import { sanityFetch } from "@/sanity/lib/fetch"; // Custom fetch function
import { productQuery } from "@/sanity/lib/queries"; // Query for a single product by ID
import Image from "next/image";
import { Product } from "../../types/product";
import { CartItem } from "../../types/cart";
import CustomizationForm from '../../components/CustomizationForm';
import { CustomizationDetails } from '../../types/customization'; // Import the type
import SizeGuide from '../../components/sizeGuide'; // Import the SizeGuide component
import router from 'next/router'; // Import useRouter for redirection
import CartPopup from '../../components/CartPopup'; // Import CartPopup

interface ProductDetailProps {
    params: { id: string };
    currentProductTags: string[]; // Add this line to define the expected prop
}

const ProductDetail: React.FC<ProductDetailProps> = ({ params, currentProductTags }) => {
    const [product, setProduct] = useState<Product | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [quantity, setQuantity] = useState<number>(1);
    const [showCustomizationForm, setShowCustomizationForm] = useState<boolean>(false);
    const [showSizeGuide, setShowSizeGuide] = useState<boolean>(false); // State for showing the size guide
    const [showCartPopup, setShowCartPopup] = useState(false); // State for the cart popup
    const [addedItem, setAddedItem] = useState<CartItem | null>(null); // State to store the added item details
    
    // Safely destructure the cart context
    const { addToCart, updateQuantity, removeFromCart } = useCart() || {}; // Ensure that useCart is not null

    // Fetch the product data using `useEffect`
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const fetchedProduct = await sanityFetch({
                    query: productQuery,
                    params: { id: params.id },
                });

                if (!fetchedProduct) {
                    setError("Product not found");
                } else {
                    setProduct(fetchedProduct);
                }
            } catch (err) {
                setError("An error occurred while fetching product data.");
            }
        };

        fetchProduct();
    }, [params.id]);

    if (error) {
        return (
            <div className="text-center my-8">
                <h2 className="text-xl font-bold">{error}</h2>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="text-center my-8">
                <h2 className="text-xl font-bold">Loading...</h2>
            </div>
        );
    }

    const handleQuantityChange = (type: "increment" | "decrement") => {
        setQuantity((prev) => (type === "increment" ? prev + 1 : Math.max(prev - 1, 1)));
    };

    const handleCustomizationSubmit = (customizationDetails: CustomizationDetails) => {
        const newCartItem: CartItem = {
            _id: product._id,
            productId: product._id,
            name: product.title,
            title: product.title,
            price: product.price,
            quantity,
            productImage: {
                asset: {
                    url: product.productImage?.asset?.url || '', // Provide a fallback empty string or a default image URL
                },
            },
            customization: customizationDetails,
            tags: product.tags,
            careInstructions: product.careInstructions,
            discountPercentage: product.discountPercentage,
        };

        addToCart(newCartItem);
        setAddedItem(newCartItem); // Store the added item details
        setShowCustomizationForm(false);
        setShowCartPopup(true); // Show the cart popup
        router.push('/cart'); // Redirect to the cart page
    };

    const handleClosePopup = () => {
        setShowCartPopup(false); // Close the popup
        router.push('/cart'); // Redirect to the cart page
    };

    const handleAddToCart = () => {
        if (addToCart && product) {
            const newCartItem: CartItem = {
                _id: product._id,
                productId: product._id,
                name: product.title,
                title: product.title,
                price: product.price,
                quantity,
                productImage: {
                    asset: {
                        url: product.productImage?.asset?.url || '', // Provide a fallback empty string or a default image URL
                    },
                },
                careInstructions: product.careInstructions,
                discountPercentage: product.discountPercentage,
            };

            addToCart(newCartItem); // Call the addToCart function
            setAddedItem(newCartItem); // Store the added item details
            setShowCartPopup(true); // Show the cart popup
        }
    };

    // New function to handle "Add to Wishlist"
    const handleAddToWishlist = () => {
        // Implement your wishlist logic here
        console.log(`Added ${product.title} to wishlist!`);
    };

    // Before the return statement, define inStock
    const inStock = product.stockStatus === "In Stock" && product.stockQuantity > 0; // Adjust based on your logic

    return (
        <div>
            <div className="container mx-auto my-12 px-6">
                <div className="flex flex-col lg:flex-row gap-12 items-start">
                    <div className="lg:w-1/2 w-full">
                        {product.productImage?.asset?.url ? (
                            <Image
                                src={product.productImage.asset.url}
                                alt={product.title}
                                width={500}
                                height={500}
                                className="rounded-lg shadow-lg object-contain"
                                quality={80}
                            />
                        ) : (
                            <div className="text-center text-gray-500">No image available</div>
                        )}
                    </div>
                    <div className="lg:w-1/2 w-full">
                        <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
                        <p className="text-gray-700 mb-4"> {product.description}</p>
                        <p className="text-gray-700 mb-4"> {product.fabricType}</p>
                        <p className="text-gray-700 mb-4"> {product.isNewArrival}</p>
                        <p className="text-gray-700 mb-4"> {product.tags}</p>
                        <p className="text-gray-700 mb-4"> {product.colours}</p>
                        <p className="text-gray-700 mb-4"> {product.sout}</p>
                        <p className="text-gray-700 mb-4"> {product.discountPercentage}</p>
                        <p className="text-gray-700 mb-4"> {product.careInstructions}</p>
                        <p className="text-gray-700 mb-4"> {product.availability}</p>
                        <p className="text-gray-700 mb-4"> {product.shippingInformation}</p>
                        <p className="text-gray-700 mb-4"> {product.specialOffers}</p>
                        {/* Stock Status */}
                        <div className="mb-6 flex items-center gap-4">
                            <p className="text-2xl font-bold text-red-500">
                                PKR {(product.price * quantity).toLocaleString()}
                            </p>
                            <div className="flex items-center gap-2">
                                <button
                                    className="px-3 py-1 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                                    onClick={() => handleQuantityChange("decrement")}
                                >
                                    -
                                </button>
                                <span className="text-lg font-medium">{quantity}</span>
                                <button
                                    className="px-3 py-1 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                                    onClick={() => handleQuantityChange("increment")}
                                >
                                    +
                                </button>
                            </div>
                        </div>
                        <p className="text-sm mb-6">
                            {product.stockStatus === "Out of Stock" ? (
                                <span className="text-red-500 font-medium">Out of Stock</span>
                            ) : (
                                <span className="text-green-500 font-semibold">AVAILABLE FOR STITCHING</span>
                            )}
                        </p>

                        {/* Action Buttons */}
                        <div className="flex gap-4">
                            <button
                                className="w-32 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-yellow-500"
                                onClick={() => setShowCustomizationForm(!showCustomizationForm)}
                            >
                                {showCustomizationForm ? 'Hide Customization' : 'Customize'}
                            </button>
                            <button
                                className="w-32 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-yellow-500"
                                onClick={handleAddToCart}
                            >
                                Add to Cart
                            </button>
                            <button
                                className="w-32 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-yellow-500"
                                onClick={handleAddToWishlist}
                            >
                                Add to Wishlist
                            </button>
                            <button
                                className="w-32 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                                onClick={() => setShowSizeGuide(true)}
                            >
                                View Size Guide
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
            {showCustomizationForm && <CustomizationForm onSubmit={handleCustomizationSubmit} />}
            {showSizeGuide && <SizeGuide />}
            {showCartPopup && addedItem && (
                <CartPopup item={addedItem} onClose={handleClosePopup} />
            )}
        </div>
    );
};

export default ProductDetail;
