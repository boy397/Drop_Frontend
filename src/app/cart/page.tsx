"use client";

import { motion } from "framer-motion";
import { useCartStore } from "@/store/cartStore";
import { useGamificationStore } from "@/store/gamificationStore";
import { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Trash2, Plus, Minus, ArrowRight } from "lucide-react";

export default function CartPage() {
  const { items, updateQuantity, removeItem, getTotal } = useCartStore();
  const { couponsClaimed } = useGamificationStore();
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();
  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);

  const subtotal = getTotal();
  
  // Simple discount logic based on mocked prizes
  let discount = 0;
  if (appliedCoupon === "10% OFF") discount = subtotal * 0.1;
  if (appliedCoupon === "20% OFF") discount = subtotal * 0.2;
  if (appliedCoupon === "15% OFF") discount = subtotal * 0.15;
  if (appliedCoupon === "₹500 OFF") discount = 500;

  const total = Math.max(0, subtotal - discount);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponsClaimed.includes(couponInput)) {
      setAppliedCoupon(couponInput);
    } else {
      alert("Invalid or unearned coupon code.");
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] pt-12 pb-24 px-4 bg-zinc-50 dark:bg-black">
      <div className="max-w-6xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold mb-10 text-black dark:text-white"
        >
          Your Cart
        </motion.h1>

        {items.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 bg-white dark:bg-zinc-900 rounded-3xl shadow-sm border border-gray-100 dark:border-white/5"
          >
            <p className="text-gray-500 text-xl mb-6">Your cart is currently empty.</p>
            <Link 
              href="/products"
              className="inline-flex items-center gap-2 bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-full font-medium hover:scale-105 transition-transform"
            >
              Start Shopping <ArrowRight size={18} />
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {items.map((item, index) => (
                <motion.div 
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex gap-6 bg-white dark:bg-zinc-900 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-white/5"
                >
                  <div className="relative w-32 h-32 rounded-xl overflow-hidden bg-gray-100 dark:bg-zinc-800 shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  
                  <div className="flex-1 flex flex-col justify-between py-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-lg text-black dark:text-white">{item.name}</h3>
                        <p className="text-accent font-medium">₹{item.price.toFixed(2)}</p>
                      </div>
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>

                    <div className="flex items-center gap-4 bg-gray-100 dark:bg-zinc-800 w-fit rounded-lg p-1">
                      <button 
                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        className="p-1 hover:bg-white dark:hover:bg-zinc-700 rounded transition-colors"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 hover:bg-white dark:hover:bg-zinc-700 rounded transition-colors"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Order Summary */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-zinc-900 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-white/5 h-fit sticky top-24"
            >
              <h2 className="text-2xl font-bold mb-6 text-black dark:text-white">Order Summary</h2>
              
              <div className="space-y-4 mb-6 text-gray-600 dark:text-gray-300">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-black dark:text-white">₹{subtotal.toFixed(2)}</span>
                </div>
                
                {discount > 0 && (
                  <div className="flex justify-between text-green-600 dark:text-green-400 font-medium">
                    <span>Discount ({appliedCoupon})</span>
                    <span>-₹{discount.toFixed(2)}</span>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
              </div>

              <div className="border-t border-gray-100 dark:border-white/10 pt-4 mb-8">
                <div className="flex justify-between items-center text-xl font-bold text-black dark:text-white">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>

              <form onSubmit={handleApplyCoupon} className="mb-8">
                <label className="block text-sm font-medium mb-2 text-gray-600 dark:text-gray-300">
                  Have a gamification coupon?
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder="E.g. 10% OFF"
                    className="flex-1 bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-xl px-4 py-3 outline-none focus:border-accent transition-colors"
                  />
                  <button 
                    type="submit"
                    className="bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-xl font-medium hover:opacity-80 transition-opacity"
                  >
                    Apply
                  </button>
                </div>
                {couponsClaimed.length > 0 && (
                  <p className="text-xs text-gray-400 mt-2">
                    Your available coupons: {couponsClaimed.join(", ")}
                  </p>
                )}
              </form>

              <button 
                onClick={() => {
                  if (isAuthenticated) {
                    router.push('/checkout');
                  } else {
                    router.push('/login?redirect=/checkout');
                  }
                }}
                className="w-full bg-accent text-black font-bold text-lg py-4 rounded-xl flex items-center justify-center hover:scale-[1.02] transition-transform"
              >
                Proceed to Checkout
              </button>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
