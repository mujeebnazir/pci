//store.ts
import { create } from "zustand";
import CartItemService from "@/lib/cartItem";

interface Product {
  $id: string;
  name: string;
  price: number;
}
interface CartItem {
  $id?: string;
  product: Product;
  quantity: number;
}

interface CartState {
  totalAmount: number;
  items: CartItem[];
  itemsCount: number;
  totalMRP: number;
  discountOnMRP: number;
  deliveryFee: number;
  isLoading: boolean;
  error: string | null;
  initializeCart: () => Promise<void>;
  addItem: (item: CartItem) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
  onIncrease: (id: string) => Promise<void>;
  onDecrease: (id: string) => Promise<void>;
}

export const useCartStore = create<CartState>((set, get) => ({
  totalAmount: 0,
  items: [],
  itemsCount: 0,
  totalMRP: 0,
  discountOnMRP: 0,
  deliveryFee: 5,
  isLoading: false,
  error: null,

  // **Initialize Cart**
  initializeCart: async () => {
    try {
      set({ isLoading: true, error: null });
      const items = await CartItemService.getCartItems();
      const totalMRP = items.reduce(
        (sum, item) => sum + (item.product as Product).price * item.quantity,
        0
      );
      const discountOnMRP = totalMRP * 0.2; // 20% discount
      const totalAmount = totalMRP - discountOnMRP + get().deliveryFee;

      set({
        items,
        totalMRP,
        discountOnMRP,
        totalAmount,
        itemsCount: items.length,
        isLoading: false,
      });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  // **Add Item**
  addItem: async (item) => {
    try {
      set({ isLoading: true, error: null });
      const success = await CartItemService.addCartItem(
        item.product,
        item.quantity
      );
      if (success) {
        const updatedItems = [...get().items, item];
        const totalMRP = updatedItems.reduce(
          (sum, item) => sum + (item.product.price as number) * item.quantity,
          0
        );
        const discountOnMRP = totalMRP * 0.2;
        const totalAmount = totalMRP - discountOnMRP + get().deliveryFee;

        set({
          items: updatedItems,
          totalMRP,
          discountOnMRP,
          totalAmount,
          itemsCount: updatedItems.length,
          isLoading: false,
        });
      }
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  // **Remove Item**
  removeItem: async (id) => {
    try {
      set({ isLoading: true, error: null });
      const success = await CartItemService.removeCartItem(id);
      if (success) {
        const updatedItems = get().items.filter((item) => item.$id !== id);
        const totalMRP = updatedItems.reduce(
          (sum, item) => sum + (item.product.price as number) * item.quantity,
          0
        );
        const discountOnMRP = totalMRP * 0.2;
        const totalAmount = totalMRP - discountOnMRP + get().deliveryFee;

        set({
          items: updatedItems,
          totalMRP,
          discountOnMRP,
          totalAmount,
          itemsCount: updatedItems.length,
          isLoading: false,
        });
      }
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  // **Increase Quantity**
  onIncrease: async (id) => {
    try {
      set({ isLoading: true, error: null });
      const item = get().items.find((item) => item.$id === id);
      if (!item) throw new Error("Item not found");

      const success = await CartItemService.updateCartItem(
        item.quantity + 1,
        id
      );
      if (success) {
        const updatedItems = get().items.map((item) =>
          item.$id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
        const totalMRP = updatedItems.reduce(
          (sum, item) => sum + (item.product.price as number) * item.quantity,
          0
        );
        const discountOnMRP = totalMRP * 0.2;
        const totalAmount = totalMRP - discountOnMRP + get().deliveryFee;

        set({
          items: updatedItems,
          totalMRP,
          discountOnMRP,
          totalAmount,
          isLoading: false,
        });
      }
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  // **Decrease Quantity**
  onDecrease: async (id) => {
    try {
      set({ isLoading: true, error: null });
      const item = get().items.find((item) => item.$id === id);
      if (!item || item.quantity <= 1) throw new Error("Invalid quantity");

      const success = await CartItemService.updateCartItem(
        item.quantity - 1,
        id
      );
      if (success) {
        const updatedItems = get().items.map((item) =>
          item.$id === id ? { ...item, quantity: item.quantity - 1 } : item
        );
        const totalMRP = updatedItems.reduce(
          (sum, item) => sum + (item.product.price as number) * item.quantity,
          0
        );
        const discountOnMRP = totalMRP * 0.2;
        const totalAmount = totalMRP - discountOnMRP + get().deliveryFee;

        set({
          items: updatedItems,
          totalMRP,
          discountOnMRP,
          totalAmount,
          isLoading: false,
        });
      }
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },
}));
