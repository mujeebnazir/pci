import { useRouter } from "next/navigation";
import React from "react";
import { useCartStore } from "@/zustand/cart";

import toast from "react-hot-toast";
import AuthService from "@/lib/auth";
import useAuthModel from "@/hooks/useAuthModel";
import useAuthStore from "@/zustand/authStore";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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

type ProductCardProps = {
  product: Product;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const router = useRouter();
  const { checkUserStatus } = useAuthStore();
  const authModel = useAuthModel();
  const addToCart = useCartStore((state) => state.addItem);

  const handleClick = () => {
    router.push(`/product/${product?.id}`);
  };
  console.log("product", product);
  const handleAddToCart = async (e: React.MouseEvent) => {
    const user = await checkUserStatus();
    if (!user) {
      toast.error("Please login to add items to cart");
      return authModel.onOpen();
    }

    const cartitem = {
      product: {
        ...product,
        $id: product.id,
        category: product.category,
        sizesAvailable: product.sizesAvailable,
      },
      quantity: 1,
    };
    try {
      await addToCart(cartitem);
      toast.success("Item added to cart");
    } catch (error) {
      toast.error("Error adding item to cart");
    }
  };

  return (
    <div className="group flex flex-col items-center justify-center cursor-pointer transition transform hover:scale-105">
      <div
        onClick={handleClick}
        className="relative h-[65vh] my-2 w-full max-w-xs overflow-hidden bg-white rounded-md shadow-lg transition-all duration-300 hover:shadow-xl"
      >
        <Carousel>
          <CarouselContent>
            {product?.images?.map((image, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <div className="relative overflow-hidden">
                    <img
                      src={image}
                      alt={`${product.name} - ${index + 1}`}
                      className="h-full w-full object-cover transition-transform duration-500 ease-in-out transform group-hover:scale-110"
                      loading="lazy"
                    />
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

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
            ${product.price ?? product.price}
          </span>
          {product.price && (
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
