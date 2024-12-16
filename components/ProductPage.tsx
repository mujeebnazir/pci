"use client";
import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import ProductDetailsKashmiri from "./ProductDetails";
import useAuthModel from "@/hooks/useAuthModel";
import { useCartStore } from "@/zustand/cart";
import useAuthStore from "@/zustand/authStore";
import toast from "react-hot-toast";

enum Size {
  L = "L",
  M = "M",
  SM = "SM",
  XL = "XL",
  XXL = "XXL",
}
interface Product {
  $id: string;
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  sizesAvailable: string[];
  images: string[];
}

interface Review {
  id: number;
  reviewerName: string;
  rating: number;
  comment: string;
}

interface RecommendedProduct {
  id: number;
  title: string;
  image: string;
}

const reviews: Review[] = [
  { id: 1, reviewerName: "Alice", rating: 5, comment: "Great quality!" },
  { id: 2, reviewerName: "Bob", rating: 4, comment: "Very comfortable." },
  { id: 3, reviewerName: "Alice", rating: 5, comment: "Great quality!" },
  { id: 4, reviewerName: "Bob", rating: 4, comment: "Very comfortable." },
  { id: 5, reviewerName: "Alice", rating: 5, comment: "Great quality!" },
  { id: 6, reviewerName: "Bob", rating: 4, comment: "Very comfortable." },
];

// ProductPage Component
const ProductPage: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <div className="mx-auto px-2 sm:px-6 lg:px-8 h-screen overflow-hidden ">
      <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6 w-full h-full">
        <div className="w-full lg:w-[45%] h-full px-2">
          <ProductGallery images={product?.images || []} />
        </div>

        <div className="w-full lg:w-1/2 px-2 overflow-y-auto h-full hide-scrollbar">
          <ProductInfo product={product} />
        </div>
      </div>
    </div>
  );
};

interface ProductGalleryProps {
  images: string[];
}

const ProductGallery: React.FC<ProductGalleryProps> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState<number>(0);

  return (
    <div className="flex flex-row items-center space-x-2 w-full h-auto lg:h-[100vh] sticky">
      <div className="flex flex-col  items-center lg:items-start space-y-2 lg:space-x-0 lg:space-y-3">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={img}
            onClick={() => setSelectedImage(index)}
            className={`w-16 h-16 sm:w-20 sm:h-20 cursor-pointer ${
              index === selectedImage ? "border-2 border-blue-500" : "border"
            }`}
          />
        ))}
      </div>
      <div>
        <img
          src={images[selectedImage]}
          alt={images[selectedImage]}
          className="w-[80vw] sm:w-[60vw] lg:w-[30vw] h-auto border border-gray-300 rounded-md"
        />
      </div>
    </div>
  );
};

// ProductInfo Component
interface ProductInfoProps {
  product: Product;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  const { checkUserStatus } = useAuthStore();
  const authModel = useAuthModel();
  const addToCart = useCartStore((state) => state.addItem);
  const [quantity, setQuantity] = useState<number>(1);
  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => setQuantity(quantity > 1 ? quantity - 1 : 1);
  const [select, setSelect] = useState<string>(product.sizesAvailable?.[0] || "");

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
      quantity: quantity,
    };
    try {
      await addToCart(cartitem);
      toast.success("Item added to cart");
    } catch (error) {
      toast.error("Error adding item to cart");
    }
  };

  return (
    <div className="flex flex-col space-y-2 w-full overflow-auto lg:mt-14">
      <h2 className="text-2xl sm:text-3xl font-semibold">{product.name}</h2>
      <div className="flex items-center text-black">
        <FaStar className="mr-1" color="#FFC107" /> 4.5/
        <span className="text-gray-500">5</span>
      </div>
      <p className="text-xl sm:text-2xl font-semibold text-black">
        ₹{(product.price - (product.price * 10) / 100).toFixed(2)}{" "}
        <span className="line-through text-gray-500">₹{product.price}</span>
        <span className="ml-2 px-1 text-sm bg-orange-900 bg-opacity-10 rounded-lg">
          -10%
        </span>
      </p>
      <p className="text-sm sm:text-lg font-normal text-gray-600 line-clamp-2">
        {product.description}
      </p>
      <hr />

      <div className="flex flex-col space-y-2">
        <span className="font-normal text-sm text-black">Size</span>
        <div className="flex flex-row flex-wrap gap-2">
          {product?.sizesAvailable?.map((size, index) => (
            <div
              onClick={() => setSelect(size)}
              key={index}
              className={`w-16 h-9 border flex justify-center items-center cursor-pointer ${
                select === size ? "bg-black text-white" : ""
              }`}
            >
              {size}
            </div>
          ))}
        </div>
      </div>

      <hr />
      <div className="flex items-center space-x-4 pt-4">
        <div className="flex items-center justify-center space-x-4 border px-6 py-1">
          <button onClick={decreaseQuantity} className="text-2xl font-semibold">
            -
          </button>
          <span>{quantity}</span>
          <button onClick={increaseQuantity} className="text-2xl font-semibold">
            +
          </button>
        </div>

        <button
          className="px-4 py-2 w-full bg-black text-white hover:bg-gray-700"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
      <Tabs />
    </div>
  );
};

