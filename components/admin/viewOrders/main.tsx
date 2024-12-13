"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import OrderService from "@/lib/orders";
import { toast } from "react-hot-toast";

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
  firstName: string;
  lastName: string;
  streetAddress: string;
  city: string;
  postalCode: string;
  paymentMode: string;
  totalQuantity: number;
  totalPrice: number;
  items: OrderItem[];
}

const ViewOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState<string | null>(null);

  useEffect(() => {
    const getAllOrders = async () => {
      try {
        const ordersData = await OrderService.getAllOrdersForAdmin();
        setOrders(ordersData);
      } catch (error) {
        toast.error("Failed to fetch orders");
        console.error("Error fetching orders:", error);
      } finally {
        setIsLoading(false);
      }
    };
    getAllOrders();
  }, []);

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    setIsUpdating(orderId);
    try {
      await OrderService.updateOrderStatus(orderId, newStatus);
      setOrders(
        orders.map((order) =>
          order.orderId === orderId ? { ...order, status: newStatus } : order
        )
      );
      toast.success("Order status updated successfully");
    } catch (error) {
      toast.error("Failed to update order status");
      console.error("Error updating order status:", error);
    } finally {
      setIsUpdating(null);
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 bg-gray-100">
        <div className="text-center mb-4">
          <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-2 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4 mx-auto animate-pulse"></div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="space-y-4">
            {[...Array(5)].map((_, idx) => (
              <div key={idx} className="flex space-x-4 animate-pulse">
                <div className="h-12 bg-gray-200 rounded w-full"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100">
      <div className="text-center mb-4">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800">
          <span className="bg-gradient-to-r from-gray-400 to-gray-950 text-transparent bg-clip-text">
            Manage Your Orders
          </span>
        </h1>
        <p className="mt-2 text-sm sm:text-lg text-gray-600">
          Track and update customer orders efficiently.
        </p>
      </div>

      <div className="h-[60vh] overflow-y-auto hide-scrollbar bg-white rounded-lg shadow">
        <Table>
          <TableCaption>
            A list of recent orders and their details.
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Order ID</TableHead>
              <TableHead>Customer Name</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Pincode</TableHead>
              <TableHead>Payment Method</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Change Status</TableHead>
              <TableHead className="text-right">Amount To Be Paid</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8">
                  No orders found
                </TableCell>
              </TableRow>
            ) : (
              orders.map((order) => (
                <TableRow key={order.orderId}>
                  <TableCell className="font-medium">
                    #{order.orderId.slice(-8)}
                  </TableCell>
                  <TableCell>
                    {order.firstName} {order.lastName}
                  </TableCell>
                  <TableCell>
                    {order.streetAddress}, {order.city}
                  </TableCell>
                  <TableCell>{order.postalCode}</TableCell>
                  <TableCell>{order.paymentMode}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        order.status === "DELIVERED"
                          ? "bg-green-100 text-green-800"
                          : order.status === "PROCESSING"
                          ? "bg-blue-100 text-blue-800"
                          : order.status === "CANCELLED"
                          ? "bg-red-100 text-red-800"
                          : order.status === "ON THE WAY"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Select
                      onValueChange={(value) =>
                        handleStatusChange(order.orderId, value)
                      }
                      disabled={isUpdating === order.orderId}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Change Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Status Options</SelectLabel>
                          <SelectItem value="DELIVERED">Delivered</SelectItem>
                          <SelectItem value="PROCESSING">Processing</SelectItem>
                          <SelectItem value="CANCELLED">Cancelled</SelectItem>
                          <SelectItem value="ON THE WAY">On the Way</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="text-right font-semibold">
                    ₹{order.totalPrice.toLocaleString()}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ViewOrders;
