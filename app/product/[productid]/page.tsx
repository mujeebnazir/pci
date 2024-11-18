"use client";
import ProductPage from "@/components/ProductPage";
import React from "react";

const page = () => {
  return (
    <div className=" flex m-10 w-[95%] flex-col h-full items-center justify-center">
      <div className="my-10">
        <ProductPage />
      </div>
    </div>
  );
};

export default page;
