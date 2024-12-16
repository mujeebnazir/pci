"use client";
import React from "react";
import CartItem from "./CartItem";
import { useCartStore } from "../../zustand/cart";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import OrderSummary from "./OrderSummary";

const CartPage: React.FC = () => {
  const {
    items,
    onDecrease,
    onIncrease,
    removeItem,
  } = useCartStore((state) => state);
  const router = useRouter();

  // Calculate order summary values
  const totalMRP = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const discountOnMRP = totalMRP * 0.1; // 10% discount
  const deliveryFee = totalMRP > 1000 ? 0 : 100; // Free delivery above ₹1000
  const totalAmount = totalMRP - discountOnMRP + deliveryFee;

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 md:px-8 w-screen mt-16">
      <div className="max-w-full ">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Shopping Cart
        </h1>
        
        {items.length > 0 ? (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items Section */}
            <div className="w-full lg:w-3/5">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="space-y-4 max-h-[60vh] overflow-y-auto hide-scrollbar pr-2">
                  {items.map((item, index) => (
                    <CartItem
                      key={index + "item"}
                      item={item}
                      onRemove={() => removeItem(item.id || "")}
                      onIncrease={() => onIncrease(item.id || "")}
                      onDecrease={() => onDecrease(item.id || "")}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary Section */}
            <div className="w-full lg:w-2/5">
              <div className="bg-white rounded-xl shadow-lg lg:sticky lg:top-8">
                <OrderSummary
                  totalMRP={totalMRP}
                  discountOnMRP={discountOnMRP}
                  deliveryFee={deliveryFee}
                  totalAmount={totalAmount}
                />
                <div className="px-6 pb-6">
                  <Button
                    variant="default"
                    onClick={() => router.push("/check-out")}
                    className="w-full bg-black hover:bg-gray-800 text-white py-4 text-lg font-medium rounded-lg transition duration-200"
                  >
                    Proceed to Checkout
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Your Cart is Empty
              </h2>
              <p className="text-gray-600 mb-8">
                Looks like you haven't added anything to your cart yet. Explore our collection and find something you love!
              </p>
              <Button
                variant="default"
                onClick={() => router.push('/shop')}
                className="bg-black hover:bg-gray-800 text-white px-8 py-3 text-lg font-medium rounded-lg transition duration-200"
              >
                Continue Shopping
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
