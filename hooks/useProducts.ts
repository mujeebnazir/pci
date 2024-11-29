import { useEffect, useMemo, useState } from "react";
import ProductService from "@/lib/product";

const useProducts = ({
  category = "",
  pageSize = 10,
  currentPage = 1,
}: {
  category?: string;
  pageSize?: number;
  currentPage?: number;
} = {}) => {
  const [products, setProducts] = useState<any[]>([]);
  const [loadingProducts, setLoadingProducts] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [totalProducts, setTotalProducts] = useState<number>(0);

  const fetchProducts = async () => {
    setLoadingProducts(true);
    setError(null);
    try {
      const offset = (currentPage - 1) * pageSize; 
      const { products: fetchedProducts, total } =
        await ProductService.getProducts(category, pageSize, offset);
      setProducts(fetchedProducts);
      setTotalProducts(total);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError(error as Error);
    } finally {
      setLoadingProducts(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [category, currentPage, pageSize]);

  return useMemo(
    () => ({
      products,
      loadingProducts,
      error,
      totalProducts,
      setProducts,
    }),
    [products, loadingProducts, error, totalProducts]
  );
};

export default useProducts;
