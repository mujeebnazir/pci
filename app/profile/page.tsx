import React from "react";
import Profile from "./components/Profile";
import Order from "./components/order";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VscAccount, VscGift } from "react-icons/vsc";

const Page = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-16 sm:mt-20">
        <Tabs defaultValue="account" className="w-full space-y-8 ">
          <TabsList className="flex w-full justify-between max-w-lg mx-auto rounded-xl  shadow-lg p-2 space-x-4 ">
            <TabsTrigger 
              value="account" 
              className="flex-1 flex items-center justify-center gap-3 px-7  text-base font-medium rounded-lg hover:bg-gray-50 transition-colors "
            >
              <VscAccount className="h-6 w-6" />
              <span className="hidden sm:inline">Personal Information</span>
              <span className="sm:hidden">Profile</span>
            </TabsTrigger>
            <TabsTrigger 
              value="orders"
              className="flex-1 flex items-center justify-center gap-3 px-6  text-base font-medium rounded-lg hover:bg-gray-50 transition-colors"
            >
              <VscGift className="h-6 w-6" />
              <span>My Orders</span>
            </TabsTrigger>
          </TabsList>

          <div className="mt-8 bg-white rounded-xl shadow-lg">
            <TabsContent
              value="account"
              className="p-6 sm:p-8 lg:p-10"
            >
              <Profile />
            </TabsContent>
            <TabsContent 
              value="orders"
              className="p-6 sm:p-8 lg:p-10"
            >
              <Order />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default Page;
