import React from 'react';

export default function AnnouncementBar() {
  const marqueeText = "FREE SHIPPING ABOVE ₹2,999 ✦ NEW DROP: BROKE BUT RICH ✦ DM @VOIDSOCIETY FOR ORDER SUPPORT ✦ LIMITED EDITION 240 GSM HEAVYWEIGHT TEES ✦ ";

  return (
    <div className="w-full bg-[#0A0A0A] text-white text-[11px] font-mono tracking-widest uppercase overflow-hidden py-2 select-none border-b border-zinc-800 z-50 relative">
      <div className="marquee-wrapper flex whitespace-nowrap group cursor-default">
        <div className="flex animate-marquee group-hover:[animation-play-state:paused] shrink-0 items-center">
          <span className="px-4">{marqueeText}</span>
          <span className="px-4">{marqueeText}</span>
          <span className="px-4">{marqueeText}</span>
        </div>
        <div className="flex animate-marquee group-hover:[animation-play-state:paused] shrink-0 items-center" aria-hidden="true">
          <span className="px-4">{marqueeText}</span>
          <span className="px-4">{marqueeText}</span>
          <span className="px-4">{marqueeText}</span>
        </div>
      </div>
    </div>
  );
}

