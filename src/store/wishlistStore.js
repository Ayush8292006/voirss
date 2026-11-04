import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useWishlistStore = create(
  persist(
    (set, get) => ({
      items: [], // array of product ids

      toggleWishlist: (productId) => {
        const current = get().items;
        if (current.includes(productId)) {
          set({ items: current.filter((id) => id !== productId) });
        } else {
          set({ items: [...current, productId] });
        }
      },

      isInWishlist: (productId) => {
        return get().items.includes(productId);
      },

      clearWishlist: () => set({ items: [] }),
    }),
    {
      name: 'void-society-wishlist',
    }
  )
);

