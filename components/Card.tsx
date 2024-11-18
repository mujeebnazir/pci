import { useRouter } from "next/navigation";
import React from "react";
import { useCartStore } from "@/zustand/cart";

import toast from "react-hot-toast";
import AuthService from "@/lib/auth";
import useAuthModel from "@/hooks/useAuthModel";
import useAuthStore from "@/zustand/authStore";
type Product = {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  discountedPrice?: number;
  rating: number;
  isOnSale: boolean;
  size?: string;
  color?: string;
  quantity?: number;
  category?: string;
  subcategory?: string;
};

type ProductCardProps = {
  product: Product;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const router = useRouter();
  const { checkUserStatus } = useAuthStore();
  const authModel = useAuthModel();
  const addToCart = useCartStore((state) => state.addItem);

  const handleClick = () => {
    router.push(`/product/${product.id}`);
  };

  const handleAddToCart = async (e: React.MouseEvent) => {
    const user = await checkUserStatus();
    if (!user) {
      toast.error("Please login to add items to cart");
      return authModel.onOpen();
    }
    addToCart({
      ...product,
      size: product.size || "",
      color: product.color || "",
      quantity: product.quantity || 1,
    });
  };

  return (
    <div
      className="group flex flex-col items-center justify-center cursor-pointer transition transform hover:scale-105"
      onClick={handleClick}
    >
      <div className="relative h-[65vh] my-2 w-full max-w-xs overflow-hidden bg-white rounded-md shadow-lg transition-all duration-300 hover:shadow-xl">
        <img
          className="h-full w-full object-cover transition-transform duration-500 ease-in-out transform group-hover:scale-110"
          src={product.image}
          alt={product.name}
          loading="lazy"
        />

        <button className="absolute w-full bottom-0 left-1/2 transform -translate-x-1/2 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100 bg-black px-5 py-2 text-center text-sm font-semibold text-white hover:bg-gray-700">
          Quick View
        </button>
      </div>
      <button
        onClick={handleAddToCart}
        className="w-full border-2 border-black px-5 py-2 mt-2 text-center text-sm font-semibold text-black transition transform hover:shadow-lg hover:scale-105"
      >
        Add to Cart
      </button>
      <div className="self-start px-2 mt-2">
        <h5 className="text-lg font-semibold font-sans uppercase tracking-tight text-black">
          {product.name}
        </h5>
      </div>
      <div className="self-start px-2">
        <p className="text-sm text-black">
          From
          <span className="text-lg font-normal text-black">
            {" "}
            ${product.discountedPrice ?? product.price}
          </span>
          {product.discountedPrice && (
            <span className="ml-2 text-sm text-gray-500 line-through">
              ${product.price}
            </span>
          )}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
