import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface WishlistItem {
  id: string; // The product _id or id
  name: string;
  price: number;
  compareAtPrice?: number;
  image: string;
  slug: string;
}

export interface WishlistState {
  items: WishlistItem[];
  addItem: (item: WishlistItem) => void;
  removeItem: (id: string) => void;
  toggleItem: (item: WishlistItem) => void;
  clearWishlist: () => void;
  isInWishlist: (id: string) => boolean;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => set((state) => {
        const existingItem = state.items.find(i => i.id === item.id);
        if (existingItem) return state;
        return { items: [...state.items, item] };
      }),
      removeItem: (id) => set((state) => ({
        items: state.items.filter(i => i.id !== id)
      })),
      toggleItem: (item) => set((state) => {
        const existingItem = state.items.find(i => i.id === item.id);
        if (existingItem) {
          return { items: state.items.filter(i => i.id !== item.id) };
        }
        return { items: [...state.items, item] };
      }),
      clearWishlist: () => set({ items: [] }),
      isInWishlist: (id) => get().items.some(i => i.id === id)
    }),
    {
      name: 'wishlist-storage',
    }
  )
);
