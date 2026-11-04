import { create } from 'zustand';

export const useUIStore = create((set, get) => ({
  // Search Overlay
  isSearchOpen: false,
  openSearch: () => set({ isSearchOpen: true }),
  closeSearch: () => set({ isSearchOpen: false }),

  // Mobile Menu Drawer
  isMenuOpen: false,
  openMenu: () => set({ isMenuOpen: true }),
  closeMenu: () => set({ isMenuOpen: false }),

  // Quick Add Sheet / Modal
  quickAddProduct: null,
  isQuickAddOpen: false,
  openQuickAdd: (product) => set({ quickAddProduct: product, isQuickAddOpen: true }),
  closeQuickAdd: () => set({ isQuickAddOpen: false, quickAddProduct: null }),

  // Size Guide Modal
  isSizeGuideOpen: false,
  openSizeGuide: () => set({ isSizeGuideOpen: true }),
  closeSizeGuide: () => set({ isSizeGuideOpen: false }),

  // Chat Support Sheet
  isChatOpen: false,
  openChat: () => set({ isChatOpen: true }),
  closeChat: () => set({ isChatOpen: false }),

  // Cursor Mode for Desktop
  cursorMode: 'default', // 'default' | 'view' | 'drag' | 'star'
  setCursorMode: (mode) => set({ cursorMode: mode }),

  // Toast Notification
  toast: {
    visible: false,
    message: '',
  },
  showToast: (message) => {
    set({ toast: { visible: true, message } });
    if (window._toastTimeout) clearTimeout(window._toastTimeout);
    window._toastTimeout = setTimeout(() => {
      set({ toast: { visible: false, message: '' } });
    }, 2800);
  },
  hideToast: () => set({ toast: { visible: false, message: '' } }),
}));

