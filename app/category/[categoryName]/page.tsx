"use client";

import CategoryPage from "@/components/products/CategoryPage";
import { useParams } from "next/navigation";
import React from "react";
import { products } from "@/constants";

const page = () => {
  const { categoryName } = useParams();

  console.log(categoryName);
  return (
    <div className="text-2xl mt-10 pt-10 h-full text-black ">
      <CategoryPage
        products={products}
        filters={{ price: 0, color: "", size: "" }}
      />
    </div>
  );
};

export default page;
