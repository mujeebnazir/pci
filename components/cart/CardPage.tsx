"use client";
import React from "react";
import CartItem from "./CartItem";
import OrderSummary from "./OrderSummary";
import { useCartStore } from "../../zustand/cart";

const CartPage: React.FC = ({}) => {
  const {
    items,
    onDecrease,
    onIncrease,
    removeItem,
    totalAmount,
    totalMRP,
    discountOnMRP,
    deliveryFee,
  } = useCartStore((state) => state);

  console.log("items", items);

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-6 w-[80%] mx-auto">
      {/* Cart Items Section */}
      <div className="flex-1 bg-gray-100 p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
        <p className="text-gray-500 text-sm mb-2">
          Total Items: <span className="font-semibold">{items.length}</span>
        </p>
        <div className="space-y-4 max-h-[35vh] overflow-y-auto hide-scrollbar">
          {items.length > 0 ? (
            items.map((item, index) => (
              <CartItem
                key={index + "dvnejv"}
                item={item}
                onRemove={() => removeItem(item.id || "")}
                onIncrease={() => onIncrease(item.id || "")}
                onDecrease={() => onDecrease(item.id || "")}
              />
            ))
          ) : (
            <p className="text-center text-gray-500 text-md font-normal">
              No items in your cart!
            </p>
          )}
        </div>
      </div>

      {/* Order Summary Section */}
      <div className="bg-gray-200 w-full lg:w-[40%] p-4 rounded-lg">
        <OrderSummary
          totalMRP={totalMRP}
          discountOnMRP={discountOnMRP}
          deliveryFee={deliveryFee}
          totalAmount={totalAmount}
        />
      </div>
    </div>
  );
};

export default CartPage;
