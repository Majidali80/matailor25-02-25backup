"use client";

import { useEffect, useState } from 'react';
import { createClient } from '@sanity/client';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';

// Sanity client configuration
const sanityClient = createClient({
  projectId: 'ilhf9wt8',
  dataset: 'production',
  apiVersion: '2023-05-03',
  useCdn: false,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});

interface Order {
  _id: string;
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
    product: {
      _type: string;
      _ref: string;
    };
    quantity: number;
    price: number;
    customization?: {
      designType: string;
      fabricType: string;
      measurements?: {
        chest: number;
        waist: number;
        hips: number;
      };
      shirtSizes?: { size: string; length: string; image?: string }[];
      trouserSizes?: { size: string; length: string; image?: string }[];
      uploadDesign?: File[];
    };
  }[];
  paymentMethod: string;
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  orderDate: string;
  notes?: string;
}

export default function ViewOrder() {
  const router = useRouter();
  const { id } = router.query;
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const orderData = await sanityClient.fetch(`*[_type == "order" && _id == $id]`, { id });
        setOrder(orderData[0]);
      } catch (error) {
        console.error("Error fetching order:", error);
        Swal.fire("Error", "Failed to fetch order details.", "error");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchOrder();
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!order) {
    return <div>Order not found.</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Order Details</h1>
      <h2 className="text-xl font-semibold">Customer Information</h2>
      <p>Name: {order.customer.firstName} {order.customer.lastName}</p>
      <p>Email: {order.customer.email}</p>
      <p>Phone: {order.customer.phone}</p>
      <p>Address: {order.customer.address.street1}, {order.customer.address.city}, {order.customer.address.country}</p>
      <h2 className="text-xl font-semibold mt-4">Order Summary</h2>
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Product</th>
            <th className="border border-gray-300 p-2">Quantity</th>
            <th className="border border-gray-300 p-2">Price</th>
            <th className="border border-gray-300 p-2">Customization Details</th>
          </tr>
        </thead>
        <tbody>
          {order.items.map(item => (
            <tr key={item._key}>
              <td className="border border-gray-300 p-2">{item.product._ref}</td>
              <td className="border border-gray-300 p-2">{item.quantity}</td>
              <td className="border border-gray-300 p-2">PKR {item.price.toLocaleString()}</td>
              <td className="border border-gray-300 p-2">
                {item.customization && (
                  <div>
                    <p>Design Type: {item.customization.designType}</p>
                    <p>Fabric Type: {item.customization.fabricType}</p>
                    {item.customization.shirtSizes && item.customization.shirtSizes.length > 0 && (
                      <div>
                        <h4>Shirt Sizes:</h4>
                        {item.customization.shirtSizes.map((size, index) => (
                          <div key={index}>
                            <p>Size: {size.size}, Length: {size.length}</p>
                            {size.image && <img src={size.image} alt={`Shirt Size ${size.size}`} className="w-16 h-16 object-cover" />}
                          </div>
                        ))}
                      </div>
                    )}
                    {item.customization.trouserSizes && item.customization.trouserSizes.length > 0 && (
                      <div>
                        <h4>Trouser Sizes:</h4>
                        {item.customization.trouserSizes.map((size, index) => (
                          <div key={index}>
                            <p>Size: {size.size}, Length: {size.length}</p>
                            {size.image && <img src={size.image} alt={`Trouser Size ${size.size}`} className="w-16 h-16 object-cover" />}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </td>
            </tr>
          ))}
          <tr>
            <td className="border border-gray-300 p-2 font-bold" colSpan={2}>Subtotal</td>
            <td className="border border-gray-300 p-2">PKR {order.subtotal.toLocaleString()}</td>
            <td className="border border-gray-300 p-2"></td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-2 font-bold" colSpan={2}>Delivery Charge</td>
            <td className="border border-gray-300 p-2">PKR {order.shipping.toLocaleString()}</td>
            <td className="border border-gray-300 p-2"></td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-2 font-bold" colSpan={2}>Total</td>
            <td className="border border-gray-300 p-2">PKR {order.total.toLocaleString()}</td>
            <td className="border border-gray-300 p-2"></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
} 