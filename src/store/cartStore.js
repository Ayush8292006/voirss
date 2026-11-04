import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const FREE_SHIPPING_THRESHOLD = 2999;

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      addItem: (product, size, color, quantity = 1) => {
        const currentItems = get().items;
        const selectedColor = color || (product.colors && product.colors[0]?.name) || 'Standard';
        const selectedSize = size || 'M';
        const itemId = `${product.id}-${selectedSize}-${selectedColor}`;

        const existingIndex = currentItems.findIndex((item) => item.id === itemId);

        if (existingIndex > -1) {
          const updated = [...currentItems];
          updated[existingIndex].quantity += quantity;
          set({ items: updated, isOpen: true });
        } else {
          const newItem = {
            id: itemId,
            productId: product.id,
            name: product.name,
            price: product.price,
            compareAtPrice: product.compareAtPrice,
            image: product.images[0],
            size: selectedSize,
            color: selectedColor,
            quantity: quantity,
            slug: product.slug,
          };
          set({ items: [newItem, ...currentItems], isOpen: true });
        }
      },

      removeItem: (itemId) => {
        set({
          items: get().items.filter((item) => item.id !== itemId),
        });
      },

      updateQuantity: (itemId, delta) => {
        const currentItems = get().items;
        const updated = currentItems
          .map((item) => {
            if (item.id === itemId) {
              const newQty = item.quantity + delta;
              return newQty > 0 ? { ...item, quantity: newQty } : null;
            }
            return item;
          })
          .filter(Boolean);

        set({ items: updated });
      },

      clearCart: () => set({ items: [] }),

      // Calculated getters
      getSubtotal: () => {
        return get().items.reduce((acc, item) => acc + item.price * item.quantity, 0);
      },

      getTotalItems: () => {
        return get().items.reduce((acc, item) => acc + item.quantity, 0);
      },

      getFreeShippingProgress: () => {
        const subtotal = get().getSubtotal();
        const diff = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
        const percentage = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));
        return {
          threshold: FREE_SHIPPING_THRESHOLD,
          remaining: diff,
          percentage: percentage,
          isFree: diff === 0 && subtotal > 0,
        };
      },
    }),
    {
      name: 'void-society-cart',
    }
  )
);

