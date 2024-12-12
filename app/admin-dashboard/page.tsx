"use client";
import { PieChartForAdmin } from '@/components/admin/charts/PieChart'
import React from 'react'
import { IconUsers, IconShoppingCart, IconTruck, IconCash } from '@tabler/icons-react'

const DashboardCard = ({ title, value, icon: Icon, color } :any) => (
  <div className={`p-6 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 flex items-center justify-between`}>
    <div>
      <p className="text-sm text-neutral-600 dark:text-neutral-400">{title}</p>
      <p className="text-2xl font-bold mt-1">{value}</p>
    </div>
    <div className={`p-4 rounded-full ${color}`}>
      <Icon className="w-6 h-6" />
    </div>
  </div>
)

const Page = () => {
  return (
    <div className="flex flex-1">
      <div className="p-4 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 flex flex-col gap-6 flex-1 w-full h-full">
        
        {/* Header */}
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl md:text-3xl font-bold">Dashboard Overview</h1>
          <p className="text-neutral-600 dark:text-neutral-400">Welcome back, Admin</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <DashboardCard 
            title="Total Users"
            value="1,234"
            icon={IconUsers}
            color="bg-blue-100 dark:bg-blue-900/30"
          />
          <DashboardCard
            title="Total Orders"
            value="856"
            icon={IconShoppingCart}
            color="bg-green-100 dark:bg-green-900/30"
          />
          <DashboardCard
            title="Pending Deliveries"
            value="43"
            icon={IconTruck}
            color="bg-yellow-100 dark:bg-yellow-900/30"
          />
          <DashboardCard
            title="Total Revenue"
            value="₹89,645"
            icon={IconCash}
            color="bg-purple-100 dark:bg-purple-900/30"
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
          <div className="p-6 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800">
            <h2 className="text-lg font-semibold mb-4">Sales Distribution</h2>
            <PieChartForAdmin />
          </div>
          <div className="p-6 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800">
            <h2 className="text-lg font-semibold mb-4">Revenue Analysis</h2>
            <PieChartForAdmin />
          </div>
        </div>

      </div>
    </div>
  )
}

export default Page
