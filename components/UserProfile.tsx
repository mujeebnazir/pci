"use client";
import React, { useEffect, useState } from "react";
import { GoGear, GoPerson, GoSignIn, GoSignOut } from "react-icons/go";
import useAuthStore from "@/zustand/authStore";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { BsPersonCircle } from "react-icons/bs";
import Link from "next/link";
import useAuthModel from "@/hooks/useAuthModel";

const UserProfile = () => {
  const router = useRouter();
  const authModel = useAuthModel();
  const { isLoggedIn, logout, checkUserStatus } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);
 
  useEffect(() => {
    checkUserStatus(); 
  }, []);

  const handleLogout = async () => {
    const success = await logout();
    if (success) {
      toast.success("Logout successful");
      router.push("/");
    } else {
      toast.error("Logout failed. Please try again.");
    }
  };

  return isLoggedIn ? (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button type="button">
        <BsPersonCircle
          size={30}
          className="shadow rounded-full hover:shadow-md transition cursor-pointer scale-100 hover:scale-110 md:w-6 md:h-6 w-7 h-7"
          color="black"
        />
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute right-0 top-8 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-36 md:w-44 dark:bg-gray-700">
          <ul className="py-2 text-xs md:text-sm text-gray-700 dark:text-gray-200">
            <li>
              <Link
                href="/profile"
                className="flex flex-row items-center space-x-4 md:space-x-6 px-3 md:px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <GoPerson size={16} className="md:w-5 md:h-5 w-4 h-4" />
                Profile
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="flex items-center flex-row space-x-4 md:space-x-6 px-3 md:px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <GoGear size={16} className="md:w-5 md:h-5 w-4 h-4" />
                Settings
              </Link>
            </li>
            <li className="flex items-center justify-center">
              <button
                onClick={handleLogout}
                className="flex flex-row space-x-4 md:space-x-6 bg-black items-center text-white rounded shadow px-3 md:px-4 py-2 hover:bg-gray-700 dark:hover:bg-gray-600 dark:hover:text-white text-xs md:text-sm"
              >
                <GoSignOut size={16} className="md:w-5 md:h-5 w-4 h-4" />
                Sign Out
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  ) : (
    <button
      onClick={() => authModel.onOpen()}
      className="flex flex-row space-x-1 md:space-x-2 scale-100 hover:scale-103 bg-black items-center text-white rounded shadow px-2 md:px-3 py-1.5 md:py-2 hover:bg-gray-700 dark:hover:bg-gray-600 dark:hover:text-white"
    >
      <GoSignIn size={16} className="md:w-5 md:h-5 w-4 h-4" />
      <span className="font-normal text-xs md:text-sm text-white">Sign In</span>
    </button>
  );
};

export default UserProfile;
