import React, { useRef, useEffect, useState } from 'react';

export default function StickyGridShowcase() {
  const containerRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate progress from 0 (top of element hits top of viewport) 
      // to 1 (bottom of element hits bottom of viewport)
      const totalScrollableDistance = rect.height - windowHeight;
      const currentScrolled = -rect.top;
      
      let rawProgress = currentScrolled / totalScrollableDistance;
      // Clamp between 0 and 1
      rawProgress = Math.max(0, Math.min(1, rawProgress));
      
      setProgress(rawProgress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial calculation
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // MATHEMATICAL MAPPING FOR GRID LINES (Replicating the GSAP logic natively)
  // Progress goes from 0 to 1 over 3 panels.
  // Stage 0: 0 to 0.1 (Panel 1 resting)
  // Stage 1: 0.1 to 0.4 (Transition 1 -> 2)
  // Stage 2: 0.4 to 0.6 (Panel 2 resting)
  // Stage 3: 0.6 to 0.9 (Transition 2 -> 3)
  // Stage 4: 0.9 to 1.0 (Panel 3 resting)

  const interpolate = (start, end, progressRangeStart, progressRangeEnd, currentProgress) => {
    if (currentProgress <= progressRangeStart) return start;
    if (currentProgress >= progressRangeEnd) return end;
    const ratio = (currentProgress - progressRangeStart) / (progressRangeEnd - progressRangeStart);
    // Smoothstep easing for a premium feel
    const ease = ratio * ratio * (3 - 2 * ratio); 
    return start + (end - start) * ease;
  };

  // Line Positions (%)
  const hLine1Top = interpolate(30, 20, 0.1, 0.4, progress) + (progress > 0.6 ? interpolate(0, 20, 0.6, 0.9, progress) : 0);
  const hLine2Top = interpolate(70, 80, 0.1, 0.4, progress) + (progress > 0.6 ? interpolate(0, -20, 0.6, 0.9, progress) : 0);
  
  const vLine1Left = interpolate(20, 30, 0.1, 0.4, progress) + (progress > 0.6 ? interpolate(0, -20, 0.6, 0.9, progress) : 0);
  const vLine2Left = interpolate(80, 70, 0.1, 0.4, progress) + (progress > 0.6 ? interpolate(0, 20, 0.6, 0.9, progress) : 0);

  // Panel Opacities
  const panel1Opacity = interpolate(1, 0, 0.1, 0.3, progress);
  
  const panel2Opacity = progress < 0.5 
    ? interpolate(0, 1, 0.2, 0.4, progress) 
    : interpolate(1, 0, 0.6, 0.8, progress);
    
  const panel3Opacity = interpolate(0, 1, 0.7, 0.9, progress);

  return (
    <div ref={containerRef} className="relative w-full bg-[#050A0D]" style={{ height: '300vh' }}>
      
      {/* Sticky Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* Dynamic Grid Lines */}
        <div 
          className="absolute h-[1px] w-full bg-nocturnal/50 z-10 flex items-center justify-center" 
          style={{ top: `${hLine1Top}%` }}
        >
          <div className="absolute w-1.5 h-1.5 bg-mint rounded-full shadow-[0_0_10px_rgba(209,235,226,0.8)]"></div>
        </div>
        
        <div 
          className="absolute h-[1px] w-full bg-nocturnal/50 z-10 flex items-center justify-center" 
          style={{ top: `${hLine2Top}%` }}
        >
          <div className="absolute w-1.5 h-1.5 bg-forsythia rounded-full shadow-[0_0_10px_rgba(255,200,1,0.8)]"></div>
        </div>
        
        <div 
          className="absolute w-[1px] h-full bg-nocturnal/50 z-10 flex items-center justify-center" 
          style={{ left: `${vLine1Left}%` }}
        >
          <div className="absolute w-1.5 h-1.5 bg-powder rounded-full shadow-[0_0_10px_rgba(241,240,244,0.8)]"></div>
        </div>
        
        <div 
          className="absolute w-[1px] h-full bg-nocturnal/50 z-10 flex items-center justify-center" 
          style={{ left: `${vLine2Left}%` }}
        >
          <div className="absolute w-1.5 h-1.5 bg-mint rounded-full shadow-[0_0_10px_rgba(209,235,226,0.8)]"></div>
        </div>

        {/* Content Panels */}
        
        {/* Panel 1 */}
        <div 
          className="absolute inset-0 flex flex-col items-center justify-center px-6 md:px-20 z-20 text-center"
          style={{ opacity: panel1Opacity, pointerEvents: panel1Opacity > 0.5 ? 'auto' : 'none', transform: `translateY(${(1 - panel1Opacity) * -20}px)` }}
        >
          <h2 className="font-mono text-3xl md:text-5xl font-extrabold uppercase text-powder mb-6 tracking-tight">
            Deterministic Routing
          </h2>
          <p className="font-sans text-lg text-powder/70 leading-relaxed font-medium max-w-2xl">
            BGP tables are inherently flawed. IROX uses an autonomous routing mesh that predicts fiber cuts and network congestion 400ms before they propagate, rerouting packets without a single dropped frame.
          </p>
        </div>

        {/* Panel 2 */}
        <div 
          className="absolute inset-0 flex flex-col items-center justify-center px-6 md:px-20 z-20 text-center"
          style={{ opacity: panel2Opacity, pointerEvents: panel2Opacity > 0.5 ? 'auto' : 'none', transform: `translateY(${(1 - panel2Opacity) * (progress < 0.5 ? 20 : -20)}px)` }}
        >
          <h2 className="font-mono text-3xl md:text-5xl font-extrabold uppercase text-powder mb-6 tracking-tight">
            Atomic Tokenization
          </h2>
          <p className="font-sans text-lg text-powder/70 leading-relaxed font-medium max-w-2xl">
            Data is encrypted at the exact moment of ingestion. Keys are rotated procedurally every 24 hours, guaranteeing that your raw datasets never touch a physical drive in plaintext.
          </p>
        </div>

        {/* Panel 3 */}
        <div 
          className="absolute inset-0 flex flex-col items-center justify-center px-6 md:px-20 z-20 text-center"
          style={{ opacity: panel3Opacity, pointerEvents: panel3Opacity > 0.5 ? 'auto' : 'none', transform: `translateY(${(1 - panel3Opacity) * 20}px)` }}
        >
          <h2 className="font-mono text-3xl md:text-5xl font-extrabold uppercase text-powder mb-6 tracking-tight">
            Liquid Suppressed
          </h2>
          <p className="font-sans text-lg text-powder/70 leading-relaxed font-medium max-w-2xl">
            Traditional HVAC cooling is obsolete. Our hardware runs submerged in a dielectric fluid, allowing us to overdrive CPUs by 140% while maintaining a Power Usage Effectiveness of 1.05.
          </p>
        </div>

      </div>
    </div>
  );
}
