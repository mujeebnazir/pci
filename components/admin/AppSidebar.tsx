"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../ui/sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconTruckDelivery,
  IconFilePlus,
  IconEdit,
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function AppSidebar({ children }: any) {
  const links = [
    {
      label: "Dashboard",
      href: "/admin-dashboard",
      icon: (
        <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Create Product",
      href: "/admin-dashboard/create-product",
      icon: (
        <IconFilePlus className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Update Product",
      href: "/admin-dashboard/update-product",
      icon: (
        <IconEdit className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "View Orders",
      href: "/admin-dashboard/orders",
      icon: (
        <IconTruckDelivery className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Logout",
      href: "#",
      icon: (
        <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];
  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1  border border-neutral-200 dark:border-neutral-700 overflow-hidden",
        "h-[100vh]" // for your use case, use `h-screen` instead of `h-[60vh]`
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: "profile",
                href: "#",
                icon: (
                  <Image
                    src="https://dummyimage.com/100"
                    className="h-7 w-7 flex-shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      <Dashboard>{children}</Dashboard>
    </div>
  );
}
export const Logo = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre"
      >
        Pahalgam Cottage Industries
      </motion.span>
    </Link>
  );
};
export const LogoIcon = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </Link>
  );
};

// Dummy dashboard component with content
const Dashboard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-1 h-screen  ">
  <div className="p-2  h-screen md:p-4 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full">
    {/* <div className="flex gap-2">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={"first-array" + index}
          className="h-16 w-full rounded-lg bg-gray-100 dark:bg-neutral-800 animate-pulse"
        ></div>
      ))}
    </div> */}
    <div className="flex gap-2 flex-1 h-full overflow-y-auto">
      {Array.from({ length: 1 }).map((_, index) => (
        <div
          key={"second-array" + index}
          className="w-full rounded-lg bg-gray-100 dark:bg-neutral-800 animate-pulse h-full"
        >
          <div className="h-full">{children}</div>
        </div>
      ))}
    </div>
  </div>
</div>
  );
};
