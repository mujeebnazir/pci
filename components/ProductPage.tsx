"use client";
import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import ProductDetailsKashmiri from "./ProductDetails";
import useAuthModel from "@/hooks/useAuthModel";
import { useCartStore } from "@/zustand/cart";
import useAuthStore from "@/zustand/authStore";
import toast from "react-hot-toast";
import Image from "next/image";

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

const ProductPage: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
        <div className="bg-white rounded-lg shadow-sm p-6 lg:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <ProductGallery images={product?.images || []} />
            <ProductInfo product={product} />
          </div>
        </div>
        <Tabs />
      </div>
    </div>
  );
};

const ProductGallery: React.FC<{ images: string[] }> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState<number>(0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
      {/* Thumbnails - Vertical on desktop */}
      <div className="order-2 md:order-1 md:col-span-2">
        <div
          className="flex md:flex-col gap-2  md:max-h-[500px] 
          pb-2 md:pb-0 md:pr-2"
        >
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`relative shrink-0 w-16 md:w-full aspect-square rounded-xl 
                transition-all duration-300 
                ${
                  selectedImage === index
                    ? "ring-2 ring-blue-500 ring-offset-2 ring-offset-white"
                    : "ring-1 ring-gray-200 hover:ring-gray-300"
                }`}
            >
              <Image
                src={img}
                alt={`View ${index + 1}`}
                fill
                sizes="(max-width: 768px) 64px, 120px"
                className={`object-cover rounded-lg ${
                  selectedImage === index
                    ? "opacity-100"
                    : "opacity-70 hover:opacity-100"
                } transition-opacity duration-300`}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Main Image */}
      <div className="order-1 md:order-2 md:col-span-10">
        <div className="relative w-full h-[300px] sm:h-[350px] lg:h-[400px] rounded-xl overflow-hidden">
          <Image
            src={images[selectedImage]}
            alt={`Product view ${selectedImage + 1}`}
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1000px"
            className="object-contain rounded-2xl transition-opacity duration-500"
          />

          {/* Image Counter */}
          <div
            className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1.5 
            rounded-full text-sm font-medium backdrop-blur-sm"
          >
            {selectedImage + 1} / {images.length}
          </div>
        </div>
      </div>
    </div>
  );
};

const ProductInfo: React.FC<{ product: Product }> = ({ product }) => {
  const { checkUserStatus, session } = useAuthStore();
  const authModel = useAuthModel();
  const addToCart = useCartStore((state) => state.addItem);
  const [quantity, setQuantity] = useState<number>(1);
  const [addToCartLoading, setAddToCartLoading] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string>(
    product.sizesAvailable?.[0] || ""
  );

  const handleAddToCart = async () => {
    setAddToCartLoading(true);

    if (!session) {
      toast.error("Please login to add items to cart");
      return authModel.onOpen();
    }

    const cartitem = {
      product: {
        ...product,
        $id: product.$id,
        category: product.category,
        sizesAvailable: product.sizesAvailable,
      },
      quantity: 1,
    };
    console.log("productfromProductPage", product);
    console.log("cartitemfromProductPage", cartitem);

    try {
      await addToCart(cartitem);
      toast.success("Item added to cart");
      setAddToCartLoading(false);
    } catch (error) {
      toast.error("Error adding item to cart");
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold text-gray-900">{product.name}</h1>
        <div className="flex items-center space-x-2">
          <div className="flex text-yellow-400">
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar className="text-gray-200" />
          </div>
          <span className="text-sm text-gray-600">4.5 (245 reviews)</span>
        </div>
      </div>

      <div className="space-y-1">
        <div className="flex items-baseline space-x-3">
          <span className="text-3xl font-bold text-gray-900">
            ₹{(product.price - (product.price * 10) / 100).toFixed(2)}
          </span>
          <span className="text-lg text-gray-500 line-through">
            ₹{product.price}
          </span>
          <span className="px-2.5 py-0.5 text-sm font-medium text-red-600 bg-red-50 rounded-full">
            Save 10%
          </span>
        </div>
        <p className="text-sm text-green-600">In stock</p>
      </div>

      <p className="text-gray-600">{product.description}</p>

      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700">
          Select Size
        </label>
        <div className="flex flex-wrap gap-2">
          {product?.sizesAvailable?.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`min-w-[4rem] px-4 py-2.5 text-sm font-medium rounded-md transition-colors
                ${
                  selectedSize === size
                    ? "bg-gray-900 text-white"
                    : "bg-white text-gray-900 border border-gray-200 hover:bg-gray-50"
                }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center rounded-md border border-gray-200">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="p-3 hover:bg-gray-50 transition-colors"
          >
            -
          </button>
          <span className="w-12 text-center py-3 font-medium border-x border-gray-200">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="p-3 hover:bg-gray-50 transition-colors"
          >
            +
          </button>
        </div>
        <button
          onClick={handleAddToCart}
          className="flex-1 py-3 px-6 bg-gray-900 text-white rounded-md font-medium 
            hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 
            focus:ring-gray-900 transition-colors"
        >
          {addToCartLoading ? (
            <div className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]" />
          ) : (
            "Add to Cart"
          )}
        </button>
      </div>
    </div>
  );
};

const Tabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("details");

  return (
    <div className="mt-8">
      <div className="bg-white rounded-lg shadow-sm">
        <div className="border-b border-gray-200">
          <div className="flex space-x-8 px-6">
            {["details", "reviews"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab
                    ? "border-gray-900 text-gray-900"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab === "details" ? "Product Details" : "Reviews"}
              </button>
            ))}
          </div>
        </div>
        <div className="p-6">
          {activeTab === "details" && <ProductDetails />}
          {activeTab === "reviews" && <Reviews />}
        </div>
      </div>
    </div>
  );
};

const ProductDetails: React.FC = () => {
  return <ProductDetailsKashmiri />;
};

const Reviews: React.FC = () => {
  const reviews = [
    { id: 1, reviewerName: "Alice", rating: 5, comment: "Great quality!" },
    { id: 2, reviewerName: "Bob", rating: 4, comment: "Very comfortable." },
    { id: 3, reviewerName: "Charlie", rating: 5, comment: "Perfect fit!" },
    {
      id: 4,
      reviewerName: "David",
      rating: 4,
      comment: "Good value for money.",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">
          Customer Reviews
        </h3>
        <div className="flex items-center space-x-2">
          <div className="flex text-yellow-400">
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar className="text-gray-200" />
          </div>
          <span className="text-sm text-gray-600">4.5 out of 5</span>
        </div>
      </div>

      <div className="grid gap-4">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-gray-900">
                {review.reviewerName}
              </span>
              <div className="flex text-yellow-400">
                {[...Array(review.rating)].map((_, i) => (
                  <FaStar key={i} className="w-4 h-4" />
                ))}
              </div>
            </div>
            <p className="text-gray-600">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
