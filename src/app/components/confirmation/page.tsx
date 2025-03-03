import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { FaCheckCircle } from "react-icons/fa";
import { useCart } from "../../context/cartContext";

const OrderConfirmationPage = () => {
  const router = useRouter();
  const { cart, clearCart } = useCart();
  const [orderDetails, setOrderDetails] = useState<any>(null);

  useEffect(() => {
    const orderData = JSON.parse(localStorage.getItem("orderData") || "null");

    if (!orderData) {
      // Redirect if there's no order data
      router.push("/cart");
      return;
    }

    setOrderDetails(orderData);
    clearCart(); // Clear cart after successful order
    localStorage.removeItem("orderData"); // Remove the order data from local storage
  }, [router, clearCart]);

  if (!orderDetails) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-3xl mx-auto">
          <div className="text-center">
            <FaCheckCircle size={48} className="text-green-500 mx-auto" />
            <h2 className="text-2xl font-semibold mt-4">Thank you for your order!</h2>
            <p className="text-lg text-gray-600 mt-2">
              Your order has been successfully placed.
            </p>

            <div className="mt-6">
              <h3 className="font-semibold text-xl">Order Summary</h3>
              <div className="space-y-4 mt-4">
                <div className="flex justify-between">
                  <span>Order ID:</span>
                  <span>{orderDetails._id.substring(0, 8)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Amount:</span>
                  <span>${orderDetails.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Payment Method:</span>
                  <span>{orderDetails.paymentMethod}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping Address:</span>
                  <span>{`${orderDetails.customer.address.street1}, ${orderDetails.customer.city}, ${orderDetails.customer.country}`}</span>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <p className="text-lg text-gray-600">
                A confirmation email has been sent to {orderDetails.customer.email}.
              </p>
              <button
                onClick={() => router.push("/")}
                className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg shadow-lg hover:bg-green-700"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
