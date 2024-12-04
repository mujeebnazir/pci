import { useEffect, useState } from "react";
import ProductService from "@/lib/product";

const useSearchProducts = ({
  query = "",
  pageSize = 10,
  currentPage = 1,
}: {
  query?: string;
  pageSize?: number;
  currentPage?: number;
} = {}) => {
  const [products, setProducts] = useState<any[]>([]);
  const [loadingProducts, setLoadingProducts] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchProducts = async () => {
    setLoadingProducts(true);
    setError(null);
    try {
      const offset = (currentPage - 1) * pageSize;
      const response = await ProductService.searchProducts(
        query,
        pageSize,
        offset
      );
      setProducts(response.products);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError(error as Error);
    } finally {
      setLoadingProducts(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [query, currentPage, pageSize]);

  return {
    products,
    loadingProducts,
    error,
    setProducts,
  };
};

export default useSearchProducts;
