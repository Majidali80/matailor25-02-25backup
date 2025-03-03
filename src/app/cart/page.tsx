'use client'; // Ensure this file is a client component

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/navigation'; // Correct import for useRouter
import { useCart } from '../context/cartContext'; // Import the context
import Swal from "sweetalert2"; // Import SweetAlert2
import { CartItem } from '../types/cart'; // Ensure you import the CartItem type

export default function Cart() {
  const { cart, updateQuantity, removeFromCart } = useCart();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [extraLace, setExtraLace] = useState(false); // State for extra lace
  const [extraButton, setExtraButton] = useState(false); // State for extra button
  const [extraButton2, setExtraButton2] = useState(false); // State for extra button
  const [extraButton3, setExtraButton3] = useState(false); // State for extra button
  useEffect(() => {
    setIsClient(true); // Ensure the component is client-side
  }, []);

  if (!isClient) {
    return <div>Loading...</div>; // Provide a fallback while waiting for hydration
  }

  const calculateTotal = () => {
    const baseTotal = cart.reduce((total, item) => {
      return total + (item.price * item.quantity); // Calculate total price in PKR
    }, 0);
    const extrasTotal = (extraLace ? 100 : 0) + (extraButton ? 150 : 0) + (extraButton2 ? 200 : 0) + (extraButton3 ? 300 : 0) + 250; // Fixed delivery charge
    return baseTotal + extrasTotal; // Return total including extras
  };

  const handleCheckout = () => {
    Swal.fire({
      title: 'Proceed to Checkout?',
      text: "Are you sure you want to proceed to the checkout page?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Proceed!',
    }).then((result) => {
      if (result.isConfirmed) {
        router.push('/Checkout'); // Navigate to the checkout page
      }
    });
  };

  return (
    <div>
      <Head>
        <title>Cart</title>
        <meta name="description" content="Your shopping cart" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto p-6 mt-16 bg-orange-500">
        {/* Main Container for Customization Details and Order Summary */}
        <div className="flex gap-10">
          {/* Left: Customization Details Section */}
          <div className="w-full md:w-1/3 bg-orange-200 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Customization Details</h2>
            {cart.map((item: CartItem) => (
              <div key={item.productId} className="mb-4">
                {item.customization && (
                  <div>
                    <table className="min-w-full border-collapse border border-gray-300">
                      <thead>
                        <tr>
                          <th className="border border-gray-300 p-2">Detail</th>
                          <th className="border border-gray-300 p-2">Value</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-300 p-2">Design Type</td>
                          <td className="border border-gray-300 p-2">{item.customization?.designType}</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 p-2">Fabric Type</td>
                          <td className="border border-gray-300 p-2">{item.customization?.fabricType}</td>
                        </tr>
                        {item.customization?.measurements && (
                          <>
                            <tr>
                              <td className="border border-gray-300 p-2">Chest</td>
                              <td className="border border-gray-300 p-2">{item.customization.measurements.chest}</td>
                            </tr>
                            <tr>
                              <td className="border border-gray-300 p-2">Waist</td>
                              <td className="border border-gray-300 p-2">{item.customization.measurements.waist}</td>
                            </tr>
                            <tr>
                              <td className="border border-gray-300 p-2">Hips</td>
                              <td className="border border-gray-300 p-2">{item.customization.measurements.hips}</td>
                            </tr>
                            <tr>
                              <td className="border border-gray-300 p-2">Length</td>
                              <td className="border border-gray-300 p-2">{item.customization.measurements.length}</td>
                            </tr>
                            <tr>
                              <td className="border border-gray-300 p-2">Arm Hole</td>
                              <td className="border border-gray-300 p-2">{item.customization.measurements.armHole}</td>
                            </tr>
                            <tr>
                              <td className="border border-gray-300 p-2">Shoulder</td>
                              <td className="border border-gray-300 p-2">{item.customization.measurements.shoulder}</td>
                            </tr>
                            <tr>
                              <td className="border border-gray-300 p-2">Daman</td>
                              <td className="border border-gray-300 p-2">{item.customization.measurements.daman}</td>
                            </tr>
                            <tr>
                              <td className="border border-gray-300 p-2">Sleeves</td>
                              <td className="border border-gray-300 p-2">{item.customization.measurements.sleeves}</td>
                            </tr>
                            <tr>
                              <td className="border border-gray-300 p-2">Cuff</td>
                              <td className="border border-gray-300 p-2">{item.customization.measurements.cuff}</td>
                            </tr>
                            <tr>
                              <td className="border border-gray-300 p-2">Front Neck</td>
                              <td className="border border-gray-300 p-2">{item.customization.measurements.frontNeck}</td>
                            </tr>
                            <tr>
                              <td className="border border-gray-300 p-2">Back Neck</td>
                              <td className="border border-gray-300 p-2">{item.customization.measurements.backNeck}</td>
                            </tr>
                            <tr>
                              <td className="border border-gray-300 p-2">Neck Deep</td>
                              <td className="border border-gray-300 p-2">{item.customization.measurements.neckDeep}</td>
                            </tr>
                            <tr>
                              <td className="border border-gray-300 p-2">Chak</td>
                              <td className="border border-gray-300 p-2">{item.customization.measurements.chak}</td>
                            </tr>
                          </>
                        )}
                        {/* Trouser Sizes Section */}
                        <tr>
                          <td className="border border-gray-300 p-2">Trouser Sizes</td>
                          <td className="border border-gray-300 p-2">
                            {item.customization?.trouserSizes && item.customization.trouserSizes.map((size, index) => (
                              <div key={index}>Size: {size.size}, Length: {size.length}</div>
                            ))}
                          </td>
                        </tr>
                        {/* Naap Provided */}
                        <tr>
                          <td className="border border-gray-300 p-2">Naap Provided</td>
                          <td className="border border-gray-300 p-2">{item.customization?.naapProvided ? 'Yes' : 'No'}</td>
                        </tr>
                        {/* Upload Image Preview */}
                        {item.customization?.uploadDesign && item.customization.uploadDesign.length > 0 && (
                          <tr>
                            <td className="border border-gray-300 p-2">Uploaded Design</td>
                            <td className="border border-gray-300 p-2">
                              <img src={URL.createObjectURL(item.customization.uploadDesign[0])} alt="Uploaded Design" className="w-32 h-32 object-cover" />
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                    {item.customization?.additionalNotes && (
                      <p>Additional Notes: {item.customization.additionalNotes}</p>
                    )}
                  </div>
                )}
              </div>
            ))}

            {/* Extra Options */}
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Add Extras:</h3>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={extraLace}
                  onChange={() => setExtraLace(!extraLace)}
                  className="mr-2"
                />
                <label>Extra Lace (Rs. 100)</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={extraButton}
                  onChange={() => setExtraButton(!extraButton)}
                  className="mr-2"
                />
                <label>Extra Button (Rs. 150)</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={extraButton2}
                  onChange={() => setExtraButton2(!extraButton2)}
                  className="mr-2"
                />
                
                <label>Urgent Delivery 4 Days (Rs. 200)</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={extraButton3}
                  onChange={() => setExtraButton3(!extraButton3)}
                  className="mr-2"
                />
                <label>Urgent Delivery 2 Days (Rs. 300)</label>
              </div>
            </div>
          </div>

          {/* Right: Order Summary Section */}
          <div className="w-full md:w-2/3 bg-yellow-200 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Order Summary</h2>
            <div className="space-y-6">
              {cart.map((item: CartItem) => (
                <div key={item.productId} className="flex justify-between items-center mb-4">
                  <div className="flex items-center">
                    {item.productImage ? (
                      <img src={item.productImage} alt={item.name} className="w-12 h-12 object-cover mr-4" />
                    ) : (
                      <div className="w-12 h-12 bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-500">No Image</span>
                      </div>
                    )}
                    <div>
                      <div className="flex flex-col">
                        <p className="text-green-600">{item.name}</p>
                      </div>
                      <p className="text-green-600">Price: PKR {item.price.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <button onClick={() => {
                      if (item.quantity > 1) {
                        updateQuantity(item.productId, 'decrease');
                      }
                    }} className="px-2 py-1 bg-gray-300 rounded-full">-</button>
                    <span className="mx-2">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.productId, 'increase')} className="px-2 py-1 bg-gray-300 rounded-full">+</button>
                  </div>
                  <button onClick={() => {
                    removeFromCart(item.productId);
                    alert(`${item.name} has been removed from the cart.`);
                  }} className="text-red-500">Remove</button>
                </div>
              ))}
              <table className="min-w-full bg-yellow-300">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b text-left">Title</th>
                    <th className="py-2 px-4 border-b text-left">Price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-2 px-4 border-b">Extra Lace</td>
                    <td className="py-2 px-4 border-b">{extraLace ? 'Rs. 100' : 'Not Included'}</td>
                  </tr>
                  
                  <tr>
                    <td className="py-2 px-4 border-b">Extra Button</td>
                    <td className="py-2 px-4 border-b">{extraButton ? 'Rs. 150' : 'Not Included'}</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b">Urgent Delivery 4 Days</td>
                    <td className="py-2 px-4 border-b">{extraButton2 ? 'Rs. 200' : 'Not Included'}</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b">Urgent Delivery 2 Days</td>
                    <td className="py-2 px-4 border-b">{extraButton3 ? 'Rs. 300' : 'Not Included'}</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b">Delivery Charge</td>
                    <td className="py-2 px-4 border-b">Rs. 250</td>
                  </tr>
                </tbody>
              </table>
              <span className="font-semibold text-lg">SubTotal</span>
              <span className="font-semibold text-lg text-green-600">
                PKR {calculateTotal().toLocaleString()}
              </span>
            </div>

            {/* Total */}
            <div className="flex justify-between mt-6">
              <span className="font-semibold text-lg">Total</span>
              <span className="font-semibold text-lg text-green-600">
                PKR {calculateTotal().toLocaleString()}
              </span>
            </div>

            <div className="mt-6">
              <button
                onClick={handleCheckout}
                className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
