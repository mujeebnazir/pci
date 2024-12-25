import React from "react";
import { format } from "date-fns";

const InvoiceComponent = ({ orderData }: any) => {
  const formatDate = (date: any) => format(new Date(date), "MMM dd, yyyy");
  const formatCurrency = (amount: any) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "INR",
    }).format(amount);

  return (
    <div className="bg-white p-6 shadow-lg rounded-lg max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <img src="/logopci.png" alt="Logo" className="h-12 rounded" />
        <div>
          <h1 className="text-2xl font-bold">INVOICE #{orderData.orderId}</h1>
          <p className="text-sm text-gray-500">
            {formatDate(orderData.createdAt)}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6 text-sm">
        <div className="p-4 bg-gray-50 rounded-lg">
          <h2 className="font-bold mb-2">Bill To</h2>
          <p>
            {orderData.firstName} {orderData.lastName}
          </p>
          <p>{orderData.streetAddress}</p>
          <p>
            {orderData.city}, {orderData.state} {orderData.postalCode}
          </p>
          <p>{orderData.email}</p>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg">
          <h2 className="font-bold mb-2">From</h2>
          <p>Phalgham Cottage Industries</p>
          <p>Phalgham, Anantnag 192101</p>
          <p>Kashmir, India</p>
          <p>pahalgamcottage@gmail.com</p>
        </div>
      </div>

      <table className="w-full mb-6 text-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="p-2 text-left">Item</th>
            <th className="p-2 text-right">Qty</th>
            <th className="p-2 text-right">Price</th>
            <th className="p-2 text-right">Total</th>
          </tr>
        </thead>
        <tbody>
          {orderData.items.map((item: any, index: any) => (
            <tr key={index} className="border-b">
              <td className="p-2">
                <div className="flex items-center">
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="w-8 h-8 rounded mr-2"
                  />
                  {item.name}
                </div>
              </td>
              <td className="p-2 text-right">{item.quantity}</td>
              <td className="p-2 text-right">{formatCurrency(item.price)}</td>
              <td className="p-2 text-right">
                {formatCurrency(item.price * item.quantity)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between items-start mb-6">
        <div className="text-sm">
          <p>Payment Method: {orderData.paymentMode}</p>
          <p>Total Items: {orderData.totalQuantity}</p>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold">
            Total: {formatCurrency(orderData.totalPrice)}
          </p>
        </div>
      </div>

      <div className="text-center text-sm text-gray-600">
        <p>Thank you for your business • pahalgamcottage@gmail.com</p>
      </div>
    </div>
  );
};

export default InvoiceComponent;
