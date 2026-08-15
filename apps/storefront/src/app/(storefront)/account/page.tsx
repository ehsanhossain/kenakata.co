import Link from 'next/link';
import { Package, MapPin, Heart, ShieldCheck, ArrowRight, Clock, CheckCircle2, Truck, ShoppingBag } from 'lucide-react';
import { formatBDT } from '@/lib/mock-data';

export default function AccountOverviewPage() {
  const recentOrders = [
    { id: 'KNK-2026-00847', date: 'Aug 14, 2026', status: 'In Transit', statusColor: 'badge-amber', total: 7599800, items: 2 },
    { id: 'KNK-2026-00832', date: 'Aug 10, 2026', status: 'Delivered', statusColor: 'badge-green', total: 3500000, items: 1 },
    { id: 'KNK-2026-00815', date: 'Aug 2, 2026', status: 'Delivered', statusColor: 'badge-green', total: 349900, items: 1 },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-brand-charcoal">My Account</h1>

      {/* Quick stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {[
          { icon: Package, label: 'Total Orders', value: '12', color: 'bg-brand-blue-soft text-brand-blue' },
          { icon: Truck, label: 'In Transit', value: '1', color: 'bg-semantic-warning-soft text-semantic-warning' },
          { icon: Heart, label: 'Wishlist', value: '4', color: 'bg-red-50 text-semantic-danger' },
          { icon: MapPin, label: 'Saved Addresses', value: '2', color: 'bg-semantic-success-soft text-semantic-success' },
        ].map(({ icon: Icon, label, value, color }) => (
          <div key={label} className="card p-4">
            <div className={`w-9 h-9 rounded-lg ${color} flex items-center justify-center mb-2`}>
              <Icon className="w-4.5 h-4.5" />
            </div>
            <p className="text-2xl font-bold text-brand-charcoal">{value}</p>
            <p className="text-xs text-neutral-500 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl border border-neutral-100 shadow-sm">
        <div className="flex items-center justify-between p-5 border-b border-neutral-100">
          <h2 className="text-lg font-semibold text-brand-charcoal">Recent Orders</h2>
          <Link href="/account/orders" className="text-sm text-brand-blue hover:text-brand-blue-hover flex items-center gap-1">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="divide-y divide-neutral-50">
          {recentOrders.map(order => (
            <Link key={order.id} href={`/account/orders/${order.id}`}
              className="flex items-center justify-between p-4 sm:p-5 hover:bg-neutral-50 transition-colors group">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-neutral-50 flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5 text-neutral-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-brand-charcoal group-hover:text-brand-blue transition-colors">
                    {order.id}
                  </p>
                  <p className="text-xs text-neutral-500">{order.date} · {order.items} item{order.items > 1 ? 's' : ''}</p>
                </div>
              </div>
              <div className="text-right flex items-center gap-3">
                <div>
                  <span className={order.statusColor}>{order.status}</span>
                  <p className="text-sm font-medium tabular-nums mt-1">{formatBDT(order.total)}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-neutral-300 group-hover:text-brand-blue transition-colors" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Saved Addresses */}
      <div className="bg-white rounded-xl border border-neutral-100 shadow-sm p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-brand-charcoal">Saved Addresses</h2>
          <Link href="/account/addresses" className="text-sm text-brand-blue hover:text-brand-blue-hover">Manage</Link>
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            { label: 'Home', address: 'House 42, Road 7, Dhanmondi R/A, Dhaka 1205', isDefault: true },
            { label: 'Office', address: 'Level 4, BCS Tower, Motijheel, Dhaka 1000', isDefault: false },
          ].map(addr => (
            <div key={addr.label} className={`p-4 rounded-lg border ${addr.isDefault ? 'border-brand-blue bg-brand-blue-soft/30' : 'border-neutral-200'}`}>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-medium text-brand-charcoal">{addr.label}</span>
                {addr.isDefault && <span className="badge-blue text-[10px]">Default</span>}
              </div>
              <p className="text-sm text-neutral-600">{addr.address}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
