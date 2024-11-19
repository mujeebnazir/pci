import React, { useEffect, useState } from "react";
import Profile from "./components/Profile";
import Order from "./components/order";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VscAccount, VscGift } from "react-icons/vsc";
import useAuthStore from "@/zustand/authStore";

const Page = () => {
  const authStore = useAuthStore();
  const [userInfo, setUserInfo] = useState<object | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const user = await authStore.checkUserStatus();
      setUserInfo(user);
    };

    fetchUserInfo();
  }, [authStore]);

  return (
    <div className="m-10 w-[80%] h-[95%] pt-10 mt-20 flex items-center justify-center">
      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="account">
            Personal Info
            <VscAccount size={20} className="self-center mx-2" />
          </TabsTrigger>
          <TabsTrigger value="password">
            My Orders <VscGift size={20} className="self-center mx-2" />
          </TabsTrigger>
        </TabsList>
        <TabsContent
          value="account"
          className="w-full flex items-center justify-center py-5"
        >
          <Profile userInfo={userInfo} />
        </TabsContent>
        <TabsContent value="password">
          <Order />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Page;
