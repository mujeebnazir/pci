"use client";
import React, { useEffect, useState } from "react";
import { MdShoppingCart } from "react-icons/md";
import { CgMenu } from "react-icons/cg";
import { IoMdClose } from "react-icons/io";
import { useRouter } from 'next-nprogress-bar';
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
    <div className="fixed top-0 w-full flex flex-col bg-white items-center mx-auto pt-2 shadow shadow-stone-300 z-[100]">
      <div className="container px-4 flex flex-col md:flex-row items-center justify-between w-full pb-2 space-y-4 md:space-y-0">
        {/* Left Section: Logo and Menu Icon */}
        <div className="flex items-center w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center">
            <div
              className="lg:hidden flex items-center mr-4 text-black"
              onClick={toggleSidebar}
            >
              <CgMenu
                size={28}
                color="black"
                className="cursor-pointer hover:scale-110 transition-transform"
              />
            </div>
            <Link href="/" className="flex items-center justify-center">
              <Image
                src="/logo.svg"
                alt="logo"
                width={80}
                height={80}
                className="h-[50px] w-auto md:h-auto md:w-auto cursor-pointer mt-3"
                priority
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
        <div className="w-full px-0 md:px-4 md:w-auto md:flex-1 md:max-w-xl">
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

      {/* Modernized Sidebar for Mobile View */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            {/* Backdrop with blur effect */}
            <motion.div
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[150]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleSidebar}
            />

            {/* Sidebar Panel */}
            <motion.div
              className="fixed top-0 left-0 w-[85%] max-w-[400px] h-full bg-white shadow-2xl z-[200]"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{
                type: "spring",
                damping: 25,
                stiffness: 300,
              }}
            >
              <div className="flex flex-col h-full">
                {/* Header Section */}
                <div className="relative p-6 border-b border-gray-100">
                  <button
                    onClick={toggleSidebar}
                    className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 transition-colors"
                    aria-label="Close menu"
                  >
                    <IoMdClose size={24} className="text-gray-600" />
                  </button>

                  <Link
                    href="/"
                    className="flex justify-center"
                    onClick={toggleSidebar}
                  >
                    <Image
                      src="/logo.svg"
                      alt="logo"
                      width={120}
                      height={120}
                      className="w-auto h-auto"
                      priority
                    />
                  </Link>
                </div>

                {/* Navigation Section */}
                <div className="flex-1 overflow-y-auto py-6 px-4">
                  <nav className="space-y-2">
                    <Navbar />
                  </nav>
                </div>

                {/* Footer Section */}
                <div className="p-6 border-t border-gray-100">
                  <div className="flex items-center justify-center space-x-4">
                    <UserProfile />
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Header;
