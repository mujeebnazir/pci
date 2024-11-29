"use client";

import { useEffect, useState } from "react";
import AuthModel from "@/components/AuthModel";
import QuickViewModel from "@/components/QuickViewModel";
import useQuickModel from "@/hooks/useQuickModel";

const ModelProvider = () => {
  const quickModelStore = useQuickModel();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <>
      <QuickViewModel productId={quickModelStore.id} />
      <AuthModel />
    </>
  );
};

export default ModelProvider;
