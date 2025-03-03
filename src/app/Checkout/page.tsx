"use client";
import { useState } from "react";
import { useCart } from "../context/cartContext";
import Link from "next/link";
import { createClient } from "@sanity/client";
import Swal from "sweetalert2";
import { FaShoppingCart } from "react-icons/fa";
import router from "next/router";
import CartPopup from '../components/CartPopup';
import { CustomizationDetails } from '../types/customization'; // Adjust the path as necessary
import { showNotification } from '../../utils/notification'; // Adjust the path as necessary

// Sanity client configuration
const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: 'production',
  apiVersion: '2023-05-03',
  useCdn: false,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});

interface CartItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  customization?: {
    designType: string;
    fabricType: string;
    measurements?: {
      chest: number;
      waist: number;
      hips: number;
    };
    uploadDesign?: File[];
    shirtSizes?: { size: string; length: number; image?: string }[];
    trouserSizes?: { size: string; length: number; image?: string }[];
  };
  productImage?: string;
  productId: string;
}

interface OrderData {
  _type: string;
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: {
      street1: string;
      street2?: string;
      city: string;
      country: string;
    };
    subscribe: boolean;
  };
  items: {
    _key: string;
    product: {
      _type: string;
      _ref: string;
    };
    quantity: number;
    price: number;
  }[];
  paymentMethod: string;
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  orderDate: string;
  notes?: string;
}

