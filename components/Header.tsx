"use client";
import React, { use, useEffect, useState } from "react";
import { MdShoppingCart } from "react-icons/md";
import { CgMenu } from "react-icons/cg";
import { useRouter } from "next/navigation";
import { useCartStore } from "../zustand/cart";
import SearchBar from "./SearchBar";
import Navbar from "./Navbar";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import UserProfile from "./UserProfile";
import useAuthModel from "@/hooks/useAuthModel";
import useAuthStore from "@/zustand/authStore";
import toast from "react-hot-toast";

const Header: React.FC = () => {
  const router = useRouter();
  const authModel = useAuthModel();
  const { session } = useAuthStore();
  const itemsCount = useCartStore((state) => state.itemsCount);
  const [showNavbar, setShowNavbar] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setShowNavbar(false); // scrolling down
      } else {
        setShowNavbar(true); // scrolling up
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleCartClick = async () => {
    if (!session) {
      toast.error("Please login first!");
      return authModel.onOpen();
    }

    router.push("/cart");
  };
  return (
    <div className="fixed top-0 w-full flex flex-col bg-white items-center mx-auto pt-2 shadow shadow-stone-300 z-1000">
      <div className="container px-4 flex flex-col md:flex-row items-center justify-between w-full pb-2 space-y-4 md:space-y-0">
        {/* Left Section: Logo and Menu Icon */}
        <div className="flex items-center w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center">
            <div
              className="lg:hidden flex items-center mr-4 text-black"
              onClick={toggleSidebar}
            >
              <CgMenu size={28} color="black" className="cursor-pointer" />
            </div>
            <Link href="/" className="flex items-center justify-center ">
              <Image
                src="/logo.svg"
                alt="logo"
                width={100}
                height={100}
                className="scale-125 md:scale-150 hover:scale-[1.35] md:hover:scale-160 transition cursor-pointer"
              />
            </Link>
          </div>
          
          {/* Mobile Icons */}
          <div className="flex md:hidden items-center space-x-4">
            <div className="relative cursor-pointer" onClick={handleCartClick}>
              <MdShoppingCart
                size={30}
                className="transition scale-100 hover:scale-110 cursor-pointer"
                color="black"
              />
              {itemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-semibold border-2 border-white">
                  {itemsCount}
                </span>
              )}
            </div>
            <UserProfile />
          </div>
        </div>

        {/* Center Section: Search Bar */}
        <div className="w-full md:w-auto md:flex-1 md:max-w-xl px-4">
          <SearchBar />
        </div>

        {/* Desktop Icons */}
        <div className="hidden md:flex items-center space-x-6">
          <div className="relative cursor-pointer" onClick={handleCartClick}>
            <MdShoppingCart
              size={30}
              className="transition scale-100 hover:scale-110 cursor-pointer"
              color="black"
            />
            {itemsCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-black text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-semibold border-2 border-white">
                {itemsCount}
              </span>
            )}
          </div>
          <UserProfile />
        </div>
      </div>

      {/* Navbar Component - Only visible on large screens and when scrolling up */}
      <AnimatePresence>
        {showNavbar && (
          <motion.div
            className="hidden lg:block w-full border-t border-gray-100"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container mx-auto py-2">
              <Navbar />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar for Mobile View */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleSidebar}
          >
            <motion.div
              className="fixed top-0 left-0 w-3/4 h-full bg-white p-6 shadow-lg z-50"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Navbar />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Header;
