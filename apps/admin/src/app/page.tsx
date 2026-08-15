'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  LayoutDashboard, ShoppingBag, Package, Users, Settings, BarChart3,
  Warehouse, ChevronLeft, Menu, Bell, Search, User, LogOut,
  TrendingUp, TrendingDown, ShoppingCart, DollarSign, Clock
} from 'lucide-react';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/', active: true },
  { icon: ShoppingBag, label: 'Products', href: '/products' },
  { icon: Package, label: 'Orders', href: '/orders' },
  { icon: Warehouse, label: 'Inventory', href: '/inventory' },
  { icon: Users, label: 'Customers', href: '/customers' },
  { icon: BarChart3, label: 'Analytics', href: '/analytics' },
  { icon: Settings, label: 'Settings', href: '/settings' },
];

const kpiCards = [
  { title: 'Total Revenue', value: '৳12,45,800', change: '+12.5%', trend: 'up', icon: DollarSign, color: 'bg-brand-blue/10 text-brand-blue' },
  { title: 'Orders Today', value: '47', change: '+8.2%', trend: 'up', icon: ShoppingCart, color: 'bg-green-50 text-green-600' },
  { title: 'Pending Orders', value: '12', change: '-3.1%', trend: 'down', icon: Clock, color: 'bg-amber-50 text-amber-600' },
  { title: 'Active Customers', value: '2,847', change: '+5.7%', trend: 'up', icon: Users, color: 'bg-purple-50 text-purple-600' },
];

const recentOrders = [
  { id: 'KNK-00847', customer: 'Rahim Ahmed', items: 2, total: '৳75,998', status: 'Processing', statusColor: 'bg-blue-100 text-blue-700' },
  { id: 'KNK-00846', customer: 'Fatima Begum', items: 1, total: '৳35,000', status: 'Shipped', statusColor: 'bg-amber-100 text-amber-700' },
  { id: 'KNK-00845', customer: 'Kamal Hossain', items: 3, total: '৳12,499', status: 'Delivered', statusColor: 'bg-green-100 text-green-700' },
  { id: 'KNK-00844', customer: 'Nusrat Jahan', items: 1, total: '৳29,999', status: 'Processing', statusColor: 'bg-blue-100 text-blue-700' },
  { id: 'KNK-00843', customer: 'Imran Khan', items: 2, total: '৳7,498', status: 'Delivered', statusColor: 'bg-green-100 text-green-700' },
];

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-neutral-50">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-brand-charcoal text-white flex flex-col transition-all duration-200 shrink-0`}>
        {/* Logo */}
        <div className="h-16 flex items-center gap-3 px-4 border-b border-white/10">
          <div className="w-8 h-8 bg-brand-blue rounded-lg flex items-center justify-center shrink-0">
            <span className="text-white font-bold text-sm">K</span>
          </div>
          {sidebarOpen && (
            <div>
              <span className="font-semibold text-sm">Kenakata</span>
              <span className="text-[9px] text-neutral-400 block -mt-0.5">Admin Dashboard</span>
            </div>
          )}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="ml-auto p-1 hover:bg-white/10 rounded transition-colors">
            {sidebarOpen ? <ChevronLeft className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 px-2 space-y-1">
          {navItems.map(({ icon: Icon, label, href, active }) => (
            <Link key={label} href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                active ? 'bg-brand-blue text-white' : 'text-neutral-400 hover:text-white hover:bg-white/10'
              }`}>
              <Icon className="w-5 h-5 shrink-0" />
              {sidebarOpen && <span>{label}</span>}
            </Link>
          ))}
        </nav>

        {/* Environment marker */}
        <div className="px-4 py-3 border-t border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            {sidebarOpen && <span className="text-xs text-neutral-400">Development</span>}
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-16 bg-white border-b border-neutral-200 flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input type="text" placeholder="Search orders, products, customers..."
                className="pl-10 pr-4 py-2 w-80 rounded-lg border border-neutral-200 bg-neutral-50 text-sm focus:bg-white focus:border-brand-blue focus:outline-none transition-all" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 text-neutral-500 hover:bg-neutral-50 rounded-lg transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <div className="flex items-center gap-2 pl-3 border-l border-neutral-200">
              <div className="w-8 h-8 rounded-full bg-brand-blue flex items-center justify-center">
                <span className="text-white text-xs font-bold">A</span>
              </div>
              <span className="text-sm font-medium text-neutral-700">Admin</span>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold text-brand-charcoal mb-6">Dashboard</h1>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {kpiCards.map(({ title, value, change, trend, icon: Icon, color }) => (
                <div key={title} className="bg-white rounded-xl border border-neutral-100 p-5 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className={`text-xs font-medium flex items-center gap-0.5 ${
                      trend === 'up' ? 'text-green-600' : 'text-red-500'
                    }`}>
                      {trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      {change}
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-brand-charcoal tabular-nums">{value}</p>
                  <p className="text-xs text-neutral-500 mt-0.5">{title}</p>
                </div>
              ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Recent Orders */}
              <div className="lg:col-span-2 bg-white rounded-xl border border-neutral-100">
                <div className="p-5 border-b border-neutral-100 flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-brand-charcoal">Recent Orders</h2>
                  <Link href="/orders" className="text-sm text-brand-blue hover:text-brand-blue-hover">View All</Link>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-xs text-neutral-500 uppercase tracking-wider">
                        <th className="px-5 py-3 text-left font-medium">Order</th>
                        <th className="px-5 py-3 text-left font-medium">Customer</th>
                        <th className="px-5 py-3 text-left font-medium">Items</th>
                        <th className="px-5 py-3 text-left font-medium">Total</th>
                        <th className="px-5 py-3 text-left font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-50">
                      {recentOrders.map(order => (
                        <tr key={order.id} className="hover:bg-neutral-50 transition-colors">
                          <td className="px-5 py-3.5 text-sm font-medium text-brand-blue">{order.id}</td>
                          <td className="px-5 py-3.5 text-sm text-neutral-700">{order.customer}</td>
                          <td className="px-5 py-3.5 text-sm text-neutral-500">{order.items}</td>
                          <td className="px-5 py-3.5 text-sm font-medium tabular-nums">{order.total}</td>
                          <td className="px-5 py-3.5">
                            <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${order.statusColor}`}>
                              {order.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Order Pipeline */}
              <div className="bg-white rounded-xl border border-neutral-100 p-5">
                <h2 className="text-lg font-semibold text-brand-charcoal mb-4">Order Pipeline</h2>
                <div className="space-y-4">
                  {[
                    { label: 'Pending Payment', count: 5, color: 'bg-red-400', pct: 10 },
                    { label: 'Processing', count: 12, color: 'bg-blue-400', pct: 25 },
                    { label: 'Packed', count: 8, color: 'bg-amber-400', pct: 17 },
                    { label: 'Shipped', count: 15, color: 'bg-purple-400', pct: 31 },
                    { label: 'Delivered', count: 125, color: 'bg-green-400', pct: 100 },
                  ].map(stage => (
                    <div key={stage.label}>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-neutral-600">{stage.label}</span>
                        <span className="font-medium text-brand-charcoal">{stage.count}</span>
                      </div>
                      <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                        <div className={`h-full ${stage.color} rounded-full transition-all`} style={{ width: `${stage.pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Quick stats */}
                <div className="mt-6 pt-4 border-t border-neutral-100 grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-brand-charcoal">94%</p>
                    <p className="text-xs text-neutral-500">Fulfilment Rate</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-brand-charcoal">2.3d</p>
                    <p className="text-xs text-neutral-500">Avg. Delivery Time</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
