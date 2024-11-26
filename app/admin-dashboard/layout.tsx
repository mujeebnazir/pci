
"use client";

import React from "react";
import { AppSidebar } from "@/components/admin/AppSidebar";
import ProtectedRoute from "@/providers/ProtectedRoute";



export default function AdminLayout({ children } : Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <div className="flex h-screen ">
      <ProtectedRoute>
      <AppSidebar>
        {children}
      </AppSidebar>
      </ProtectedRoute>
   
    </div>
  );
}
