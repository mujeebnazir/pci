
"use client";

import React from "react";
import { AppSidebar } from "@/components/admin/AppSidebar";


export default function AdminLayout({ children } : Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <div className="flex h-screen ">
      <AppSidebar>
        {children}
      </AppSidebar>
    </div>
  );
}
