"use client";
import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import ProductDetailsKashmiri from "./ProductDetails";

enum Size {
  L = "L",
  M = "M",
  SM = "SM",
  XL = "XL",
  XXL = "XXL",
}
interface Product {
  id?: string;
  name: string;
  description: string;
  price: number;
  sizesAvailable: Size[];
  itemsCount: number;
  category?: string;
  images?: string[];
  createdAt?: string;
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
    <div className=" mx-auto px-4 sm:px-6 lg:px-8   h-screen overflow-hidden ">
      <div className="flex flex-col lg:flex-row space-x-6 py-8  h-full">
        <div className="w-full lg:w-[45%] h-full  p-4">
          <ProductGallery images={product?.images || []} />
        </div>

        <div className="w-full lg:w-1/2  p-4 overflow-y-auto h-full  hide-scrollbar">
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
    <div className="flex flex-row  justify-center space-x-3  w-full  h-[100vh] sticky">
      <div className="flex flex-col my-12">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={img}
            onClick={() => setSelectedImage(index)}
            className={`w-20 h-20 cursor-pointer ${
              index === selectedImage ? "border-2 border-blue-500" : "border"
            }`}
          />
        ))}
      </div>
      <div className="my-12">
        <img
          src={images[selectedImage]}
          alt={images[selectedImage]}
          className="w-[30vw] h-[80vh] border border-gray-300 rounded-md shadow-md"
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
  const [select, setSelect] = useState<string>(product.sizesAvailable[0]);

  return (
    <div className="flex flex-col space-y-2 pt-10 w-full overflow-auto ">
      <h2 className="text-3xl font-semibold">{product.name}</h2>
      <div className="flex items-center text-black">
        <FaStar className="mr-1" color="#FFC107" /> 4.5/
        <span className="text-gray-500">5</span>
      </div>
      <p className="text-2xl font-semibold text-black">
        ₹{(product.price - (product.price * 10) / 100).toFixed(2)}{" "}
        <span className="line-through text-gray-500">₹{product.price}</span>
        <span className="ml-2 px-1 text-sm bg-orange-900 text-orange-900 text-opacity-100 bg-opacity-10 rounded-lg">
          -10% {/* Display fixed 10% discount */}
        </span>
      </p>
      <p className="text-lg font-normal text-gray-600 text-wrap break-words line-clamp-2 active:line-clamp-none  overflow-hidden ">
        {product.description}
      </p>
      <hr className="" />

      <div className="flex flex-col space-y-2">
        <span className="font-normal text-sm text-black">Size</span>
        <div className="flex flex-row space-x-2">
          {product.sizesAvailable.map((size, index) => (
            <div
              onClick={() => setSelect(size)}
              key={index}
              className={`w-20 h-9 border flex justify-center items-center ${
                select === size ? "bg-black text-white" : ""
              }`}
            >
              {size}
            </div>
          ))}
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
      <Tabs />
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
// const RecommendedProducts: React.FC = () => (
//   <div className="mt-8 flex flex-col">
//     <h3 className="text-2xl font-semibold self-center">You might also like</h3>
//     <Products products={products} />
//   </div>
// );

export default ProductPage;
