"use client";
import React, { useState } from "react";

interface Order {
  id: string;
  title: string;
  price: number;
  status: string;
}
const order = () => {
  const [orders] = useState<Order[]>([
    { id: "1", title: "Order 1", price: 29.99, status: "Delivered" },
    { id: "2", title: "Order 2", price: 49.99, status: "Pending" },
    { id: "3", title: "Order 3", price: 19.99, status: "Cancelled" },
  ]);
  return (
    <div className="bg-white rounded-md shadow border p-6 w-full ">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">My Orders</h2>
      <div className="space-y-4 ">
        {orders.length > 0 ? (
          orders.map((order) => (
            <div
              key={order.id}
              className="flex justify-between items-center p-4 border rounded-md bg-white shadow-sm"
            >
              <div>
                <h3 className="font-semibold text-gray-700">{order.title}</h3>
                <p className="text-sm text-gray-500">Status: {order.status}</p>
              </div>
              <p className="font-medium text-gray-800">
                ${order.price.toFixed(2)}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-700 font-semibold text-lg mx-auto self-center">
            No orders yet
          </p>
        )}
      </div>
    </div>
  );
};

export default order;
