import React, { useState, useEffect } from "react";
import CartItem from "./CartItem";
import OrderSummary from "./OrderSummary";
import { useCartStore } from "../../zustand/cart";

type CartItemData = {
  $id: string;
  name: string;
  image: string;
  price: number;
  size: string;
  color: string;
  quantity: number;
};

type CartPageProps = {
  applyPromoCode?: () => void;
  onRemove: (id: string) => void;
  onIncrease: (id: string) => void;
  onDecrease: (id: string) => void;
};

const CartPage: React.FC<CartPageProps> = ({
  applyPromoCode,
  onRemove,
  onIncrease,
  onDecrease,
}) => {
  const [items, setItems] = useState<CartItemData[]>([]);
  const [error, setError] = useState<string | null>(null);

  const {
    totalMRP,
    discountOnMRP,
    deliveryFee,
    totalAmount,
    isLoading,
    initializeCart,
  } = useCartStore((state) => ({
    totalMRP: state.totalMRP,
    discountOnMRP: state.discountOnMRP,
    deliveryFee: state.deliveryFee,
    totalAmount: state.totalAmount,
    isLoading: state.isLoading,
    initializeCart: state.initializeCart,
  }));

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const cartItems = await initializeCart();
      } catch (err: any) {
        setError(err.message);
      }
    };
    fetchCart();
  }, [initializeCart]);

  if (isLoading) {
    return <p className="text-center text-gray-500">Loading your cart...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-6 w-[80%] mx-auto">
      {/* Cart Items Section */}
      <div className="flex-1 bg-gray-100 p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
        <p className="text-gray-500 text-sm mb-2">
          Total Items: <span className="font-semibold">{items.length}</span>
        </p>
        <div className="space-y-4 max-h-[35vh] overflow-y-auto">
          {items.length > 0 ? (
            items.map((item) => (
              <CartItem
                key={item.$id} // Use unique identifier
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

      {/* Order Summary Section */}
      <div className="bg-gray-200 w-full lg:w-[40%] p-4 rounded-lg">
        <OrderSummary
          totalMRP={totalMRP}
          discountOnMRP={discountOnMRP}
          deliveryFee={deliveryFee}
          totalAmount={totalAmount}
          applyPromoCode={applyPromoCode ?? (() => {})}
        />
      </div>
    </div>
  );
};

export default CartPage;
