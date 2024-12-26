import { useEffect, useState } from "react";
import ProductService from "@/lib/product";

const useSearchProducts = ({
  query = "",
  pageSize = 10,
}: {
  query?: string;
  pageSize?: number;
} = {}) => {
  const [products, setProducts] = useState<any[]>([]);
  const [loadingProducts, setLoadingProducts] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [currentOffset, setCurrentOffset] = useState<number>(0);

  const fetchProducts = async (offset: number) => {
    setLoadingProducts(true);
    setError(null);

    try {
      const response = await ProductService.searchProducts(
        query,
        pageSize,
        offset
      );

      // Append new products to the existing list
      setProducts((prevProducts) => [...prevProducts, ...response.products]);

      // Determine if there are more products to load
      setHasMore(response.products.length === pageSize);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError(error as Error);
    } finally {
      setLoadingProducts(false);
    }
  };

  // Fetch products on initial load or query change
  useEffect(() => {
    // Reset on new query
    setProducts([]);
    setHasMore(true);
    setCurrentOffset(0);

    fetchProducts(0);
  }, [query]);

  // Load more products
  const loadMore = () => {
    if (!loadingProducts && hasMore) {
      const newOffset = currentOffset + pageSize;
      setCurrentOffset(newOffset);
      fetchProducts(newOffset);
    }
  };

  return {
    products,
    loadingProducts,
    error,
    hasMore,
    loadMore,
  };
};

export default useSearchProducts;
