import Link from 'next/link';
import { ArrowLeft, Package, Truck, CheckCircle2, Clock, MapPin, CreditCard, ShoppingBag, Download, RotateCcw } from 'lucide-react';
import { products, formatBDT } from '@/lib/mock-data';

export default function OrderDetailPage() {
  const order = {
    id: 'KNK-2026-00847', date: 'Aug 14, 2026', status: 'In Transit',
    items: products.slice(0, 2).map(p => ({ product: p, qty: 1, price: p.price })),
    subtotal: products[0].price + products[1].price,
    shipping: 6000, discount: 0,
    total: products[0].price + products[1].price + 6000,
    payment: 'Cash on Delivery', address: 'House 42, Road 7, Dhanmondi R/A, Dhaka 1205',
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Link href="/account/orders" className="text-sm text-brand-blue hover:text-brand-blue-hover flex items-center gap-1 mb-2">
            <ArrowLeft className="w-4 h-4" /> Back to Orders
          </Link>
          <h1 className="text-2xl font-bold text-brand-charcoal">Order {order.id}</h1>
          <p className="text-sm text-neutral-500 mt-0.5">Placed on {order.date}</p>
        </div>
        <span className="badge-amber text-sm">{order.status}</span>
      </div>

      {/* Timeline */}
      <div className="bg-white rounded-xl border border-neutral-100 shadow-sm p-5">
        <h2 className="text-sm font-semibold text-brand-charcoal mb-4">Order Timeline</h2>
        <div className="flex items-center justify-between">
          {[
            { icon: CheckCircle2, label: 'Placed', done: true },
            { icon: Package, label: 'Packed', done: true },
            { icon: Truck, label: 'In Transit', done: true, current: true },
            { icon: MapPin, label: 'Delivered', done: false },
          ].map((step, i, arr) => (
            <div key={i} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step.current ? 'bg-brand-blue text-white ring-4 ring-brand-blue/20'
                    : step.done ? 'bg-semantic-success text-white'
                    : 'bg-neutral-200 text-neutral-400'
                }`}>
                  <step.icon className="w-5 h-5" />
                </div>
                <span className={`text-xs mt-2 font-medium ${step.current ? 'text-brand-blue' : step.done ? 'text-brand-charcoal' : 'text-neutral-400'}`}>
                  {step.label}
                </span>
              </div>
              {i < arr.length - 1 && (
                <div className={`flex-1 h-0.5 mx-2 ${step.done ? 'bg-semantic-success' : 'bg-neutral-200'}`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Items */}
      <div className="bg-white rounded-xl border border-neutral-100 shadow-sm">
        <div className="p-5 border-b border-neutral-100">
          <h2 className="text-sm font-semibold text-brand-charcoal">Items Ordered</h2>
        </div>
        <div className="divide-y divide-neutral-50">
          {order.items.map(({ product, qty, price }) => (
            <div key={product.id} className="p-4 sm:p-5 flex items-center gap-4">
              <div className="w-16 h-16 rounded-lg product-image-placeholder shrink-0 flex items-center justify-center"
                style={{ background: `hsl(${product.colorHue}, 30%, 92%)` }}>
                <ShoppingBag className="w-6 h-6 text-neutral-300" />
              </div>
              <div className="flex-1 min-w-0">
                <Link href={`/products/${product.slug}`} className="text-sm font-medium text-brand-charcoal hover:text-brand-blue transition-colors line-clamp-1">
                  {product.title}
                </Link>
                <p className="text-xs text-neutral-500 mt-0.5">Qty: {qty} × {formatBDT(price)}</p>
              </div>
              <span className="text-sm font-medium tabular-nums shrink-0">{formatBDT(price * qty)}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {/* Payment */}
        <div className="bg-white rounded-xl border border-neutral-100 shadow-sm p-5">
          <h2 className="text-sm font-semibold text-brand-charcoal mb-3">Payment Summary</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-neutral-600">Subtotal</span><span className="tabular-nums">{formatBDT(order.subtotal)}</span></div>
            <div className="flex justify-between"><span className="text-neutral-600">Delivery</span><span className="tabular-nums">{formatBDT(order.shipping)}</span></div>
            <div className="flex justify-between font-semibold pt-2 border-t border-neutral-100">
              <span>Total</span><span className="tabular-nums">{formatBDT(order.total)}</span>
            </div>
            <div className="flex items-center gap-2 pt-2 text-neutral-500">
              <CreditCard className="w-4 h-4" /> {order.payment}
            </div>
          </div>
        </div>

        {/* Delivery */}
        <div className="bg-white rounded-xl border border-neutral-100 shadow-sm p-5">
          <h2 className="text-sm font-semibold text-brand-charcoal mb-3">Delivery Details</h2>
          <div className="space-y-2 text-sm">
            <div className="flex items-start gap-2 text-neutral-600">
              <MapPin className="w-4 h-4 mt-0.5 text-brand-blue shrink-0" />
              <span>{order.address}</span>
            </div>
            <div className="flex items-center gap-2 text-neutral-600">
              <Truck className="w-4 h-4 text-brand-blue shrink-0" />
              <span>Standard Delivery</span>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-3">
        <button className="btn-secondary text-sm"><Download className="w-4 h-4" /> Download Invoice</button>
        <button className="btn-ghost text-sm"><RotateCcw className="w-4 h-4" /> Request Return</button>
      </div>
    </div>
  );
}
