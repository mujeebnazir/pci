import { create } from "zustand";

// Define a type for the product
interface Product {
  id: number;
  name: string;
  price: number;
}

// Define the store state type
interface PostStoreState {
  products: Product[];
  addProduct: (product: Product) => void;
  removeProduct: (id: number) => void;
  updateProduct: (product: Product) => void;
}

export const usePostStore = create<PostStoreState>((set) => ({
  products: [],

  addProduct: (product) =>
    set((state) => ({ products: [...state.products, product] })),

  removeProduct: (id) =>
    set((state) => ({
      products: state.products.filter((product) => product.id !== id),
    })),

  updateProduct: (product) =>
    set((state) => ({
      products: state.products.map((p) => (p.id === product.id ? product : p)),
    })),
}));
