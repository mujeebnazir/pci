"use client";

import CategoryPage from "@/components/products/CategoryPage";
import { useParams } from "next/navigation";
import React from "react";
import useProducts from "@/hooks/useProducts";
const Page = () => {
  const { categoryName } = useParams();
  const normalizedCategoryName = Array.isArray(categoryName)
    ? categoryName[0]
    : categoryName;

  const { products } = useProducts({ category: normalizedCategoryName });

  return (
    <div className="text-2xl mt-10 pt-10 h-full text-black ">
      <CategoryPage
        products={products}
        filters={{ price: 0, color: "", size: "" }}
      />
    </div>
  );
};

export default Page;
