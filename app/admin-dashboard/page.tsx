"use client";
import { AdminInsightsPieChart } from "@/components/admin/charts/PieChart";
import { ProductChart } from "@/components/admin/charts/ProductChart";
import React from "react";
import {
  IconUsers,
  IconShoppingCart,
  IconTruck,
  IconCash,
} from "@tabler/icons-react";
import OrderService from "@/lib/orders";
const DashboardCard = ({ title, value, icon: Icon, color }: any) => (
  <div className="p-4 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 flex items-center justify-between">
    <div>
      <p className="text-xs text-neutral-600 dark:text-neutral-400">{title}</p>
      <p className="text-xl font-semibold mt-1">{value}</p>
    </div>
    <div className={`p-3 rounded-full ${color}`}>
      <Icon className="w-5 h-5" />
    </div>
  </div>
);

const Page = () => {
  const [adminData, setAdminData] = React.useState({
    cancelledOrders: 0,
    deliveredOrders: 0,
    onTheWayOrders: 0,
    pendingOrders: 0,
    processingOrders: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalRevenue: 0,
  });
  const [productData, setProductData] = React.useState({
    Mens: {
      totalProducts: 0,
      totalQuantity: 0,
      totalRevenue: 0,
    },
    Women: {
      totalProducts: 0,
      totalQuantity: 0,
      totalRevenue: 0,
    },
    Coats: {
      totalProducts: 0,
      totalQuantity: 0,
      totalRevenue: 0,
    },
    Shawls: {
      totalProducts: 0,
      totalQuantity: 0,
      totalRevenue: 0,
    },
  });

  React.useEffect(() => {
    const getAdminInsights = async () => {
      try {
        const response = await OrderService.getAdminInsights();
        const res = await OrderService.getAdminProductInsights();
        if (res) {
          setProductData({
            Mens: {
              totalProducts: res.Mens.totalProducts || 0,
              totalQuantity: res.Mens.totalQuantity || 0,
              totalRevenue: res.Mens.totalRevenue || 0,
            },
            Women: {
              totalProducts: res.Women.totalProducts || 0,
              totalQuantity: res.Women.totalQuantity || 0,
              totalRevenue: res.Women.totalRevenue || 0,
            },
            Coats: {
              totalProducts: res.Coats.totalProducts || 0,
              totalQuantity: res.Coats.totalQuantity || 0,
              totalRevenue: res.Coats.totalRevenue || 0,
            },
            Shawls: {
              totalProducts: res.Shawls.totalProducts || 0,
              totalQuantity: res.Shawls.totalQuantity || 0,
              totalRevenue: res.Shawls.totalRevenue || 0,
            },
          });
        }
        console.log("Admin insights data:", res);
        // Ensure the response is defined and has the necessary properties
        if (response) {
          // console.log("Admin insights data:", response);
          setAdminData({
            cancelledOrders: response.cancelledOrders || 0,
            deliveredOrders: response.deliveredOrders || 0,
            onTheWayOrders: response.onTheWayOrders || 0,
            pendingOrders: response.pendingOrders || 0,
            processingOrders: response.processingOrders || 0,
            totalOrders: response.totalOrders || 0,
            totalUsers: response.totalUsers || 0,
            totalRevenue: response.totalRevenue || 0,
          });
        } else {
          console.warn("Received undefined response");
        }
      } catch (error) {
        console.error("Error fetching admin insights:", error);
      }
    };
    getAdminInsights();
  }, []);
  return (
    <div className="flex flex-1">
      <div className="p-4 md:p-6 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 flex flex-col gap-6 flex-1 w-full h-full">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl md:text-3xl font-bold">Dashboard Overview</h1>
          <p className="text-neutral-600 dark:text-neutral-400">
            Welcome back, Admin
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <DashboardCard
            title="Total Users"
            value={adminData.totalUsers}
            icon={IconUsers}
            color="bg-blue-100 dark:bg-blue-900/30"
          />
          <DashboardCard
            title="Total Orders"
            value={adminData.totalOrders}
            icon={IconShoppingCart}
            color="bg-green-100 dark:bg-green-900/30"
          />
          <DashboardCard
            title="Pending Deliveries"
            value={adminData.pendingOrders}
            icon={IconTruck}
            color="bg-yellow-100 dark:bg-yellow-900/30"
          />
          <DashboardCard
            title="Total Revenue"
            value={adminData.totalRevenue}
            icon={IconCash}
            color="bg-purple-100 dark:bg-purple-900/30"
          />
          <DashboardCard
            title="Cancelled Orders"
            value={adminData.cancelledOrders}
            icon={IconShoppingCart}
            color="bg-red-100 dark:bg-red-900/30"
          />
          <DashboardCard
            title="On The Way Orders"
            value={adminData.onTheWayOrders}
            icon={IconTruck}
            color="bg-yellow-100 dark:bg-yellow-900/30"
          />
          <DashboardCard
            title="Processing Orders"
            value={adminData.processingOrders}
            icon={IconTruck}
            color="bg-yellow-100 dark:bg-yellow-900/30"
          />
          <DashboardCard
            title="Delivered Orders"
            value={adminData.deliveredOrders}
            icon={IconTruck}
            color="bg-yellow-100 dark:bg-yellow-900/30"
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-2">
          <div className="p-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800">
            <h2 className="text-lg font-semibold mb-2">Admin Analysis</h2>
            <AdminInsightsPieChart data={adminData as any} />
          </div>
          <div className="p-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800">
            <h2 className="text-lg font-semibold mb-2">Product Analysis</h2>
            {/* <AdminInsightsPieChart data={adminData as any} /> */}
            <ProductChart data={productData as any} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