// Tabs Component
const Tabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("details");

  return (
    <div className="flex flex-col space-y-4 mt-8">
      <div className="flex space-x-3 lg:space-x-20 justify-center mx-auto px-5 py-1">
        <button
          onClick={() => setActiveTab("details")}
          className={`text-xl font-semibold  ${
            activeTab === "details"
              ? "border-b-2 border-black text-black transition"
              : "text-gray-500"
          }`}
        >
          Product Details
        </button>
        <button
          onClick={() => setActiveTab("reviews")}
          className={` text-xl font-semibold  ${
            activeTab === "reviews"
              ? "border-b-2 border-black text-black transition"
              : "text-gray-500"
          }`}
        >
          Rating & Reviews
        </button>
        <button
          onClick={() => setActiveTab("faq")}
          className={` text-xl font-semibold   ${
            activeTab === "faq"
              ? "border-b-2 border-black text-black transition"
              : "text-gray-500"
          }`}
        >
          FAQs
        </button>
      </div>
      <div>
        {activeTab === "details" && <ProductDetails />}
        {activeTab === "reviews" && <Reviews reviews={reviews} />}
      </div>
    </div>
  );
};

// ProductDetails Component
const ProductDetails: React.FC = () => {
  return (
    <div className="p-4 mx-auto w-[90%]">
      <ProductDetailsKashmiri />
    </div>
  );
};

// Reviews Component
interface ReviewsProps {
  reviews: Review[];
}

const Reviews: React.FC<ReviewsProps> = ({ reviews }) => {
  const [visibleReviews, setVisibleReviews] = useState<number>(5);

  const loadMoreReviews = () => setVisibleReviews(visibleReviews + 5);

  return (
    <div className="mt-8 mx-auto w-full sm:w-[80%]">
      <h3 className="text-lg sm:text-xl font-semibold">
        All Reviews ({reviews.length})
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
        {reviews.slice(0, visibleReviews).map((review) => (
          <div key={review.id} className="p-4 border shadow bg-white">
            <p className="font-bold">
              {review.reviewerName} - {review.rating}⭐
            </p>
            <p className="text-sm sm:text-lg font-normal text-black line-clamp-2">
              {review.comment}
            </p>
          </div>
        ))}
      </div>
      {visibleReviews < reviews.length && (
        <div className="flex justify-center">
          <button
            onClick={loadMoreReviews}
            className="mt-4 px-6 py-2 bg-black hover:bg-gray-900 text-white rounded"
          >
            Load More Reviews
          </button>
        </div>
      )}
    </div>
  );
};

// RecommendedProducts Component
// const RecommendedProducts: React.FC = () => (
//   <div className="mt-8 flex flex-col">
//     <h3 className="text-2xl font-semibold self-center">You might also like</h3>
//     <Products products={products} />
//   </div>
// );

export default ProductPage;
