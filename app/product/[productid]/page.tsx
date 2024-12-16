"use client";
import ProductPage from "@/components/ProductPage";
import { useParams } from "next/navigation";
import React from "react";
import useGetProduct from "@/hooks/usegetProduct";
import Loading from "@/components/Loading";

interface Product {
  $id: string;
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  sizesAvailable: string[];
  images: string[];
}

const ProductPageContainer = () => {
  const { productid } = useParams();
  const normalizedProductId = Array.isArray(productid) ? productid[0] : productid;
  const { product } = useGetProduct(normalizedProductId ?? "") as { product: Product | null };
  // const normalizedProductId = Array.isArray(productid)
  //   ? productid[0]
  //   : productid;

  // // Pass the normalized ID directly to the hook
  // const { product } = useGetProduct(normalizedProductId ?? "");
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen py-10 px-4">
      <div className="w-full max-w-6xl">
        {product ? (
          <ProductPage product={product} />
        ) : (
          <p className="text-center text-lg font-medium">
            <Loading />
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductPageContainer;
