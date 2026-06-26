import React, { useState, useEffect, Suspense, lazy, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { 
  IroxLogoIcon,
  Cube16SolidIcon, 
  ArrowTrendingUpIcon, 
  ChevronDownIcon,
  ChartPieIcon,
  LinkIcon
} from './components/Icons';
import BentoAccordion from './components/BentoAccordion';
import Pricing from './components/Pricing';
import StickyGridShowcase from './components/StickyGridShowcase';

// Deferred WebGL Engine
const Hero3D = lazy(() => import('./components/Hero3D'));

// Custom Hook for Kinetic Number Counting
function useAnimatedCounter(endValue, duration = 2000, decimals = 1) {
  const [count, setCount] = useState(0);
  const nodeRef = useRef(null);

  useEffect(() => {
    let observer;
    let startTimestamp = null;
    let animationFrame;
    let isVisible = false;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      setCount(easeProgress * endValue);
      
      if (progress < 1) {
        animationFrame = window.requestAnimationFrame(step);
      }
    };

    observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !isVisible) {
        isVisible = true;
        animationFrame = window.requestAnimationFrame(step);
      }
    }, { threshold: 0.5 });

    if (nodeRef.current) observer.observe(nodeRef.current);

    return () => {
      if (observer) observer.disconnect();
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
    };
  }, [endValue, duration]);

  return { count: count.toFixed(decimals), ref: nodeRef };
}


