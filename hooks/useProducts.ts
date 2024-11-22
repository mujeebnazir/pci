import { useEffect, useState } from "react";

const useProducts = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loadingProducts, setLoadingProducts] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const getAllProducts = async () => {};
  }, []);
};
