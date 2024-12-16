"use client";
import CartPage from "@/components/cart/CardPage";
import { useCartStore } from "@/zustand/cart";
import React, { useEffect } from "react";

const page = () => {
  return (
    <div className="mt-20">
      <CartPage />
    </div>
  );
};

export default page;