export default function App() {
  const [sysTime, setSysTime] = useState(new Date().toISOString());
  const [activeFaq, setActiveFaq] = useState(null);

  // Animated counters for the Metrics section
  const { count: tbpsCount, ref: tbpsRef } = useAnimatedCounter(14.2, 2500, 1);
  const { count: uptimeCount, ref: uptimeRef } = useAnimatedCounter(99.9, 3000, 1);

  useEffect(() => {
    const interval = setInterval(() => {
      setSysTime(new Date().toISOString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const faqs = [
    { q: "Is the WebGL architecture deterministic?", a: "Yes. All WebGL nodes map directly to real-time cluster metrics with a 12ms latency bound." },
    { q: "How is data residency enforced?", a: "Through optical hardlines routing directly to Tier-4 facilities, bypassing public BGP tables entirely." },
    { q: "What is the baseline node performance?", a: "Each Sandbox Node guarantees 0.5 MW dedicated power and 10 Gbps unmetered ingress." }
  ];

  return (
    <div className="min-h-screen bg-noir text-powder flex flex-col font-sans selection:bg-powder selection:text-noir">
      
      {/* GLOBAL METRICS TICKER */}
      <div className="w-full bg-[#050A0D] text-powder text-[9px] font-mono border-b border-nocturnal/40 py-2 overflow-hidden fixed top-0 left-0 z-50">
        <div className="whitespace-nowrap animate-ticker-fast flex gap-16 font-bold tracking-widest opacity-90">
          <span>IROX_CORE_TICKER <span className="text-forsythia">$18.42</span> <span className="text-mint">(+3.4%)</span></span>
          <span>COMPUTE_CAPACITY: <span className="text-powder/80">142.8 MW</span></span>
          <span>ACTIVE_NODES: <span className="text-powder/80">14,291</span></span>
          <span>SYS_TIME: <span className="text-mint">{sysTime}</span></span>
          <span>NETWORK: <span className="text-mint">NOMINAL</span></span>
          <span>IROX_CORE_TICKER <span className="text-forsythia">$18.42</span> <span className="text-mint">(+3.4%)</span></span>
          <span>COMPUTE_CAPACITY: <span className="text-powder/80">142.8 MW</span></span>
        </div>
      </div>

      {/* HEADER */}
      <header className="w-full bg-noir/80 backdrop-blur-md border-b border-nocturnal/40 sticky top-[30px] z-40 premium-shadow">
        <div className="max-w-[1536px] mx-auto px-4 md:px-12 h-16 flex items-center justify-between">
          <a href="#" aria-label="IROX Homepage" className="flex items-center gap-3 font-mono text-xl uppercase tracking-widest font-extrabold text-powder hover:text-mint transition-colors duration-200">
            {/* The Vectorized Knot Logo */}
            <div className="p-1">
              <IroxLogoIcon className="w-8 h-8 text-powder hover:text-mint transition-colors duration-300" />
            </div>
            <span className="tracking-[0.2em]">IROX</span>
          </a>

          <nav aria-label="Main Navigation" className="hidden md:flex items-center gap-12 text-[10px] font-mono tracking-widest font-bold">
            <a href="#overview" className="text-powder/70 hover:text-powder transition-colors duration-200 uppercase">Architecture</a>
            <a href="#infrastructure" className="text-powder/70 hover:text-powder transition-colors duration-200 uppercase">Infrastructure</a>
            <a href="#tariffs" className="text-powder/70 hover:text-powder transition-colors duration-200 uppercase">Tariffs</a>
            <a href="#compliance" className="text-nocturnal hover:text-mint transition-colors duration-200 flex items-center gap-1.5">
              SEC FILINGS <ArrowTrendingUpIcon className="w-3 h-3" />
            </a>
          </nav>
        </div>
      </header>

      <main className="flex-1 relative z-10 w-full mx-auto mt-[30px]">

        {/* 1. HERO SECTION (5-Layer Depth) */}
        <section aria-label="Introduction" className="relative min-h-[90vh] flex items-center justify-start border-b border-nocturnal/30 overflow-hidden max-w-[1536px] mx-auto border-x border-nocturnal/20 bg-noir group">
          
          {/* Layer 1: Animated Engineering Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#114C5A_1px,transparent_1px),linear-gradient(to_bottom,#114C5A_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-[0.08] pointer-events-none z-0 mix-blend-screen transform perspective-1000 rotateX(10deg) origin-bottom"></div>

          {/* Layer 2: Blueprint Construction Lines */}
          <div className="absolute top-1/4 left-0 w-full h-[1px] bg-nocturnal/20 z-0 hidden md:block">
            <div className="absolute top-0 left-0 h-[1px] bg-mint/50 w-full origin-left animate-[scaleYIn_4s_ease-out_forwards]"></div>
          </div>
          <div className="absolute top-0 left-1/4 w-[1px] h-full bg-nocturnal/20 z-0 hidden md:block">
            <div className="absolute top-0 left-0 w-[1px] bg-mint/50 h-full origin-top animate-[scaleYIn_4s_ease-out_forwards]"></div>
          </div>

          {/* Layer 3: Dynamic Radial Lighting */}
          <div className="absolute inset-0 corporate-radial-glow z-0 pointer-events-none"></div>
          <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(209,235,226,0.03)_0%,transparent_50%)] animate-[pulseMechanic_10s_infinite_ease-in-out]"></div>

          {/* Layer 4: SVG Topology / Frames */}
          <div className="absolute bottom-10 right-10 text-nocturnal/30 font-mono text-[9px] uppercase tracking-[0.3em] font-bold z-10 hidden md:block border border-nocturnal/20 p-2">
            OBJ: 0x8F92A
          </div>
          <div className="absolute top-10 right-10 w-4 h-4 border-t-2 border-r-2 border-mint/30 z-10 hidden md:block"></div>
          <div className="absolute bottom-10 left-10 w-4 h-4 border-b-2 border-l-2 border-mint/30 z-10 hidden md:block"></div>

          {/* Layer 5: WebGL Scene */}
          <div className="absolute inset-0 z-0 pointer-events-none mix-blend-screen">
            <Suspense fallback={<div className="webgl-css-fallback"></div>}>
              <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
                <Hero3D />
              </Canvas>
            </Suspense>
          </div>
          
          <article className="relative z-20 w-full px-6 md:px-12 text-left animate-premium-entry max-w-5xl pt-24 pb-12">
            <div className="font-mono text-[10px] md:text-[12px] font-bold text-mint uppercase tracking-[0.3em] mb-8 inline-block border-b border-mint/20 pb-2 relative overflow-hidden">
              Neural Pipeline Infrastructure
              <div className="absolute bottom-0 left-0 h-[1px] bg-mint w-full origin-left transform scale-x-0 group-hover:scale-x-100 transition-transform duration-1000 ease-out"></div>
            </div>
            
            <h1 className="fluid-hero-headline font-mono font-extrabold uppercase text-powder mb-8 drop-shadow-lg leading-none">
              Industrial <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-powder via-mint to-nocturnal pb-2">Orchestration</span>
            </h1>
            
            <p className="font-sans text-lg md:text-2xl text-powder/80 leading-relaxed max-w-2xl mb-12 border-l-2 border-nocturnal/40 pl-6 font-medium">
              High-performance compute clusters engineered for deterministic ETL and large-scale data stream tokenization. Utility-scale architecture deployed instantly.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-start items-center">
              <button className="w-full sm:w-auto px-10 py-5 bg-powder text-noir font-mono text-[11px] font-extrabold uppercase tracking-widest hover:bg-mint hover:-translate-y-1 transition-all duration-300 shadow-md hover:shadow-lg">
                Provision Cluster
              </button>
              <button className="w-full sm:w-auto px-10 py-5 border border-nocturnal/40 hover:border-mint bg-nocturnal/10 backdrop-blur-md text-powder font-mono text-[11px] font-bold uppercase tracking-widest hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3 shadow-sm hover:shadow-md group/btn">
                Operations Deck <ArrowTrendingUpIcon className="w-3 h-3 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform duration-300" />
              </button>
            </div>
          </article>
        </section>

        {/* 2. PLATFORM OVERVIEW (Asymmetrical Typography) */}
        <section id="overview" className="py-24 md:py-40 px-6 md:px-12 max-w-[1536px] mx-auto border-x border-b border-nocturnal/30 bg-[#0a1318] relative">
          <div className="absolute top-0 right-12 w-[1px] h-24 md:h-32 bg-nocturnal/30 hidden md:block"></div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20 items-end">
            <div className="md:col-span-8">
              <h2 className="fluid-section-title font-mono font-extrabold uppercase text-powder leading-[0.9]">
                Engineered for <br/> Absolute <span className="text-nocturnal">Precision</span>.
              </h2>
            </div>
            <div className="md:col-span-4 border-l-2 border-nocturnal/40 pl-6 relative group">
              <div className="absolute left-[-2px] top-0 bottom-0 w-[2px] bg-mint origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-1000"></div>
              <p className="font-sans text-sm md:text-base text-powder/80 leading-relaxed font-medium">
                We discarded conventional cloud abstraction layers. IROX provides bare-metal access orchestrated by an autonomous intelligence, eliminating hypervisor overhead and network latency.
              </p>
              <a href="#" className="mt-8 inline-flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-widest text-mint hover:text-powder border-b border-mint pb-1 transition-colors">
                Read Whitepaper <ArrowTrendingUpIcon className="w-3 h-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
              </a>
            </div>
          </div>
        </section>

        {/* 3. ENTERPRISE METRICS */}
        <section className="py-24 md:py-32 bg-[#0B151A] text-powder border-y border-nocturnal/20 relative overflow-hidden border-x border-nocturnal/20">
          {/* Subtle noise/grid overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(17,76,90,0.1)_0%,transparent_70%)]"></div>
          
          <div className="max-w-[1536px] mx-auto px-6 md:px-12 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20">
              <div ref={tbpsRef}>
                <div className="font-mono text-[10px] text-mint uppercase tracking-[0.2em] mb-4">Total Network Throughput</div>
                <div className="fluid-massive-metric font-mono font-extrabold text-powder tracking-tighter">{tbpsCount}<span className="text-forsythia text-3xl sm:text-5xl md:text-8xl alignment-baseline-top">TB/s</span></div>
              </div>
              <div className="flex flex-col justify-end" ref={uptimeRef}>
                 <div className="font-mono text-[10px] text-mint uppercase tracking-[0.2em] mb-4">Uptime SLA</div>
                <div className="fluid-massive-metric font-mono font-extrabold text-powder tracking-tighter">{uptimeCount}<span className="text-mint text-3xl sm:text-5xl md:text-8xl">%</span></div>
              </div>
            </div>
          </div>
          
          <div className="absolute bottom-0 left-0 w-full border-t border-nocturnal/40 py-4 md:py-6 overflow-hidden bg-noir">
            <div className="whitespace-nowrap animate-ticker flex gap-12 md:gap-20 font-mono text-[10px] md:text-[12px] font-bold uppercase tracking-widest text-powder/50">
              <span>SOC2 TYPE II VERIFIED</span>
              <span className="text-forsythia">•</span>
              <span>AES-256 GCM ENCRYPTION</span>
              <span className="text-forsythia">•</span>
              <span>ISO 27001 COMPLIANT</span>
              <span className="text-forsythia">•</span>
              <span>GDPR READY</span>
              <span className="text-forsythia">•</span>
              <span>FEDRAMP MODERATE</span>
              <span className="text-forsythia">•</span>
              <span>SOC2 TYPE II VERIFIED</span>
            </div>
          </div>
        </section>

        {/* 4. INTERACTIVE FEATURE SHOWCASE */}
        <StickyGridShowcase />

        {/* 5. RESPONSIVE BENTO GRID */}
        <section id="infrastructure" aria-label="Technical Infrastructure" className="py-24 md:py-32 px-6 md:px-12 border-b border-nocturnal/30 bg-[#0a1318] max-w-[1536px] mx-auto border-x border-nocturnal/20">
          <div className="mb-16 md:mb-20 max-w-3xl">
            <h2 className="fluid-section-title font-mono font-extrabold uppercase text-powder">
              Data Pipeline <span className="text-nocturnal block md:inline">Telemetry</span>
            </h2>
            <p className="font-sans text-sm md:text-base text-powder/80 mt-4 md:mt-6 leading-relaxed border-l-2 border-nocturnal/40 pl-4 font-medium">
              Zero-trust ingress architecture coupled with autonomous thermal suppression systems, ensuring absolute processing integrity across all IROX federated nodes.
            </p>
          </div>
          <BentoAccordion />
        </section>

        {/* 6. AI WORKFLOW VISUALIZATION (CSS Timeline) */}
        <section className="py-24 md:py-32 px-6 md:px-12 border-b border-nocturnal/30 bg-[#0B151A] max-w-[1536px] mx-auto border-x border-nocturnal/20">
           <div className="max-w-4xl mx-auto relative group">
             <div className="text-center mb-16 md:mb-24">
               <h2 className="font-mono text-2xl md:text-3xl font-extrabold uppercase text-powder mb-4">Ingestion Sequence</h2>
               <p className="font-mono text-xs text-mint uppercase tracking-widest">Deterministic execution from edge to core.</p>
             </div>

             <div className="relative timeline-line space-y-12 md:space-y-16 pb-8">
                {[
                  { step: "01", title: "Edge Authentication", desc: "Mutual TLS 1.3 verification at the network edge." },
                  { step: "02", title: "Vector Tokenization", desc: "Data is embedded into high-dimensional vectors instantly." },
                  { step: "03", title: "Neural Orchestration", desc: "AI dynamically provisions compute resources based on vector density." },
                  { step: "04", title: "Cold Storage Federation", desc: "Processed assets are encrypted and distributed across 3 global regions." }
                ].map((item, i) => (
                  <div key={i} className="relative z-10 flex gap-6 md:gap-12 items-start hover:-translate-y-1 transition-transform duration-300">
                    <div className="w-10 h-10 md:w-12 md:h-12 shrink-0 border-2 border-mint bg-[#0a1318] rounded-full flex items-center justify-center font-mono text-[10px] font-bold text-mint shadow-md kinetic-pulse" style={{animationDelay: `${i * 0.2}s`}}>
                      {item.step}
                    </div>
                    <div className="pt-1 md:pt-2">
                      <h4 className="font-mono text-base md:text-lg font-extrabold uppercase text-powder mb-2">{item.title}</h4>
                      <p className="font-sans text-sm text-powder/70 font-medium">{item.desc}</p>
                    </div>
                  </div>
                ))}
             </div>
           </div>
        </section>

        {/* 7. PRICING MATRIX */}
        <section id="tariffs" aria-label="Compute Pricing" className="py-24 md:py-32 px-6 md:px-12 border-b border-nocturnal/30 bg-noir max-w-[1536px] mx-auto border-x border-nocturnal/20">
          <Pricing />
        </section>

        {/* 8. CUSTOMER TESTIMONIALS */}
        <section className="py-24 md:py-40 px-6 md:px-12 border-b border-nocturnal/30 bg-[#050A0D] max-w-[1536px] mx-auto border-x border-nocturnal/20 flex flex-col items-center text-center">
           <div className="mb-12 md:mb-16">
             <IroxLogoIcon className="w-10 h-10 text-mint/40 kinetic-rotate" />
           </div>
           <blockquote className="max-w-4xl hover:scale-105 transition-transform duration-700 ease-out px-4 md:px-0">
             <p className="font-sans text-2xl sm:text-3xl md:text-5xl text-powder font-medium leading-[1.3] md:leading-[1.2] tracking-tight mb-8 md:mb-12">
               "IROX completely eliminated our database abstraction overhead. We are processing 4PB of telemetry daily with latency we previously thought violated physics."
             </p>
             <footer className="font-mono">
               <div className="text-xs md:text-sm font-extrabold text-mint uppercase tracking-wider">SARAH JENKINS</div>
               <div className="text-[9px] md:text-[10px] text-powder/50 uppercase tracking-widest mt-1">VP Engineering, Quantum Financial</div>
             </footer>
           </blockquote>
        </section>

        {/* 9. FAQ */}
        <section className="py-24 md:py-32 px-6 md:px-12 border-b border-nocturnal/30 bg-[#0a1318] max-w-[1536px] mx-auto border-x border-nocturnal/20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-4">
              <h2 className="font-mono text-2xl md:text-3xl font-extrabold uppercase text-powder mb-4">Operations<br className="hidden md:block" />Briefing</h2>
              <p className="font-mono text-[10px] text-mint uppercase tracking-widest">System parameters & constraints.</p>
            </div>
            <div className="md:col-span-8 flex flex-col gap-0 border-t border-nocturnal/40">
              {faqs.map((faq, i) => {
                const isOpen = activeFaq === i;
                return (
                  <article key={i} className="border-b border-nocturnal/40">
                    <button 
                      onClick={() => setActiveFaq(isOpen ? null : i)}
                      className="w-full py-6 md:py-8 flex items-center justify-between text-left focus:outline-none group"
                    >
                      <h3 className="font-mono text-xs md:text-sm font-bold uppercase text-powder tracking-wide group-hover:text-mint transition-colors pr-4">{faq.q}</h3>
                      <ChevronDownIcon className={`w-5 h-5 text-nocturnal transition-transform duration-400 shrink-0 ${isOpen ? 'rotate-180 text-mint' : ''}`} />
                    </button>
                    <div 
                      className="accordion-content grid"
                      style={{ gridTemplateRows: isOpen ? '1fr' : '0fr', opacity: isOpen ? 1 : 0 }}
                    >
                      <div className="overflow-hidden">
                        <p className="pb-6 md:pb-8 font-sans text-sm md:text-base text-powder/80 font-medium leading-relaxed pr-8">
                          {faq.a}
                        </p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* 10. CALL TO ACTION */}
        <section className="py-24 md:py-40 px-6 md:px-12 bg-[#050A0D] text-powder text-center border-b border-nocturnal/40 max-w-[1536px] mx-auto border-x border-nocturnal/20 group overflow-hidden">
          <h2 className="fluid-section-title font-mono font-extrabold uppercase mb-6 md:mb-8 text-powder relative z-10">
            Initialize <br/> <span className="text-nocturnal">Deployment</span>.
          </h2>
          <p className="font-sans text-base md:text-lg text-powder/70 mb-10 md:mb-12 max-w-xl mx-auto font-medium relative z-10">
            Bypass the waiting list. Provision a dedicated Sandbox Node instantly and begin federating data within 45 seconds.
          </p>
          <button className="px-10 py-4 md:px-12 md:py-5 bg-forsythia text-noir font-mono text-[10px] md:text-xs font-extrabold uppercase tracking-widest hover:bg-powder hover:-translate-y-2 hover:scale-105 transition-all duration-300 shadow-[0_0_30px_rgba(255,200,1,0.2)] relative z-10">
            Deploy Node 01
          </button>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="w-full bg-noir pt-16 md:pt-20 pb-12 z-10 relative">
        <div className="max-w-[1536px] mx-auto px-6 md:px-12 border-x border-nocturnal/30">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 mb-16 md:mb-20 font-mono text-[10px] uppercase tracking-widest text-powder/50 font-bold">
            <div>
              <div className="flex items-center gap-2 text-powder mb-6">
                <IroxLogoIcon className="w-5 h-5 kinetic-rotate" /> IROX
              </div>
              <p className="pr-8 md:pr-0">Autonomous infrastructure for the AI era.</p>
            </div>
            <div className="flex flex-col gap-4">
              <div className="text-powder mb-2">Platform</div>
              <a href="#" className="hover:text-mint transition-colors">Orchestration</a>
              <a href="#" className="hover:text-mint transition-colors">Telemetry</a>
              <a href="#" className="hover:text-mint transition-colors">Tariffs</a>
            </div>
            <div className="flex flex-col gap-4">
              <div className="text-powder mb-2">Corporate</div>
              <a href="#" className="hover:text-mint transition-colors">Investors</a>
              <a href="#" className="hover:text-mint transition-colors">Careers</a>
              <a href="#" className="hover:text-mint transition-colors">Contact</a>
            </div>
            <div className="flex flex-col gap-4">
              <div className="text-powder mb-2">System Status</div>
              <div className="flex items-center gap-2 text-mint">
                <span className="w-1.5 h-1.5 bg-mint rounded-full shadow-[0_0_10px_rgba(209,235,226,0.8)] kinetic-pulse"></span> All Systems Operational
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center font-mono text-[9px] text-nocturnal uppercase tracking-widest pt-8 border-t border-nocturnal/30 gap-6 md:gap-0 font-bold">
            <p className="text-center md:text-left">&copy; {new Date().getFullYear()} IROX TECHNOLOGIES INC. SEC CIK: 0001234567</p>
            <div className="flex gap-6 md:gap-8 flex-wrap justify-center">
              <a href="#" className="hover:text-powder transition-colors">Privacy</a>
              <a href="#" className="hover:text-powder transition-colors">Compliance</a>
              <a href="#" className="hover:text-powder transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
