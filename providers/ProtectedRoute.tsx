"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AuthService from "@/lib/auth";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false); // Tracks if the user is an admin
  const [loading, setLoading] = useState(true);  // Tracks loading state

  useEffect(() => {
    const getUser = async () => {
      try {
        const user = await AuthService.getCurrentUser();
        const isAdminUser = user?.label.includes("admin");
        setIsAdmin(isAdminUser ?? false);

        if (!isAdminUser) {
          router.push("/");
          return; // Avoid executing further logic
        }
      } catch (error: any) {
        console.error("Error fetching user data:", error.message);
        router.push("/"); // Redirect on error
      } finally {
        setLoading(false); // Loading is complete
      }
    };

    getUser();
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return isAdmin ? children : null; // Render children if user is an admin
};

export default ProtectedRoute;
