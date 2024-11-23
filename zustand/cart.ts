import { create } from "zustand";

interface CartItem {
  id: string;
  name: string;
  images: string[];
  price: number;
  size: string;
  color: string;
  quantity: number;
}

interface CartState {
  totalAmount: number;
  items: CartItem[];
  itemsCount: number;
  totalMRP: number;
  discountOnMRP: number;
  deliveryFee: number;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  onIncrease: (id: string) => void;
  onDecrease: (id: string) => void;
}

export const useCartStore = create<CartState>((set) => ({
  totalAmount: 0,
  items: [],
  itemsCount: 0,
  totalMRP: 0,
  discountOnMRP: 0,
  deliveryFee: 5,

  addItem: (item) => {
    set((state) => ({
      totalMRP: state.totalMRP + item.price,
      discountOnMRP: state.discountOnMRP + item.price * 0.2,
      totalAmount:
        state.totalMRP +
        item.price -
        (state.discountOnMRP + item.price * 0.2) +
        state.deliveryFee,
      items: [...state.items, item],
      itemsCount: state.itemsCount + 1,
    }));
  },

  removeItem: (id) => {
    set((state) => {
      const itemIndex = state.items.findIndex((item) => item.id === id);
      if (itemIndex === -1) return state; // Return if item not found

      const item = state.items[itemIndex];
      const itemTotalPrice = item.price * item.quantity;
      const itemDiscount = itemTotalPrice * 0.2; // 20% discount

      // Calculate new totals after removing the item
      const newTotalMRP = state.totalMRP - itemTotalPrice;
      const newDiscountOnMRP = state.discountOnMRP - itemDiscount;
      const newTotalAmount = newTotalMRP - newDiscountOnMRP + state.deliveryFee;

      return {
        totalMRP: newTotalMRP,
        discountOnMRP: newDiscountOnMRP,
        totalAmount: newTotalAmount,
        items: [
          ...state.items.slice(0, itemIndex),
          ...state.items.slice(itemIndex + 1),
        ],
        itemsCount: state.itemsCount - 1,
      };
    });
  },

  onIncrease: (id) =>
    set((state) => {
      const updatedItems = state.items.map((item) => {
        if (item.id === id) {
          const newQuantity = item.quantity + 1;
          return { ...item, quantity: newQuantity };
        }
        return item;
      });

      const totalMRP = updatedItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      const discountOnMRP = updatedItems.reduce(
        (sum, item) => sum + item.price * item.quantity * 0.2,
        0
      );

      const totalAmount = totalMRP - discountOnMRP + state.deliveryFee;

      return {
        items: updatedItems,
        totalMRP,
        discountOnMRP,
        totalAmount,
      };
    }),

  onDecrease: (id) =>
    set((state) => {
      const updatedItems = state.items.map((item) => {
        if (item.id === id && item.quantity > 1) {
          const newQuantity = item.quantity - 1;
          return { ...item, quantity: newQuantity };
        }
        return item;
      });

      const totalMRP = updatedItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      const discountOnMRP = updatedItems.reduce(
        (sum, item) => sum + item.price * item.quantity * 0.2,
        0
      );

      const totalAmount = totalMRP - discountOnMRP + state.deliveryFee;

      return {
        items: updatedItems,
        totalMRP,
        discountOnMRP,
        totalAmount,
      };
    }),
}));
