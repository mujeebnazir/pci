//store.ts
import { create } from "zustand";
import CartItemService from "@/lib/cartItem";

type Product = {
  $id: string; // Add this property
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  sizesAvailable: string[]; // Ensure this matches
  images: string[]; // Add this property
};

export type CartItemData = {
  id?: string;
  cartId?: string;
  product: Product; // This must match the updated `Product` type
  quantity: number;
};

interface CartState {
  totalAmount: number; // Total amount after discounts and additional fees
  items: CartItemData[]; // Array of items in the cart
  itemsCount: number; // Total number of items in the cart
  totalMRP: number; // Total MRP (Maximum Retail Price) of all items
  discountOnMRP: number; // Total discount applied on MRP
  deliveryFee: number; // Delivery fee for the cart
  isLoading: boolean; // Loading state of the cart
  error: string | null; // Error message if any operation fails
  initializeCart: () => Promise<void>; // Method to initialize the cart
  addItem: (item: CartItemData) => Promise<void>; // Method to add an item to the cart
  removeItem: (id: string) => Promise<void>; // Method to remove an item by product ID
  onIncrease: (id: string) => Promise<void>; // Method to increase the quantity of a cart item
  onDecrease: (id: string) => Promise<void>; // Method to decrease the quantity of a cart item
  removeItems: (ids: string[]) => Promise<void>; // Method to remove multiple items by product ID
}

export const useCartStore = create<CartState>((set, get) => ({
  totalAmount: 0,
  items: [],
  itemsCount: 0,
  totalMRP: 0,
  discountOnMRP: 0,
  deliveryFee: 30,
  isLoading: false,
  error: null,

  // **Initialize Cart**
  initializeCart: async () => {
    try {
      set({ isLoading: true, error: null });
      const items = await CartItemService.getCartItems();

      if (!items || !Array.isArray(items)) {
        throw new Error("Failed to load cart items.");
      }
      const totalMRP = items.reduce(
        (sum, item) => sum + (item.product.price as number) * item.quantity,
        0
      );
      const discountOnMRP = Math.round(totalMRP * 0.2); // 20% discount
      const deliveryFee = get().deliveryFee;
      const totalAmount = totalMRP - discountOnMRP + deliveryFee;
      const cartItemsData: CartItemData[] = items.map((item) => ({
        ...item,
        cartId: item.cartId,
        product: {
          $id: item.product.$id,
          id: item.product.$id,
          name: item.product.name,
          price: item.product.price,
          description: (item.product as any).description || "",
          category: (item.product as any).category || "",
          sizesAvailable: (item.product as any).sizesAvailable || [],
          images: item.product.images || [],
        },
        quantity: item.quantity,
      }));

      set({
        items: cartItemsData,
        totalMRP,
        discountOnMRP,
        totalAmount,
        itemsCount: cartItemsData.length,
        isLoading: false,
      });
    } catch (error: any) {
      console.error("Error initializing cart:", error);
      set({ error: error.message || "Unknown error", isLoading: false });
    }
  },

  // **Add Item**
  addItem: async (item: CartItemData) => {
    try {
      set({ isLoading: true, error: null });
      const success = await CartItemService.addCartItem(
        item.product,
        item.quantity
      );
      if (success) {
        const updatedItems: CartItemData[] = [
          ...get().items,
          success as CartItemData,
        ];

        const totalMRP = updatedItems.reduce(
          (sum, item) => sum + item.product.price * item.quantity,
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

  removeItem: async (id) => {
    try {
      set({ isLoading: true, error: null });
      const success = await CartItemService.removeCartItem(id);
      if (success) {
        const updatedItems = get().items.filter((item) => item.id !== id);

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
  removeItems: async (ids: string[]) => {
    try {
      set({ isLoading: true, error: null });

      const successResponses = await CartItemService.removeCartItems(ids);

      if (successResponses) {
        const updatedItems = get().items.filter(
          (item) => !ids.includes(item.id ?? "")
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
      const item = get().items.find((item) => item.id === id);
      if (!item) throw new Error("Item not found");

      const success = await CartItemService.updateCartItem(
        item.quantity + 1,
        id
      );
      if (success) {
        const updatedItems = get().items.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
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
      const item = get().items.find((item) => item.id === id);
      if (!item || item.quantity <= 1) throw new Error("Invalid quantity");

      const success = await CartItemService.updateCartItem(
        item.quantity - 1,
        id
      );
      if (success) {
        const updatedItems = get().items.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
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