export default function CheckoutPage() {
  const { cart, clearCart, addToCart, updateQuantity, removeFromCart } = useCart();
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [promoError, setPromoError] = useState("");
  const [paymentOption, setPaymentOption] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCartPopup, setShowCartPopup] = useState(false);
  const [addedItem, setAddedItem] = useState<CartItem | null>(null);
  const [extraLace, setExtraLace] = useState(false);
  const [extraButton, setExtraButton] = useState(false);
  const [deliveryOption, setDeliveryOption] = useState<string>("standard"); // "standard" or "express"
  const [showCustomizationForm, setShowCustomizationForm] = useState(false);

  // Define the product variable (this is just an example, adjust as necessary)
  const product = {
    _id: "example_product_id", // Replace with actual product ID
    title: "Example Product", // Replace with actual product title
    price: 100, // Replace with actual product price
    productImage: { asset: { url: "example_image_url" } } // Replace with actual product image
  };

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const shipping = 250;
  const extraLaceCost = extraLace ? 100 : 0;
  const extraButtonCost = extraButton ? 150 : 0;
  const deliveryCost = deliveryOption === "express" ? 250 : 300; // Adjust based on selection
  const total = Math.max((subtotal - discount) + shipping + deliveryCost + extraLaceCost + extraButtonCost, 0);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address1: "",
    address2: "",
    city: "",
    country: "Pakistan",
    telephone: "",
    comment: "",
    subscribe: false,
  });

  const handleApplyDiscount = () => {
    if (promoCode.toUpperCase() === "DISCOUNT10") {
      setDiscount(subtotal * 0.1);
      setPromoError("");
      localStorage.setItem("appliedDiscount", "DISCOUNT10");
    } else {
      setPromoError("Invalid promo code");
      localStorage.removeItem("appliedDiscount");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateForm = () => {
    const requiredFields = [
      'firstName',
      'lastName',
      'email',
      'address1',
      'city',
      'telephone'
    ];
    
    return requiredFields.every(field => Boolean(formData[field as keyof typeof formData]));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (subtotal === 0) {
      showNotification("Error", "Your cart is empty. Please add items to your cart before placing an order.", "warning");
      setIsSubmitting(false);
      return;
    }

    if (!validateForm()) {
      showNotification("Error", "Please fill in all required fields", "error");
      setIsSubmitting(false);
      return;
    }

    if (!paymentOption) {
      showNotification("Error", "Please select a payment method", "error");
      setIsSubmitting(false);
      return;
    }

    const orderData: OrderData = {
      _type: 'order',
      customer: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.telephone,
        address: {
          street1: formData.address1,
          street2: formData.address2 || undefined,
          city: formData.city,
          country: formData.country,
        },
        subscribe: formData.subscribe,
      },
      items: cart.map(item => ({
        _key: item._id,
        product: {
          _type: 'reference',
          _ref: item._id,
        },
        quantity: item.quantity,
        price: item.price,
      })),
      paymentMethod: paymentOption,
      subtotal,
      shipping,
      discount,
      total,
      orderDate: new Date().toISOString(),
      notes: formData.comment || undefined,
    };

    // Log the order data before sending it to Sanity
    console.log("Order Data to be sent to Sanity:", JSON.stringify(orderData, null, 2));

    try {
      const result = await sanityClient.create(orderData);
      
      showNotification("Order Placed!", `Order ID: ${result._id.substring(0, 8)}. Total Amount: PKR ${total.toFixed(2)}`, "success");

      clearCart();
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        address1: "",
        address2: "",
        city: "",
        country: "Pakistan",
        telephone: "",
        comment: "",
        subscribe: false,
      });

      // Clear promo code after successful order
      setPromoCode("");
      setDiscount(0);
      localStorage.removeItem("appliedDiscount");

    } catch (error) {
      console.error("Order creation error:", error);
      showNotification("Error", "Failed to place order. Please try again.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCustomizationSubmit = (customizationDetails: CustomizationDetails) => {
    const newCartItem: CartItem = {
      _id: product._id,
      productId: product._id,
      name: product.title,
      price: 600, // Set the base price here
      quantity: 1,
      productImage: product.productImage?.asset?.url || "",
      customization: customizationDetails,
    };

    addToCart(newCartItem);
    setAddedItem(newCartItem);
    setShowCustomizationForm(false);
    setShowCartPopup(true);
    router.push('/cart');
  };

  const handleClosePopup = () => {
    setShowCartPopup(false);
    router.push('/cart');
  };

  return (
    <>
      <div className="bg-gray-50 min-h-screen py-12">
        <div className="container mx-auto px-4 relative">
          <Link href="/cart" className="absolute top-4 left-4 flex items-center text-blue-600 hover:text-blue-800 ml-5">
            <FaShoppingCart size={24} />
            <div className="ml-5">Back to Cart</div>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Delivery Details Section */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold mb-6 border-b pb-2 mt-5">Delivery Details</h2>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" name="firstName" placeholder="First Name" className="p-2 border rounded-lg" value={formData.firstName} onChange={handleInputChange} required />
                  <input type="text" name="lastName" placeholder="Last Name" className="p-2 border rounded-lg" value={formData.lastName} onChange={handleInputChange} required />
                </div>
                <input type="email" name="email" placeholder="Email" className="w-full p-2 border rounded-lg" value={formData.email} onChange={handleInputChange} required />
                <input type="text" name="address1" placeholder="Address 1" className="w-full p-2 border rounded-lg" value={formData.address1} onChange={handleInputChange} required />
                <input type="text" name="address2" placeholder="Address 2 (optional)" className="w-full p-2 border rounded-lg" value={formData.address2} onChange={handleInputChange} />
                <input type="text" name="city" placeholder="City" className="w-full p-2 border rounded-lg" value={formData.city} onChange={handleInputChange} required />
                <input type="text" name="telephone" placeholder="Phone Number" className="w-full p-2 border rounded-lg" value={formData.telephone} onChange={handleInputChange} required />
                <select name="country" className="w-full p-2 border rounded-lg" value={formData.country} onChange={handleInputChange}>
                  <option value="Pakistan">Pakistan</option>
                  <option value="USA">United States</option>
                  <option value="UK">United Kingdom</option>
                </select>
                <textarea name="comment" placeholder="Additional Comments (optional)" className="w-full p-2 border rounded-lg" value={formData.comment} onChange={handleInputChange} />
                <div className="flex items-center space-x-2">
                  <input type="checkbox" name="subscribe" checked={formData.subscribe} onChange={handleInputChange} className="h-5 w-5" />
                  <label htmlFor="subscribe" className="text-sm">Subscribe to newsletter</label>
                </div>

                {/* Payment Method Selection */}
                <div className="mt-4">
                  <h3 className="text-lg font-semibold">Payment Method:</h3>
                  <div className="flex flex-col">
                    <label>
                      <input
                        type="radio"
                        name="paymentOption"
                        value="COD"
                        checked={paymentOption === "COD"}
                        onChange={(e) => setPaymentOption(e.target.value)}
                      />
                      Cash on Delivery
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="paymentOption"
                        value="JazzCash"
                        checked={paymentOption === "JazzCash"}
                        onChange={(e) => setPaymentOption(e.target.value)}
                      />
                      JazzCash
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="paymentOption"
                        value="EasyPaisa"
                        checked={paymentOption === "EasyPaisa"}
                        onChange={(e) => setPaymentOption(e.target.value)}
                      />
                      EasyPaisa
                    </label>
                  </div>
                </div>

                <div className="mt-4">
                  <button 
                    type="submit" 
                    className="w-full bg-green-600 text-white py-2 rounded-lg shadow-lg hover:bg-green-700 disabled:bg-gray-400"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Placing Order..." : "Place Order"}
                  </button>
                </div>

                <div className="mt-4">
                  <Link href="/product" className="block w-full text-center bg-blue-600 text-white py-2 rounded-lg shadow-lg hover:bg-blue-700">
                    Continue Shopping
                  </Link>
                </div>
              </form>
            </div>

            {/* Order Summary Section */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold mb-6 border-b pb-2">Order Summary</h2>
              <table className="min-w-full border-collapse border border-gray-300 bg-orange-200">
                <thead>
                  <tr>
                    <th className="border border-gray-300 p-2">Product</th>
                    <th className="border border-gray-300 p-2">Quantity</th>
                    <th className="border border-gray-300 p-2">Price</th>
                    <th className="border border-gray-300 p-2">Customization Details</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map(item => (
                    <tr key={item.productId}>
                      <td className="border border-gray-300 p-2 flex items-center">
                        {item.productImage && (
                          <img src={item.productImage} alt={item.name} className="w-12 h-12 object-cover mr-4" />
                        )}
                        {item.name}
                      </td>
                      <td className="border border-gray-300 p-2">{item.quantity}</td>
                      <td className="border border-gray-300 p-2">PKR {(item.price * item.quantity).toLocaleString()}</td>
                      <td className="border border-gray-300 p-2">
                        {item.customization && (
                          <div>
                            <p>Design Type: {item.customization.designType}</p>
                            <p>Fabric Type: {item.customization.fabricType}</p>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td className="border border-gray-300 p-2 font-bold" colSpan={2}>Extras</td>
                    <td className="border border-gray-300 p-2">{extraLace ? "Included" : "Not Included"}</td>
                    <td className="border border-gray-300 p-2">PKR {extraLace ? 100 : 0}</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2 font-bold" colSpan={2}>Extras</td>
                    <td className="border border-gray-300 p-2">{extraButton ? "Included" : "Not Included"}</td>
                    <td className="border border-gray-300 p-2">PKR {extraButton ? 150 : 0}</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2 font-bold" colSpan={2}>Delivery Charges</td>
                    <td className="border border-gray-300 p-2">Normal Delivery</td>
                    <td className="border border-gray-300 p-2">PKR 250</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2 font-bold" colSpan={2}>Total</td>
                    <td className="border border-gray-300 p-2 font-bold">Total</td>
                    <td className="border border-gray-300 p-2 font-bold">PKR {total.toLocaleString()}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Show Cart Popup */}
      {showCartPopup && addedItem && (
        <CartPopup cartItem={addedItem} onClose={handleClosePopup} />
      )}
    </>
  );
}
