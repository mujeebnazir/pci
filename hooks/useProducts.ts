import { useEffect, useState } from "react";
import ProductService from "@/lib/product";
const useProducts = ({ category }: { category?: string }) => {
  const [products, setProducts] = useState<any[]>([]);
  const [loadingProducts, setLoadingProducts] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const getAllProducts = async () => {
      setLoadingProducts(true);
      setError(null);
      try {
        const data = await ProductService.getProducts(category);
        console.log(data);
        setProducts(data);
        setLoadingProducts(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError(error as Error);
      }
    };
    getAllProducts();
  }, [category]);
  return { products, loadingProducts, error };
};

export default useProducts;