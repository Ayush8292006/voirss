import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, ChevronDown, Check, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import { PRODUCTS } from '../data/products';

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const filterParam = searchParams.get('filter') || 'all';

  const [activeTab, setActiveTab] = useState(filterParam);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedSort, setSelectedSort] = useState('featured'); // 'featured', 'price-low', 'price-high', 'newest'
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);
  const [priceMax, setPriceMax] = useState(3500);

  const categories = [
    { id: 'all', label: 'SHOP ALL' },
    { id: 'new', label: 'NEW ARRIVALS' },
    { id: 'tees', label: 'GRAPHIC TEES' },
    { id: 'sale', label: 'SALE ARCHIVE' },
  ];

  const allSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  const toggleSize = (size) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Tab Category Filter
      if (activeTab === 'new' && product.badge !== 'New') return false;
      if (activeTab === 'sale' && !product.badge?.toLowerCase().includes('sale')) return false;
      if (activeTab === 'tees' && product.type !== 'Tee') return false;

      // Price filter
      if (product.price > priceMax) return false;

      // Size filter
      if (selectedSizes.length > 0) {
        const hasMatchingSize = product.sizes.some(
          (s) => selectedSizes.includes(s.size) && s.inStock
        );
        if (!hasMatchingSize) return false;
      }

      return true;
    }).sort((a, b) => {
      if (selectedSort === 'price-low') return a.price - b.price;
      if (selectedSort === 'price-high') return b.price - a.price;
      if (selectedSort === 'newest') return (b.badge === 'New' ? 1 : 0) - (a.badge === 'New' ? 1 : 0);
      return 0; // featured
    });
  }, [activeTab, selectedSizes, selectedSort, priceMax]);

  const clearFilters = () => {
    setSelectedSizes([]);
    setPriceMax(3500);
    setSelectedSort('featured');
    setActiveTab('all');
  };

  return (
    <div className="w-full min-h-screen bg-[#F5F5F3] pt-28 sm:pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* COLLECTION TITLE & COUNT */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-[#E2E2E0] gap-4">
        <div>
          <span className="text-xs font-mono font-semibold text-[#6B6B6B] tracking-label uppercase flex items-center space-x-1.5 mb-1.5">
            <span>✦</span>
            <span>VOID SOCIETY COLLECTION</span>
          </span>
          <h1 className="text-3xl sm:text-5xl font-heading font-black tracking-tight uppercase text-[#0A0A0A]">
            {activeTab === 'new'
              ? 'NEW ARRIVALS'
              : activeTab === 'sale'
              ? 'ARCHIVE SALE'
              : 'ALL TEES'}
          </h1>
          <p className="text-xs font-mono text-[#6B6B6B] mt-1.5">
            SHOWING {filteredProducts.length} HEAVYWEIGHT 240 GSM PIECES
          </p>
        </div>

        {/* Filter / Sort Actions Bar */}
        <div className="flex items-center space-x-3">
          {/* Mobile Filter Button */}
          <button
            onClick={() => setIsFilterSheetOpen(true)}
            className="md:hidden flex items-center space-x-2 px-4 py-2.5 rounded-full bg-white border border-[#E2E2E0] text-xs font-mono font-bold uppercase tracking-wider text-[#0A0A0A] shadow-sm active:scale-95"
          >
            <SlidersHorizontal size={14} />
            <span>FILTER & SORT</span>
            {(selectedSizes.length > 0 || priceMax < 3500) && (
              <span className="w-2 h-2 rounded-full bg-black" />
            )}
          </button>

          {/* Desktop Sort Dropdown */}
          <div className="hidden md:flex items-center space-x-2 bg-white px-4 py-2 rounded-full border border-[#E2E2E0] text-xs font-mono">
            <span className="text-[#6B6B6B]">SORT BY:</span>
            <select
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value)}
              className="bg-transparent font-bold text-[#0A0A0A] outline-none cursor-pointer"
            >
              <option value="featured">FEATURED</option>
              <option value="newest">NEWEST DROPS</option>
              <option value="price-low">PRICE: LOW TO HIGH</option>
              <option value="price-high">PRICE: HIGH TO LOW</option>
            </select>
          </div>
        </div>
      </div>

      {/* CATEGORY PILL TABS */}
      <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar pb-6 mb-4">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveTab(cat.id)}
            className={`px-4 sm:px-5 py-2 rounded-full text-xs font-heading font-bold uppercase tracking-wider transition-all duration-150 whitespace-nowrap active:scale-95 ${
              activeTab === cat.id
                ? 'bg-[#0A0A0A] text-white shadow-sm'
                : 'bg-white text-[#0A0A0A] border border-[#E2E2E0] hover:border-black'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* DESKTOP FILTER BAR: Size pills & Price limit */}
      <div className="hidden md:flex items-center justify-between pb-6 mb-6 border-b border-[#E2E2E0] text-xs font-mono">
        <div className="flex items-center space-x-2">
          <span className="text-[#6B6B6B] mr-2">SIZES:</span>
          {allSizes.map((size) => {
            const isSelected = selectedSizes.includes(size);
            return (
              <button
                key={size}
                onClick={() => toggleSize(size)}
                className={`min-w-[34px] h-7 px-2 rounded-full border text-[11px] font-mono transition-all ${
                  isSelected
                    ? 'bg-[#0A0A0A] text-white border-black'
                    : 'bg-white text-[#0A0A0A] border-[#E2E2E0] hover:border-black'
                }`}
              >
                {size}
              </button>
            );
          })}

          {selectedSizes.length > 0 && (
            <button
              onClick={() => setSelectedSizes([])}
              className="text-[#6B6B6B] hover:text-black ml-2 underline text-[11px]"
            >
              Reset sizes
            </button>
          )}
        </div>

        <div className="flex items-center space-x-3">
          <span className="text-[#6B6B6B]">MAX PRICE:</span>
          <span className="font-bold text-[#0A0A0A]">₹{priceMax.toLocaleString('en-IN')}</span>
          <input
            type="range"
            min="1800"
            max="3500"
            step="100"
            value={priceMax}
            onChange={(e) => setPriceMax(Number(e.target.value))}
            className="w-28 accent-black cursor-pointer"
          />
        </div>
      </div>

      {/* PRODUCT GRID: 2 cols Mobile, 3 cols Tablet, 4 cols Desktop */}
      {filteredProducts.length === 0 ? (
        <div className="py-24 text-center">
          <span className="text-3xl text-[#0A0A0A] block mb-2">✦</span>
          <h3 className="font-heading font-black text-lg uppercase tracking-wider text-[#0A0A0A]">
            NO PRODUCTS MATCH YOUR FILTERS
          </h3>
          <p className="text-xs text-[#6B6B6B] font-mono mt-1 mb-6">
            Try adjusting your price range or size selections.
          </p>
          <button
            onClick={clearFilters}
            className="px-6 py-3 bg-[#0A0A0A] text-white text-xs font-heading font-bold uppercase tracking-widest rounded-full hover:bg-zinc-800 transition-colors"
          >
            RESET ALL FILTERS ✦
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 md:gap-5">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* MOBILE FILTER & SORT BOTTOM SHEET */}
      <AnimatePresence>
        {isFilterSheetOpen && (
          <div className="fixed inset-0 z-50 flex items-end md:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFilterSheetOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="relative w-full bg-white rounded-t-3xl p-6 z-10 max-h-[85vh] overflow-y-auto"
            >
              <div className="w-12 h-1.5 bg-zinc-300 rounded-full mx-auto mb-4" />
              <div className="flex justify-between items-center pb-4 border-b border-[#E2E2E0]">
                <h3 className="font-heading font-black text-sm uppercase tracking-wider text-[#0A0A0A]">
                  FILTER & SORT
                </h3>
                <button
                  onClick={() => setIsFilterSheetOpen(false)}
                  className="p-1 text-zinc-400 hover:text-black"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Sort Options */}
              <div className="py-4 border-b border-[#E2E2E0]">
                <span className="text-[11px] font-mono font-semibold uppercase text-[#6B6B6B] block mb-2.5">
                  SORT BY
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'featured', label: 'FEATURED' },
                    { id: 'newest', label: 'NEWEST DROPS' },
                    { id: 'price-low', label: 'PRICE: LOW' },
                    { id: 'price-high', label: 'PRICE: HIGH' },
                  ].map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setSelectedSort(s.id)}
                      className={`p-2.5 rounded-xl border text-xs font-mono font-medium transition-all ${
                        selectedSort === s.id
                          ? 'bg-[#0A0A0A] text-white border-black'
                          : 'bg-white text-[#0A0A0A] border-[#E2E2E0]'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Options */}
              <div className="py-4 border-b border-[#E2E2E0]">
                <span className="text-[11px] font-mono font-semibold uppercase text-[#6B6B6B] block mb-2.5">
                  SIZES
                </span>
                <div className="flex flex-wrap gap-2">
                  {allSizes.map((size) => {
                    const isSelected = selectedSizes.includes(size);
                    return (
                      <button
                        key={size}
                        onClick={() => toggleSize(size)}
                        className={`min-w-[46px] h-10 px-3 rounded-full border text-xs font-mono transition-all ${
                          isSelected
                            ? 'bg-[#0A0A0A] text-white border-black'
                            : 'bg-white text-[#0A0A0A] border-[#E2E2E0]'
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Price Max slider */}
              <div className="py-4 border-b border-[#E2E2E0]">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[11px] font-mono font-semibold uppercase text-[#6B6B6B]">
                    MAX PRICE
                  </span>
                  <span className="text-xs font-mono font-bold text-[#0A0A0A]">
                    ₹{priceMax.toLocaleString('en-IN')}
                  </span>
                </div>
                <input
                  type="range"
                  min="1800"
                  max="3500"
                  step="100"
                  value={priceMax}
                  onChange={(e) => setPriceMax(Number(e.target.value))}
                  className="w-full accent-black cursor-pointer"
                />
              </div>

              {/* Bottom Buttons */}
              <div className="pt-5 pb-safe flex space-x-3">
                <button
                  onClick={clearFilters}
                  className="flex-1 py-3.5 border border-[#E2E2E0] rounded-full text-xs font-mono uppercase tracking-wider text-[#0A0A0A]"
                >
                  RESET
                </button>
                <button
                  onClick={() => setIsFilterSheetOpen(false)}
                  className="flex-1 py-3.5 bg-[#0A0A0A] text-white rounded-full text-xs font-heading font-black uppercase tracking-wider shadow-lg"
                >
                  SHOW ({filteredProducts.length})
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

