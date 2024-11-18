import { i } from "framer-motion/client";
import { FaCreditCard, FaHeadset } from "react-icons/fa";
import { FaArrowRotateLeft, FaTruckFast } from "react-icons/fa6";

const products = [
  {
    id: "1",
    name: "Wireless Bluetooth Headphones",
    description:
      "High-quality wireless headphones with noise cancellation and 30 hours of playtime.",
    image: "https://via.placeholder.com/150",
    price: 120,
    discountedPrice: 90,
    rating: 4.5,
    isOnSale: true,
    category: "Electronics",
    subcategory: "Audio",
  },
  {
    id: "2",
    name: "Smart LED TV",
    description:
      "A 55-inch 4K Ultra HD Smart LED TV with HDR and voice control.",
    image: "https://via.placeholder.com/150",
    price: 600,
    discountedPrice: 500,
    rating: 4.8,
    isOnSale: true,
    category: "Electronics",
    subcategory: "Televisions",
  },
  {
    id: "3",
    name: "Running Shoes",
    description:
      "Lightweight running shoes with cushioned support for comfortable runs.",
    image: "https://via.placeholder.com/150",
    price: 80,
    discountedPrice: 60,
    rating: 4.2,
    isOnSale: true,
    category: "Fashion",
    subcategory: "Footwear",
  },
  {
    id: "4",
    name: "Stainless Steel Water Bottle",
    description:
      "Eco-friendly, reusable stainless steel water bottle with vacuum insulation.",
    image: "https://via.placeholder.com/150",
    price: 25,
    discountedPrice: 20,
    rating: 4.7,
    isOnSale: false,
    category: "Home & Kitchen",
    subcategory: "Drinkware",
  },
  {
    id: "5",
    name: "Electric Kettle",
    description:
      "1.7L electric kettle with fast boiling and auto shut-off feature.",
    image: "https://via.placeholder.com/150",
    price: 35,
    discountedPrice: 28,
    rating: 4.6,
    isOnSale: true,
    category: "Home & Kitchen",
    subcategory: "Appliances",
  },
  {
    id: "6",
    name: "Gaming Mouse",
    description:
      "High-precision gaming mouse with RGB lighting and programmable buttons.",
    image: "https://via.placeholder.com/150",
    price: 50,
    discountedPrice: 45,
    rating: 4.4,
    isOnSale: false,
    category: "Electronics",
    subcategory: "Computer Accessories",
  },
  {
    id: "7",
    name: "Cotton T-Shirt",
    description:
      "100% cotton, soft and comfortable T-shirt, available in various colors.",
    image: "https://via.placeholder.com/150",
    price: 20,
    discountedPrice: 15,
    rating: 4.3,
    isOnSale: true,
    category: "Fashion",
    subcategory: "Apparel",
  },
  {
    id: "8",
    name: "Yoga Mat",
    description:
      "Non-slip, extra-thick yoga mat for comfortable and safe workouts.",
    image: "https://via.placeholder.com/150",
    price: 40,
    discountedPrice: 35,
    rating: 4.6,
    isOnSale: false,
    category: "Sports & Outdoors",
    subcategory: "Fitness Equipment",
  },
  {
    id: "9",
    name: "Portable Power Bank",
    description:
      "10,000mAh portable power bank with dual USB output for fast charging.",
    image: "https://via.placeholder.com/150",
    price: 30,
    discountedPrice: 25,
    rating: 4.5,
    isOnSale: true,
    category: "Electronics",
    subcategory: "Mobile Accessories",
  },
  {
    id: "10",
    name: "Leather Wallet",
    description:
      "Premium leather wallet with RFID blocking and multiple card slots.",
    image: "https://via.placeholder.com/150",
    price: 45,
    discountedPrice: 40,
    rating: 4.7,
    isOnSale: false,
    category: "Fashion",
    subcategory: "Accessories",
  },
  {
    id: "11",
    name: "Smartphone Tripod",
    description:
      "Portable and lightweight tripod stand for smartphones, perfect for photography.",
    image: "https://via.placeholder.com/150",
    price: 25,
    discountedPrice: 20,
    rating: 4.2,
    isOnSale: true,
    category: "Electronics",
    subcategory: "Accessories",
  },
  {
    id: "12",
    name: "Wireless Charger",
    description:
      "Fast-charging wireless charger compatible with most modern smartphones.",
    image: "https://via.placeholder.com/150",
    price: 30,
    discountedPrice: 25,
    rating: 4.5,
    isOnSale: false,
    category: "Electronics",
    subcategory: "Chargers",
  },
  {
    id: "13",
    name: "Noise-Canceling Earbuds",
    description:
      "Comfortable earbuds with active noise cancellation and superior sound quality.",
    image: "https://via.placeholder.com/150",
    price: 150,
    discountedPrice: 120,
    rating: 4.6,
    isOnSale: true,
    category: "Electronics",
    subcategory: "Audio",
  },
  {
    id: "14",
    name: "Eco-Friendly Notebook",
    description:
      "Sustainable, eco-friendly notebook made from recycled materials.",
    image: "https://via.placeholder.com/150",
    price: 10,
    discountedPrice: 8,
    rating: 4.8,
    isOnSale: true,
    category: "Stationery",
    subcategory: "Notebooks",
  },
  {
    id: "15",
    name: "Desk Organizer",
    description:
      "Multi-functional desk organizer with compartments for easy storage.",
    image: "https://via.placeholder.com/150",
    price: 20,
    discountedPrice: 18,
    rating: 4.4,
    isOnSale: false,
    category: "Office Supplies",
    subcategory: "Organizers",
  },
  {
    id: "16",
    name: "LED Desk Lamp",
    description:
      "Adjustable LED desk lamp with multiple brightness levels and USB charging.",
    image: "https://via.placeholder.com/150",
    price: 35,
    discountedPrice: 30,
    rating: 4.7,
    isOnSale: true,
    category: "Home & Kitchen",
    subcategory: "Lighting",
  },
  {
    id: "17",
    name: "Electric Toothbrush",
    description:
      "Rechargeable electric toothbrush with multiple brushing modes.",
    image: "https://via.placeholder.com/150",
    price: 50,
    discountedPrice: 45,
    rating: 4.5,
    isOnSale: false,
    category: "Health & Personal Care",
    subcategory: "Oral Care",
  },
  {
    id: "18",
    name: "Waterproof Backpack",
    description:
      "Durable, waterproof backpack with multiple compartments for organization.",
    image: "https://via.placeholder.com/150",
    price: 70,
    discountedPrice: 60,
    rating: 4.6,
    isOnSale: true,
    category: "Fashion",
    subcategory: "Bags",
  },
  {
    id: "19",
    name: "Ceramic Coffee Mug",
    description:
      "Microwave-safe ceramic mug with a stylish design, perfect for coffee lovers.",
    image: "https://via.placeholder.com/150",
    price: 15,
    discountedPrice: 12,
    rating: 4.7,
    isOnSale: false,
    category: "Home & Kitchen",
    subcategory: "Drinkware",
  },
  {
    id: "20",
    name: "Electric Skillet",
    description:
      "12-inch electric skillet with non-stick surface and temperature control.",
    image: "https://via.placeholder.com/150",
    price: 60,
    discountedPrice: 50,
    rating: 4.4,
    isOnSale: true,
    category: "Home & Kitchen",
    subcategory: "Appliances",
  },
];

