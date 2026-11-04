import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Ruler } from 'lucide-react';
import { useUIStore } from '../store/uiStore';
import { SIZE_CHART } from '../data/products';

export default function SizeGuideModal() {
  const { isSizeGuideOpen, closeSizeGuide } = useUIStore();
  const [unit, setUnit] = useState('in'); // 'in' or 'cm'

  if (!isSizeGuideOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeSizeGuide}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-lg bg-white rounded-2xl border border-[#E2E2E0] shadow-2xl p-6 z-10"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-[#E2E2E0]">
            <div className="flex items-center space-x-2">
              <Ruler size={18} strokeWidth={1.5} />
              <h3 className="font-heading font-black text-sm uppercase tracking-wider text-[#0A0A0A]">
                SIZE & FIT GUIDE ✦ OVERSIZED TEES
              </h3>
            </div>
            <button
              onClick={closeSizeGuide}
              aria-label="Close size guide"
              className="p-1.5 text-zinc-400 hover:text-black rounded-full hover:bg-zinc-100 transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Unit Toggle */}
          <div className="flex items-center justify-between my-4">
            <span className="text-xs font-mono text-[#6B6B6B]">
              All tees are oversized boxy drop-shoulder cuts.
            </span>
            <div className="flex bg-[#F5F5F3] p-1 rounded-full border border-[#E2E2E0]">
              <button
                onClick={() => setUnit('in')}
                className={`px-3 py-0.5 rounded-full text-xs font-mono font-bold transition-all ${
                  unit === 'in' ? 'bg-[#0A0A0A] text-white shadow-sm' : 'text-[#6B6B6B]'
                }`}
              >
                INCHES
              </button>
              <button
                onClick={() => setUnit('cm')}
                className={`px-3 py-0.5 rounded-full text-xs font-mono font-bold transition-all ${
                  unit === 'cm' ? 'bg-[#0A0A0A] text-white shadow-sm' : 'text-[#6B6B6B]'
                }`}
              >
                CM
              </button>
            </div>
          </div>

          {/* Measurement Table */}
          <div className="overflow-x-auto border border-[#E2E2E0] rounded-xl mb-4">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-[#EDEDEB] text-[#0A0A0A] uppercase tracking-wider font-bold border-b border-[#E2E2E0]">
                <tr>
                  <th className="py-2.5 px-3">Size</th>
                  <th className="py-2.5 px-3">Chest</th>
                  <th className="py-2.5 px-3">Length</th>
                  <th className="py-2.5 px-3">Shoulder</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E2E0]">
                {SIZE_CHART.map((row) => (
                  <tr key={row.size} className="hover:bg-zinc-50 transition-colors">
                    <td className="py-2 px-3 font-bold text-[#0A0A0A]">{row.size}</td>
                    <td className="py-2 px-3 text-[#6B6B6B]">
                      {unit === 'in' ? `${row.chestIn}"` : `${row.chestCm} cm`}
                    </td>
                    <td className="py-2 px-3 text-[#6B6B6B]">
                      {unit === 'in' ? `${row.lengthIn}"` : `${row.lengthCm} cm`}
                    </td>
                    <td className="py-2 px-3 text-[#6B6B6B]">
                      {unit === 'in' ? `${row.shoulderIn}"` : `${Math.round(Number(row.shoulderIn) * 2.54)} cm`}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Model reference */}
          <div className="bg-[#F5F5F3] p-3.5 rounded-xl border border-[#E2E2E0] text-[11px] font-mono text-[#6B6B6B] space-y-1">
            <p><strong>Male Model:</strong> 6'1" (185 cm) wearing size <strong>L</strong> for signature baggy drape.</p>
            <p><strong>Female Model:</strong> 5'7" (170 cm) wearing size <strong>M</strong> for relaxed oversized look.</p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

