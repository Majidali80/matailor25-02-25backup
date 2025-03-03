"use client";

import React, { useEffect, useState } from 'react';
import { createClient } from '@sanity/client';
import Swal from 'sweetalert2';
import Link from 'next/link';

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

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersData = await sanityClient.fetch(`*[_type == "order"]`);
        setOrders(ordersData);
      } catch (error) {
        console.error("Error fetching orders:", error);
        Swal.fire("Error", "Failed to fetch orders.", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleDeleteOrder = async (orderId: string) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        await sanityClient.delete(orderId);
        setOrders(orders.filter(order => order._id !== orderId));
        Swal.fire("Deleted!", "Your order has been deleted.", "success");
      } catch (error) {
        console.error("Error deleting order:", error);
        Swal.fire("Error", "Failed to delete order.", "error");
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Orders</h1>
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Order ID</th>
            <th className="border border-gray-300 p-2">Customer</th>
            <th className="border border-gray-300 p-2">Total</th>
            <th className="border border-gray-300 p-2">Date</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order._id}>
              <td className="border border-gray-300 p-2">{order._id}</td>
              <td className="border border-gray-300 p-2">{order.customer.firstName} {order.customer.lastName}</td>
              <td className="border border-gray-300 p-2">PKR {order.total.toLocaleString()}</td>
              <td className="border border-gray-300 p-2">{new Date(order.orderDate).toLocaleDateString()}</td>
              <td className="border border-gray-300 p-2">
                <Link href={`/admin/orders/${order._id}`} className="text-blue-600 hover:underline">View</Link>
                <button onClick={() => handleDeleteOrder(order._id)} className="text-red-600 hover:underline ml-4">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 