const features = [
  {
    title: "Free Shipping",
    description: "Get free shipping on all orders over $50.",
    icon: <FaTruckFast size={28} />,
  },
  {
    title: "Easy Returns",
    description: "Easy and hassle-free returns on all orders.",
    icon: <FaArrowRotateLeft size={28} />,
  },
  {
    title: "24/7 Support",
    description: "We're available 24/7 to help with any questions or concerns.",
    icon: <FaHeadset size={28} />,
  },
  {
    title: "Secure Payments",
    description: "Your payment information is secure and encrypted.",
    icon: <FaCreditCard size={28} />,
  },
];

const categories = [
  {
    name: "Under 100 USD",
    link: "/category/under-100-usd",
  },
  {
    name: "Home",
    link: "/category/home",
  },
  {
    name: "New Arrivals",
    link: "/category/new-arrivals",
  },
  {
    name: "Shawls",
    link: "/category/shawls",
  },
  {
    name: "Other Accessories",
    link: "/category/accessories",
  },
  {
    name: "Kurtis",
    link: "/category/kurtis",
  },
  {
    name: "Sarees",
    link: "/category/sarees",
  },
  {
    name: "Luxury Items",
    link: "/category/luxury",
  },
  {
    name: "About Us",
    link: "/about",
  },
  {
    name: "Contact Us",
    link: "/contact",
  },
];
export { products, features, categories };
