"use client";
import CartPage from "@/components/cart/CardPage";
import { useCartStore } from "@/zustand/cart";
import React, { useEffect } from "react";

const page = () => {
  return (
    <div className="flex m-10 w-[95%] h-screen items-center pt-10 mt-20  justify-center">
      <CartPage />
    </div>
  );
};

export default page;
