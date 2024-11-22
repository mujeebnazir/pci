import { useEffect, useState } from "react";
import CategoryService from "@/lib/category";

const useCategories = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [loadingCategories, setLoadingCategories] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const getAllCategories = async () => {
      setLoadingCategories(true);
      setError(null);
      try {
        const data = await CategoryService.getCategories();
        setCategories(data);
        setLoadingCategories(false);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setError(error as Error);
      } finally {
        setLoadingCategories(false);
      }
    };
    getAllCategories();
  }, []);
  return { categories, loadingCategories, error };
};
export default useCategories;
