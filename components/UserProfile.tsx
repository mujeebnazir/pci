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
    checkUserStatus(); // Fetch user status on component mount
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
          size={26}
          className="shadow rounded-full hover:shadow-md transition cursor-pointer scale-100 hover:scale-110"
          color="black"
        />
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute right-0 top-8 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
            <li>
              <Link
                href="#"
                className="flex flex-row items-center space-x-6 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <GoPerson size={20} />
                Profile
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="flex items-center flex-row space-x-6 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <GoGear size={20} />
                Settings
              </Link>
            </li>
            <li className="flex items-center justify-center">
              <button
                onClick={handleLogout}
                className="flex flex-row space-x-6 bg-black items-center text-white rounded shadow px-4 py-2 hover:bg-gray-700 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <GoSignOut size={20} />
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
      className="flex flex-row space-x-2 scale-100 hover:scale-103 bg-black items-center text-white rounded shadow px-3 py-2 hover:bg-gray-700 dark:hover:bg-gray-600 dark:hover:text-white"
    >
      <GoSignIn size={20} />
      <span className="font-normal text-sm text-white">Sign In</span>
    </button>
  );
};

export default UserProfile;
