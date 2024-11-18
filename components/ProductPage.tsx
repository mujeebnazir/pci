"use client";
import React, { useState } from "react";
import { FaStar, FaChevronDown } from "react-icons/fa";
import Products from "./Products";
import { products } from "@/constants";

// Define types for product and review data
interface ProductImage {
  src: string;
  alt: string;
}

interface Product {
  id: number;
  title: string;
  price: number;
  discountPrice: number;
  rating: number;
  reviewsCount: number;
  images: ProductImage[];
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

const product: Product = {
  id: 1,
  title: "One Life Graphic T-shirt",
  price: 300,
  discountPrice: 260,
  rating: 4.5,
  reviewsCount: 451,
  images: [
    { src: "/path/to/image1.jpg", alt: "Product Image 1" },
    { src: "/path/to/image2.jpg", alt: "Product Image 2" },
    { src: "/path/to/image3.jpg", alt: "Product Image 3" },
  ],
};

const reviews: Review[] = [
  { id: 1, reviewerName: "Alice", rating: 5, comment: "Great quality!" },
  { id: 2, reviewerName: "Bob", rating: 4, comment: "Very comfortable." },
  { id: 3, reviewerName: "Alice", rating: 5, comment: "Great quality!" },
  { id: 4, reviewerName: "Bob", rating: 4, comment: "Very comfortable." },
  { id: 5, reviewerName: "Alice", rating: 5, comment: "Great quality!" },
  { id: 6, reviewerName: "Bob", rating: 4, comment: "Very comfortable." },
];

// ProductPage Component
const ProductPage: React.FC = () => {
  return (
    <div className=" mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row space-x-6 py-8">
        <ProductGallery images={product.images} />
        <ProductInfo product={product} />
      </div>
      <div className="w-full mx-auto">
        <Tabs />
        <RecommendedProducts />
      </div>
    </div>
  );
};

interface ProductGalleryProps {
  images: ProductImage[];
}

const ProductGallery: React.FC<ProductGalleryProps> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState<number>(0);

  return (
    <div className="flex flex-row items-center justify-center space-x-3  w-[45%]">
      <div className="flex flex-col space-y-3">
        {images.map((img, index) => (
          <img
            key={index}
            src={img.src}
            alt={img.alt}
            onClick={() => setSelectedImage(index)}
            className={`w-20 h-20 cursor-pointer ${
              index === selectedImage ? "border-2 border-blue-500" : "border"
            }`}
          />
        ))}
      </div>
      <div>
        <img
          src={images[selectedImage].src}
          alt={images[selectedImage].alt}
          className="w-96 h-96 border border-gray-300"
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
  const [quantity, setQuantity] = useState<number>(1);

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

  return (
    <div className="flex flex-col space-y-2 pt-10 w-[45%] overflow-auto">
      <h2 className="text-3xl font-semibold">{product.title}</h2>
      <div className="flex items-center text-black">
        <FaStar className="mr-1" color="#FFC107" /> {product.rating}/
        <span className="text-gray-500">5</span>
      </div>
      <p className="text-2xl font-semibold text-black">
        ${product.discountPrice}{" "}
        <span className="line-through text-gray-500">${product.price}</span>
        <span className="ml-2 px-1 text-sm bg-orange-900 text-orange-900 text-opacity-100 bg-opacity-10 rounded-lg">
          -
          {Math.round(
            ((product.price - product.discountPrice) / product.price) * 100
          )}
          %
        </span>
      </p>
      <p className="text-lg font-normal text-gray-600 text-wrap break-words line-clamp-2 active:line-clamp-none  overflow-hidden ">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos suscipit
        aut, exercitationem inventore ducimus nisi blanditiis odio. Porro et
        quaerat, est saepe officiis minus suscipit, aliquam dignissimos in
        beatae nulla.
      </p>
      <hr className="" />
      <div className="flex flex-col space-y-2">
        <span className="font-normal text-sm text-black">Colours</span>
        <div className="flex flex-row space-x-2">
          <div className="w-20 h-9 bg-red-500 border border-black"></div>
          <div className="w-20 h-9 bg-blue-500 border"></div>
          <div className="w-20 h-9 bg-green-500 border"></div>
        </div>
      </div>

      <div className="flex flex-col space-y-2">
        <span className="font-normal text-sm text-black">Size</span>
        <div className="flex flex-row space-x-2">
          <div className="w-20 h-9 border flex justify-center items-center border-black">
            L
          </div>
          <div className="w-20 h-9 border flex justify-center items-center ">
            M
          </div>
          <div className="w-20 h-9 border flex justify-center items-center ">
            S
          </div>
          <div className="w-20 h-9 border flex justify-center items-center ">
            XL
          </div>
        </div>
      </div>

      <div className="flex flex-col space-y-2">
        <span className="font-normal text-sm text-black">Gender</span>
        <div className="flex flex-row space-x-2">
          <div className="w-20 h-9 border flex justify-center items-center border-black">
            Male
          </div>
          <div className="w-20 h-9 border flex justify-center items-center ">
            Female
          </div>
        </div>
      </div>
      <hr className="" />
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

        <button className="px-4 py-2 w-full bg-black text-white hover:bg-gray-700">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

// Tabs Component
const Tabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("details");

  return (
    <div className="flex flex-col space-y-4 mt-8">
      <div className="flex lg:space-x-20 space-x-5 flex-row  mx-auto  px-5 py-1">
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
const ProductDetails: React.FC = () => (
  <div className="p-4 mx-auto w-[90%]">
    <p className="text-lg font-normal text-gray-700 text-wrap break-words line-clamp-2 active:line-clamp-none  overflow-hidden">
      This graphic t-shirt is perfect for any occasion... Lorem ipsum dolor sit
      amet consectetur adipisicing elit. Velit, in delectus. Quidem perspiciatis
      voluptatum ipsum eius amet dignissimos ex consectetur beatae laborum
      tempore magni in illo odio optio, veniam pariatur!
    </p>
  </div>
);

// Reviews Component
interface ReviewsProps {
  reviews: Review[];
}

const Reviews: React.FC<ReviewsProps> = ({ reviews }) => {
  const [visibleReviews, setVisibleReviews] = useState<number>(5);

  const loadMoreReviews = () => setVisibleReviews(visibleReviews + 5);

  return (
    <div className="mt-8 mx-auto w-[80%]">
      <h3 className="text-lg font-semibold">All Reviews ({reviews.length})</h3>
      {/* Wrap the entire review list in a single grid container */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4  p-4">
        {reviews.slice(0, visibleReviews).map((review) => (
          <div key={review.id} className="p-4 border  shadow bg-white">
            <p className="font-bold">
              {review.reviewerName} - {review.rating}⭐
            </p>
            <p className="text-lg font-normal text-black line-clamp-2">
              {review.comment}
            </p>
          </div>
        ))}
      </div>
      {visibleReviews < reviews.length && (
        <div className="flex justify-center ">
          <button
            onClick={loadMoreReviews}
            className="mt-4 px-6 py-2 self-center bg-black hover:bg-gray-900 text-white rounded"
          >
            Load More Reviews
          </button>
        </div>
      )}
    </div>
  );
};

// RecommendedProducts Component
const RecommendedProducts: React.FC = () => (
  <div className="mt-8 flex flex-col">
    <h3 className="text-2xl font-semibold self-center">You might also like</h3>
    <Products products={products} />
  </div>
);

export default ProductPage;
