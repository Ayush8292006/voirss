import React, { useState } from 'react';
import { Mail, Instagram, MessageSquare, Phone, ChevronDown, Check } from 'lucide-react';
import { useUIStore } from '../store/uiStore';

export default function Contact() {
  const showToast = useUIStore((state) => state.showToast);
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  const faqs = [
    {
      q: 'HOW DOES VOID SOCIETY SIZING WORK?',
      a: 'All our silhouettes are cut intentionally oversized with exaggerated drop shoulders and wide sleeves. If you prefer our intended signature drape, select your normal size. For a standard streetwear fit, order one size smaller.',
    },
    {
      q: 'WHAT ARE THE SHIPPING TIMELINES & CHARGES?',
      a: 'All orders dispatch within 24 hours from our Mumbai studio. Express air shipping takes 2-4 business days anywhere in India. Shipping is completely FREE on all orders of ₹2,999 and above.',
    },
    {
      q: 'CAN I EXCHANGE MY SIZE IF IT DOES NOT FIT?',
      a: 'Yes, we provide 7-day hassle-free doorstep size exchanges on all unworn items with tags intact. Simply email support@voidsociety.com or DM @VOIDSOCIETY with your order number.',
    },
    {
      q: 'HOW SHOULD I WASH AND CARE FOR MY TEES?',
      a: 'Turn the tee inside-out before machine washing in cold water on a gentle cycle. Tumble dry on low or line dry in the shade. Never iron directly over the graphic print.',
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    showToast('Inquiry sent to Void Concierge ✦');
  };

  return (
    <div className="w-full min-h-screen bg-[#F5F5F3] pt-28 sm:pt-36 pb-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      
      {/* Header */}
      <div className="text-center max-w-xl mx-auto mb-16">
        <span className="text-xs font-mono font-semibold text-[#6B6B6B] tracking-label uppercase flex items-center justify-center space-x-1.5 mb-2">
          <span>✦</span>
          <span>DIRECT TRANSMISSION</span>
        </span>
        <h1 className="text-3xl sm:text-5xl font-heading font-black tracking-tight uppercase text-[#0A0A0A]">
          CONTACT THE SOCIETY
        </h1>
        <p className="text-xs sm:text-sm text-[#6B6B6B] font-mono mt-2">
          For order inquiries, sizing counsel, and wholesale collaborations.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* LEFT: Contact Cards & Form */}
        <div className="lg:col-span-7 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="p-5 bg-white rounded-2xl border border-[#E2E2E0] shadow-sm hover:border-black transition-colors block"
            >
              <Instagram size={22} className="text-[#0A0A0A] mb-2" />
              <h3 className="font-heading font-black text-xs uppercase tracking-wider text-[#0A0A0A]">
                INSTAGRAM DM
              </h3>
              <p className="text-[11px] font-mono text-[#6B6B6B] mt-1">
                @VOIDSOCIETY • Fastest response
              </p>
            </a>

            <a
              href="mailto:support@voidsociety.com"
              className="p-5 bg-white rounded-2xl border border-[#E2E2E0] shadow-sm hover:border-black transition-colors block"
            >
              <Mail size={22} className="text-[#0A0A0A] mb-2" />
              <h3 className="font-heading font-black text-xs uppercase tracking-wider text-[#0A0A0A]">
                EMAIL SUPPORT
              </h3>
              <p className="text-[11px] font-mono text-[#6B6B6B] mt-1">
                support@voidsociety.com
              </p>
            </a>
          </div>

          {/* Form */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E2E2E0] shadow-sm">
            <h2 className="font-heading font-black text-sm uppercase tracking-wider text-[#0A0A0A] mb-4">
              SEND A MESSAGE
            </h2>

            {submitted ? (
              <div className="p-6 bg-zinc-50 border border-zinc-200 rounded-xl text-center space-y-2">
                <Check size={28} className="mx-auto text-emerald-600" />
                <h4 className="font-heading font-bold text-sm uppercase text-[#0A0A0A]">
                  MESSAGE RECEIVED ✦
                </h4>
                <p className="text-xs font-mono text-[#6B6B6B]">
                  Our support concierge will reply to your email within 4 business hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-mono uppercase text-[#6B6B6B] block mb-1">YOUR NAME</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rohan"
                      className="w-full p-3 bg-[#F5F5F3] border border-[#E2E2E0] rounded-xl text-xs font-mono outline-none focus:border-black"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-mono uppercase text-[#6B6B6B] block mb-1">ORDER ID (OPTIONAL)</label>
                    <input
                      type="text"
                      placeholder="e.g. #VS-98241"
                      className="w-full p-3 bg-[#F5F5F3] border border-[#E2E2E0] rounded-xl text-xs font-mono outline-none focus:border-black"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-mono uppercase text-[#6B6B6B] block mb-1">EMAIL ADDRESS</label>
                  <input
                    type="email"
                    required
                    placeholder="you@domain.com"
                    className="w-full p-3 bg-[#F5F5F3] border border-[#E2E2E0] rounded-xl text-xs font-mono outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono uppercase text-[#6B6B6B] block mb-1">MESSAGE</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe your inquiry..."
                    className="w-full p-3 bg-[#F5F5F3] border border-[#E2E2E0] rounded-xl text-xs font-mono outline-none focus:border-black"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#0A0A0A] text-white rounded-full font-heading font-black text-xs uppercase tracking-widest hover:bg-zinc-800 transition-colors shadow-md"
                >
                  DISPATCH MESSAGE ✦
                </button>
              </form>
            )}
          </div>
        </div>

        {/* RIGHT: FAQ Accordions */}
        <div className="lg:col-span-5 space-y-4">
          <h2 className="font-heading font-black text-sm uppercase tracking-wider text-[#0A0A0A] mb-2">
            FREQUENTLY ASKED QUESTIONS
          </h2>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-[#E2E2E0] overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full p-4 text-left flex justify-between items-center text-xs font-heading font-bold uppercase tracking-tight text-[#0A0A0A]"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-200 shrink-0 ml-2 ${
                      openFaq === i ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-4 pb-4 text-xs font-mono text-[#6B6B6B] leading-relaxed border-t border-zinc-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}

