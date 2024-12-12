"use client";

import React, { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import OrderService from "@/lib/orders";
import useAuthStore from "@/zustand/authStore";

interface OrderItem {
  name: string;
  category: string;
  description: string;
  images: string[];
  price: number;
  quantity: number;
  totalPrice: number;
}

interface Order {
  orderId: string;
  status: string;
  createdAt: string;
  paymentMode: string;
  totalPrice: number;
  totalQuantity: number;
  items: OrderItem[];
}

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { session } = useAuthStore((state: any) => state);

  // Memoize the fetchUserOrders function
  const fetchUserOrders = useMemo(() => async () => {
    try {
      if (session?.$id) {
        const orderItems = await OrderService.getOrderItemsByUserID(session.$id);
        return orderItems;
      }
      return [];
    } catch (error) {
      console.error("Error fetching user orders:", error);
      return [];
    }
  }, [session?.$id]);

  useEffect(() => {
    let isMounted = true;

    const getOrders = async () => {
      setIsLoading(true);
      try {
        const orderItems = await fetchUserOrders();
        if (isMounted) {
          setOrders(orderItems);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    getOrders();

    return () => {
      isMounted = false;
    };
  }, [fetchUserOrders]);

  // Memoize the status color function
  const getStatusColor = useMemo(() => (status: string) => {
    switch (status.toUpperCase()) {
      case "DELIVERED":
        return "bg-emerald-100 text-emerald-800 border border-emerald-200";
      case "PROCESSING":
        return "bg-sky-100 text-sky-800 border border-sky-200";
      case "PENDING":
        return "bg-amber-100 text-amber-800 border border-amber-200";
      case "CANCELLED":
        return "bg-rose-100 text-rose-800 border border-rose-200";
      case "ON THE WAY":
        return "bg-indigo-100 text-indigo-800 border border-indigo-200";
      default:
        return "bg-slate-100 text-slate-800 border border-slate-200";
    }
  }, []);

  if (isLoading) {
    return (
      <div className="w-full max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-2 sm:py-8">
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 p-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="space-y-3">
              <div className="h-24 bg-gray-200 rounded"></div>
              <div className="h-24 bg-gray-200 rounded"></div>
              <div className="h-24 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-2 sm:py-8">
      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
        <div className="px-4 py-4 sm:px-6 sm:py-5 border-b border-gray-100">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
            Order History
          </h2>
        </div>

        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 sm:py-16">
            <svg
              className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            <p className="mt-4 sm:mt-6 text-lg sm:text-xl md:text-2xl font-medium text-gray-600">
              No orders found
            </p>
            <p className="mt-2 sm:mt-3 text-sm sm:text-base text-gray-400 text-center max-w-sm px-4">
              Your order history will appear here once you make a purchase
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {orders.map((order) => (
              <div
                key={order.orderId}
                className="p-4 sm:p-6 hover:bg-gray-50 transition-colors duration-200"
              >
                <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6">
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                        Order ID: #{order.orderId.slice(-8)}
                      </h3>
                      <span
                        className={`px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium inline-flex items-center justify-center ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                    </div>
                    <div className="mt-1 sm:mt-2 text-xs sm:text-sm text-gray-500">
                      Placed on{" "}
                      {new Date(order.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                  </div>
                  <div className="flex justify-between sm:block space-x-3 sm:space-x-0">
                    <div className="sm:text-right">
                      <p className="text-xs sm:text-sm font-medium text-gray-500">
                        Payment Method
                      </p>
                      <p className="mt-0.5 sm:mt-1 text-sm sm:text-base font-semibold text-gray-900">
                        {order.paymentMode}
                      </p>
                    </div>
                    <div className="sm:mt-3 sm:text-right">
                      <p className="text-xs sm:text-sm font-medium text-gray-500">
                        Total Amount
                      </p>
                      <p className="mt-0.5 sm:mt-1 text-lg sm:text-xl font-bold text-gray-900">
                        ₹{order.totalPrice.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 sm:mt-6 space-y-4 sm:space-y-5">
                  {order.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex flex-col sm:flex-row bg-gray-50 rounded-lg sm:rounded-xl p-3 sm:p-4 hover:bg-white hover:shadow-sm transition-all duration-200 border border-gray-100"
                    >
                      <div className="flex-shrink-0 mx-auto sm:mx-0 relative w-24 h-24 sm:w-28 sm:h-28">
                        <Image
                          src={item.images[0]}
                          alt={item.name}
                          fill
                          sizes="(max-width: 640px) 96px, 112px"
                          className="object-cover rounded-lg shadow-sm"
                          loading="lazy"
                          quality={80}
                        />
                      </div>
                      <div className="sm:ml-4 md:ml-6 flex-1 mt-3 sm:mt-0">
                        <div className="flex flex-col sm:flex-row sm:justify-between">
                          <div className="text-center sm:text-left">
                            <h4 className="text-base sm:text-lg font-semibold text-gray-900">
                              {item.name}
                            </h4>
                            <p className="mt-1 sm:mt-2 text-xs sm:text-sm font-medium text-gray-600">
                              {item.category}
                            </p>
                            <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-gray-500 line-clamp-2">
                              {item.description}
                            </p>
                          </div>
                          <div className="mt-3 sm:mt-0 text-center sm:text-right">
                            <p className="text-xs sm:text-sm font-medium text-gray-600">
                              Qty: {item.quantity}
                            </p>
                            <p className="mt-1 sm:mt-2 text-base sm:text-lg font-bold text-gray-900">
                              ₹{item.totalPrice.toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
