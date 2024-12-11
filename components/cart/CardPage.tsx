"use client";
import React from "react";
import CartItem from "./CartItem";
import OrderSummary from "./OrderSummary";
import { useCartStore } from "../../zustand/cart";
import { useRouter } from "next/navigation";

const CartPage: React.FC = () => {
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
  const router = useRouter();

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
            items.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onRemove={() => removeItem(item.id || "")}
                onIncrease={() => onIncrease(item.id || "")}
                onDecrease={() => onDecrease(item.id || "")}
              />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <p className="text-gray-600 text-xl font-semibold">Your Cart is Empty!</p>
              <p className="text-gray-500 text-sm mt-2">Browse our products and add items to your cart.</p>
              <a href="/shop" className="mt-4 bg-green-600 text-white py-2 px-6 rounded hover:bg-green-800">
                Start Shopping
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Order Summary Section */}
      {items.length > 0 && (
        <div className="bg-gray-200 w-full lg:w-[40%] p-4 rounded-lg">
          <OrderSummary
            totalMRP={totalMRP}
            discountOnMRP={discountOnMRP}
            deliveryFee={deliveryFee}
            totalAmount={totalAmount}
          />
          <button onClick={() => router.push("/check-out")} className="w-full hover:bg-green-800 bg-green-600 text-white py-2 mt-4">
            Go to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
