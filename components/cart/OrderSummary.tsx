import React from "react";

type OrderSummaryProps = {
  totalMRP: number;
  discountOnMRP: number;
  deliveryFee: number;
  totalAmount: number;
};

const OrderSummary: React.FC<OrderSummaryProps> = ({
  totalMRP,
  discountOnMRP,
  deliveryFee,
  totalAmount,
}) => (
  <div className="p-6  ">
    <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
    <p className="flex justify-between mb-2">
      <span>Total MRP:</span> <span>₹{totalMRP}</span>
    </p>
    <p className="flex justify-between mb-2">
      <span>Discount on MRP:</span>{" "}
      <span className="font-normal text-green-600 ">-₹{discountOnMRP}</span>
    </p>
    <p className="flex justify-between mb-2">
      <span>Delivery Fee:</span>{" "}
      <span className="font-normal text-green-600 ">₹{deliveryFee}</span>
    </p>
    <p className="flex justify-between font-bold text-lg mb-4">
      <span>Total Amount:</span> <span>₹{totalAmount}</span>
    </p>

  
  </div>
);

export default OrderSummary;
