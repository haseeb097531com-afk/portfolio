"use client";

import { useEffect, useState } from 'react';
import { siteData } from '@/data/site';
import { useMotionSafe } from '@/lib/useMotionSafe';

export function HudReadout() {
  const [time, setTime] = useState<string>('');
  const [shouldRender, setShouldRender] = useState(false);
  const prefersReducedMotion = useMotionSafe();

  useEffect(() => {
    if (!siteData.cinematic.enabled || !siteData.cinematic.hudReadouts) return;
    setShouldRender(true);

    const updateClock = () => {
      // PKT is UTC+5
      const d = new Date();
      const localTime = d.getTime();
      const localOffset = d.getTimezoneOffset() * 60000;
      const utc = localTime + localOffset;
      const pkt = utc + (3600000 * 5);
      const nd = new Date(pkt);
      
      const hrs = String(nd.getHours()).padStart(2, '0');
      const mins = String(nd.getMinutes()).padStart(2, '0');
      const secs = String(nd.getSeconds()).padStart(2, '0');
      setTime(`PKT ${hrs}:${mins}:${secs}`);
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!shouldRender) return null;

  return (
    <div className="hidden md:block pointer-events-none fixed inset-0 z-20" aria-hidden="true">
      {/* Top Left */}
      <div className={`absolute top-6 left-6 font-mono text-[10px] text-[var(--color-text)] opacity-40 uppercase tracking-[0.2em] ${prefersReducedMotion ? '' : 'animate-pulse'}`}>
        #SYSREROUTING_SIGNAL VER:2.0
      </div>

      {/* Bottom Right */}
      <div className="absolute bottom-6 right-6 font-mono text-[10px] text-[var(--color-text)] opacity-40 uppercase tracking-[0.2em]">
        LINK.ESTABLISHED.01
      </div>

      {/* Bottom Left Clock */}
      <div className="absolute bottom-6 left-6 font-mono text-[10px] text-[var(--color-text)] opacity-40 uppercase tracking-[0.2em]">
        {time || 'PKT 00:00:00'}
      </div>
    </div>
  );
}
