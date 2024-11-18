"use client";
import CartPage from "@/components/cart/CardPage";
import React from "react";

const page = () => {
  return (
    <div className="flex m-10 w-[95%] h-full items-center pt-10 mt-20  justify-center">
      <CartPage
        cartItems={[]}
        subtotal={0}
        discount={0}
        deliveryFee={0}
        total={0}
        applyPromoCode={() => {}}
        onRemove={() => {}}
        onIncrease={() => {}}
        onDecrease={() => {}}
      />
    </div>
  );
};

export default page;
