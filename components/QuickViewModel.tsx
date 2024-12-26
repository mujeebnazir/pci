import React from "react";
import Model from "./Model";
import useQuickModel from "@/hooks/useQuickModel";
import ProductPage from "./ProductPage";
import useGetProduct from "@/hooks/usegetProduct";

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

const QuickViewModel = ({ productId }: { productId: string }) => {
  const quickModel = useQuickModel();
  const { product } = useGetProduct(productId ?? "") as { product: Product | null };

  const onChange = (open: boolean) => {
    if (!open) {
      quickModel.onClose();
    }
  };

  return (
    <Model
      isOpen={quickModel.isOpen}
      title="Product Details"
      discription=""
      type="quickview"
      onChange={onChange}
    >
      {product ? (
        <ProductPage product={product} />
      ) : (
        <p>Loading product details...</p>
      )}
    </Model>
  );
};

export default QuickViewModel;
