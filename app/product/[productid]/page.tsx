"use client";
import ProductPage from "@/components/ProductPage";
import { useParams } from "next/navigation";
import React from "react";
import useGetProduct from "@/hooks/usegetProduct";

const ProductPageContainer = () => {
  const { productid } = useParams();

  // Normalize the product ID in case it's an array
  const normalizedProductId = Array.isArray(productid)
    ? productid[0]
    : productid;

  // Pass the normalized ID directly to the hook
  const { product } = useGetProduct(normalizedProductId ?? "");

  // Debugging logs
  console.log("Product ID:", normalizedProductId);
  console.log("Fetched Product:", product);

  return (
    <div className="flex m-10 w-[95%] flex-col h-screen items-center justify-center">
      <div className="my-10">
        {product ? (
          <ProductPage product={product} />
        ) : (
          <p>Loading product details...</p>
        )}
      </div>
    </div>
  );
};

export default ProductPageContainer;
