import React from "react";
import CartItem from "./CartItem";
import OrderSummary from "./OrderSummary";
import { useCartStore } from "../../zustand/cart";

type CartItemData = {
  id: string;
  name: string;
  image: string;
  price: number;
  size: string;
  color: string;
  quantity: number;
};

type CartPageProps = {
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  applyPromoCode?: () => void;
  onRemove: (id: string) => void;
  onIncrease: (id: string) => void;
  onDecrease: (id: string) => void;
};

const CartPage: React.FC<CartPageProps> = ({
  subtotal,
  discount,
  deliveryFee,
  total,
  applyPromoCode,
  onRemove,
  onIncrease,
  onDecrease,
}) => {
  // const items: CartItemData[] = useCartStore((state) => state.items);
  const cartStore = useCartStore();
  const items = cartStore.items;
  return (
    <div className="flex flex-col lg:flex-row gap-6 p-6 w-[80%] mx-auto">
      <div className="flex-1 bg-gray-100 p-4 rounded-lg ">
        <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
        <p className="text-gray-500 text-sm mb-2">
          Total Items: <span className="font-semibold">{items.length}</span>
        </p>
        <div className="space-y-4 max-h-[35vh] overflow-y-auto">
          {items.length > 0 ? (
            items.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onRemove={onRemove}
                onIncrease={onIncrease}
                onDecrease={onDecrease}
              />
            ))
          ) : (
            <p className="text-center text-gray-500 text-md font-normal">
              No items in your cart!
            </p>
          )}
        </div>
      </div>

      <div className="bg-gray-200 w-full lg:w-[40%] p-4 rounded-lg">
        <OrderSummary
          totalMRP={cartStore.totalMRP}
          discountOnMRP={cartStore.discountOnMRP}
          deliveryFee={cartStore.deliveryFee}
          totalAmount={cartStore.totalAmount}
          applyPromoCode={applyPromoCode ?? (() => {})}
        />
      </div>
    </div>
  );
};

export default CartPage;
