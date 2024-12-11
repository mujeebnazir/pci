import { IdCardIcon } from "lucide-react";
import { useEffect, useState } from "react";

import ProductService from "@/lib/product";
enum Size {
  L = "L",
  M = "M",
  SM = "SM",
  XL = "XL",
  XXL = "XXL",
}

interface Product {
  id?: string;
  name: string;
  description: string;
  price: number;
  sizesAvailable: Size[];
  itemsCount: number;
  category?: string;
  images?: string[];
  createdAt?: string;
}

const useGetProduct = (
  id: string
): { product: Product | null; isLoading: boolean; error: boolean } => {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getAllProducts = async () => {
      setIsLoading(true);
      setError(false);
      try {
        const data = await ProductService.getProduct(id);
        setProduct(data);
        setIsLoading(false);
      } catch (error: any) {
        setError(true);
      }
    };
    getAllProducts();
  }, [id]);
  return { product, isLoading, error };
};

export default useGetProduct;
