import { useState, useEffect } from "react";
import ProductService from "@/lib/product"; // Adjust the import based on your file structure

interface Product {
    id: string | undefined;
    name: string;
    description: string;
    price: number;
    sizesAvailable: string[];
    itemsCount: number;
    category: string;
    images: string[];
    createdAt: string;
  }

interface UseFetchNewlyAddedProductsResult {
  newProducts: Product[];
  total: number;
  loading: boolean;
  error: string | null;
}

export const useFetchNewlyAddedProducts = (): UseFetchNewlyAddedProductsResult => {
  const [newProducts, setNewProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNewProducts = async () => {
      try {
        const data = await ProductService.getNewlyAddedProducts();
        console.log("Fetched newly added products:", data);
        setNewProducts(data.products as Product[]);
        setTotal(data.total); // Save the total count
      } catch (error: any) {
        console.error("Error fetching newly added products:", error);
        setError(error.message || "Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    fetchNewProducts();
  }, []);

  return { newProducts, total, loading, error };
};
