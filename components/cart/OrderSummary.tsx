import React from "react";

type OrderSummaryProps = {
  totalMRP: number;
  discountOnMRP: number;
  deliveryFee: number;
  totalAmount: number;
  applyPromoCode: () => void;
};

const OrderSummary: React.FC<OrderSummaryProps> = ({
  totalMRP,
  discountOnMRP,
  deliveryFee,
  totalAmount,
  applyPromoCode,
}) => (
  <div className="p-6  ">
    <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
    <p className="flex justify-between mb-2">
      <span>Total MRP:</span> <span>${totalMRP}</span>
    </p>
    <p className="flex justify-between mb-2">
      <span>Discount on MRP:</span>{" "}
      <span className="font-normal text-green-600 ">-${discountOnMRP}</span>
    </p>
    <p className="flex justify-between mb-2">
      <span>Delivery Fee:</span>{" "}
      <span className="font-normal text-green-600 ">${deliveryFee}</span>
    </p>
    <p className="flex justify-between font-bold text-lg mb-4">
      <span>Total Amount:</span> <span>${totalAmount}</span>
    </p>
    <div className="flex flex-col lg:flex-row space-x-2">
      <input
        type="text"
        placeholder="Add promo code"
        className="w-[80%] px-3 py-2 mb-2 border rounded"
      />
      <button
        onClick={applyPromoCode}
        className="w-[20%] bg-black text-white py-2  mb-2"
      >
        Apply
      </button>
    </div>

    <button className="w-full hover:bg-green-800 bg-green-600 text-white py-2">
      Go to Checkout
    </button>
  </div>
);

export default OrderSummary;
