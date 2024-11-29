import React from "react";
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

// Dummy data for orders
const orders = [
  {
    orderId: "ORD001",
    customerName: "John Doe",
    paymentMethod: "Cash on Delivery",
    status: "Pending",
    amountPaid: "$250.00",
    address: "123 Elm Street, Springfield",
    pincode: "12345",
  },
  {
    orderId: "ORD002",
    customerName: "Jane Smith",
    paymentMethod: "Paid",
    status: "Delivered",
    amountPaid: "$150.00",
    address: "456 Oak Avenue, Shelbyville",
    pincode: "67890",
  },
  {
    orderId: "ORD003",
    customerName: "Mike Johnson",
    paymentMethod: "Paid",
    status: "Cancelled",
    amountPaid: "$0.00",
    address: "789 Maple Road, Ogdenville",
    pincode: "54321",
  },
  {
    orderId: "ORD004",
    customerName: "Emily Davis",
    paymentMethod: "Cash on Delivery",
    status: "Pending",
    amountPaid: "$450.00",
    address: "321 Pine Lane, Capitol City",
    pincode: "98765",
  },
  {
    orderId: "ORD005",
    customerName: "Chris Brown",
    paymentMethod: "Paid",
    status: "Delivered",
    amountPaid: "$550.00",
    address: "654 Birch Drive, North Haverbrook",
    pincode: "19283",
  },
];

const ViewOrders = () => {
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

      <div className="h-[60vh] overflow-y-auto hide-scrollbar">
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
              <TableHead className="text-right">Amount Paid</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.orderId}>
                <TableCell className="font-medium">{order.orderId}</TableCell>
                <TableCell>{order.customerName}</TableCell>
                <TableCell>{order.address}</TableCell>
                <TableCell>{order.pincode}</TableCell>
                <TableCell>{order.paymentMethod}</TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell>
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Change Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Status Options</SelectLabel>
                        <SelectItem value="delivered">Delivered</SelectItem>
                        <SelectItem value="processing">Processing</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                        <SelectItem value="on-the-way">On the Way</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell className="text-right">{order.amountPaid}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ViewOrders;
