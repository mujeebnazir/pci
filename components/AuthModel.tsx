"use client";

import Model from "./Model";
import { useRouter } from "next/navigation";

import useAuthModel from "@/hooks/useAuthModel";
import { useEffect, useState } from "react";
import useAuthStore from "@/zustand/authStore";
import toast from "react-hot-toast";
import Image from "next/image";
import Link from "next/link";

const AuthModel = () => {
  const router = useRouter();
  const { session, signIn, signUp } = useAuthStore();
  const { onClose, isOpen } = useAuthModel();
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  useEffect(() => {
    if (session) {
      router.refresh();
      onClose();
    }
  }, [session, router, onClose]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Start loading
    setError(""); // Clear previous errors

    try {
      const success = await signIn(email, password);
      if (success) {
        toast.success("Login successful");
        router.push("/");
      } else {
        toast.error("Login failed. Please check your credentials.");
      }
    } catch (error: any) {
      setError(error?.message || "An unexpected error occurred");
      toast.error("Internal service error");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Start loading
    setError(""); // Clear previous errors

    try {
      const success = await signUp(email, password);
      if (success) {
        toast.success("Signup successful");
        router.push("/");
      } else {
        toast.error("Signup failed. Please check your credentials.");
      }
    } catch (error: any) {
      setError(error?.message || "An unexpected error occurred");
      toast.error("Internal service error");
    } finally {
      setLoading(false); // Stop loading
    }
  };
  return (
    <>
      <Model
        title={isLoginForm ? "Welcome Back!" : "Welcome!"}
        discription={
          isLoginForm ? "Login to your account" : "Create an account"
        }
        onChange={onChange}
        isOpen={isOpen}
      >
        <form
          onSubmit={isLoginForm ? handleSignIn : handleSignUp}
          className="w-full max-w-md bg-white py-4"
        >
          <div className="flex items-center justify-center mb-4">
            <Link href="/">
              <Image
                src="/logo.svg"
                alt="logo"
                width={100}
                height={100}
                className="scale-150 hover:scale-160 transition cursor-pointer"
              />
            </Link>
          </div>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-700 focus:outline-none focus:ring-2  focus:ring-opacity-50 disabled:opacity-50"
            disabled={loading}
          >
            {isLoginForm
              ? loading
                ? "Logging in..."
                : "Sign In"
              : loading
              ? "Signing up..."
              : "Sign Up"}
          </button>
          <div className="mt-4 self-center">
            {isLoginForm ? (
              <p>
                Don't have an account?{" "}
                <span
                  className="text-blue-600 ml-1 cursor-pointer"
                  onClick={() => setIsLoginForm(!isLoginForm)}
                >
                  Sign Up
                </span>
              </p>
            ) : (
              <p>
                Already have an account?
                <span
                  className="text-blue-600 ml-1 cursor-pointer"
                  onClick={() => setIsLoginForm(!isLoginForm)}
                >
                  Sign In
                </span>
              </p>
            )}
          </div>
        </form>
      </Model>
    </>
  );
};

export default AuthModel;
