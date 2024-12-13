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
    <div className="fixed top-0   w-full flex flex-col  bg-white items-center mx-auto pt-2 shadow shadow-stone-300">
      <div className="flex flex-row items-center justify-between w-full mx-auto pb-2">
        {/* Left Section: Logo and Menu Icon */}
        <div className="flex items-center ml-4 md:ml-20">
          <div
            className="lg:hidden flex items-center mr-4 text-black"
            onClick={toggleSidebar}
          >
            <CgMenu size={28} color="black" className="cursor-pointer mr-4" />
          </div>
          <Link href="/">
            <Image
              src="/logo.svg"
              alt="logo"
              width={100}
              height={100}
              className="h-auto w-auto scale-100 hover:scale-105 transition cursor-pointer"
              priority
            />
          </Link>
        </div>

        {/* Center Section: Search Bar */}
        <div className="hidden lg:block w-[35%] ">
          <SearchBar />
        </div>

        {/* Right Section: Icons */}
        <div className="flex items-center space-x-4 mr-4 md:mr-20 cu">
          <div className="relative cursor-pointer" onClick={handleCartClick}>
            <MdShoppingCart
              size={30}
              className="transition scale-100 hover:scale-110 mr-4 cursor-pointer"
              color="black"
            />
            {itemsCount > 0 && (
              <span className="absolute top-0 right-0 -translate-x-[1/2] -translate-y-1/2 bg-black text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-semibold border-2 border-white">
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
            className="hidden lg:block mb-2"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Navbar />
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
              onClick={(e) => e.stopPropagation()} // Prevents click events from closing sidebar
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
