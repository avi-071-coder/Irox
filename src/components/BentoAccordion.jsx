import React, { useState, useEffect } from 'react';
import { 
  ChartPieIcon, 
  LinkIcon, 
  ArrowTrendingUpIcon, 
  Cube16SolidIcon, 
  ChevronDownIcon 
} from './Icons';

export default function BentoAccordion() {
  const [activeIndex, setActiveIndex] = useState(0);
  
  useEffect(() => {
    const handleResize = () => {
      setActiveIndex(prev => prev);
    };
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const features = [
    {
      title: "Data Lake Ingestion",
      subtitle: "Autonomous Stream Processing",
      description: "Neural network parsing of unstructured telemetry. Capable of ingesting 14 million records per second with absolute deterministic validation.",
      details: ["Throughput: 14M/sec", "Latency: 1.2ms", "Validation: Strict"],
      icon: <Cube16SolidIcon className="w-5 h-5 text-powder" />,
      colSpan: "md:col-span-2",
      visual: (
        <div className="w-full h-full bg-[#0a1318] border-t border-nocturnal/30 p-6 md:p-8 font-mono flex flex-col justify-end relative overflow-hidden">
          <div className="absolute top-4 left-6 text-[10px] text-mint font-bold uppercase tracking-widest flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-mint rounded-full animate-pulse shadow-[0_0_10px_rgba(209,235,226,0.5)]"></span> INGESTION_RATE
          </div>
          <div className="absolute top-4 right-6 text-[10px] text-powder/40 uppercase tracking-widest font-bold">
            PETABYTES/HR
          </div>
          
          <div className="flex items-end gap-1.5 h-32 w-full mt-10">
            {[40, 20, 60, 45, 80, 55, 90, 75, 100, 85, 95, 60, 80, 50, 70].map((height, i) => (
              <div 
                key={i} 
                className={`flex-1 rounded-t-sm ${i > 10 ? 'bg-mint shadow-[0_0_15px_rgba(209,235,226,0.2)]' : 'bg-nocturnal/40'} transition-all duration-1000`}
                style={{ 
                  height: `${height}%`,
                  animation: `fadeIn 0.5s ease-out ${i * 0.05}s both`
                }}
              ></div>
            ))}
          </div>
        </div>
      )
    },
    {
      title: "Zero-Trust Mesh",
      subtitle: "AES-GCM-256 Tokenization",
      description: "Data payloads never reach persistent storage in plaintext. Hardware-level encryption applied at the edge.",
      details: ["Standard: AES-256", "Key Rot: 24h", "SOC2 Compliant"],
      icon: <LinkIcon className="w-5 h-5 text-powder" />,
      colSpan: "md:col-span-1",
      visual: (
        <div className="w-full h-full bg-[#0a1318] border-t border-nocturnal/30 p-6 md:p-8 font-mono flex flex-col justify-center items-center">
          <div className="text-[10px] text-powder/50 font-bold uppercase tracking-widest mb-5 w-full text-left">
            Cryptographic Log
          </div>
          <div className="w-full border border-nocturnal/30 bg-noir p-4 space-y-3 premium-shadow rounded-sm">
            <div className="text-[10px] text-mint font-medium overflow-hidden whitespace-nowrap">
              [SYSTEM] INITIATE HANDSHAKE
            </div>
            <div className="text-[10px] text-powder/40 font-medium overflow-hidden whitespace-nowrap border-y border-nocturnal/20 py-1">
              VERIFY_CERT: 0x8F92A...
            </div>
            <div className="text-[10px] text-forsythia font-bold overflow-hidden whitespace-nowrap animate-pulse drop-shadow-[0_0_5px_rgba(255,200,1,0.5)]">
              ENCRYPT: SUCCESS (2ms)
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Thermal Suppression",
      subtitle: "Predictive PUE Optimization",
      description: "AI-driven thermal regulation predicts hardware heat-spikes before they occur, keeping data center PUE below 1.12.",
      details: ["PUE Target: 1.12", "Cooling: Liquid", "Uptime: 99.999%"],
      icon: <ArrowTrendingUpIcon className="w-5 h-5 text-powder" />,
      colSpan: "md:col-span-1",
      visual: (
        <div className="w-full h-full bg-[#0a1318] border-t border-nocturnal/30 p-6 md:p-8 font-mono flex flex-col justify-end">
          <div className="text-[10px] text-saffron font-bold uppercase tracking-widest mb-auto w-full text-left drop-shadow-[0_0_5px_rgba(255,153,50,0.5)]">
            THERMAL ANOMALY
          </div>
          
          <div className="w-full h-1 bg-nocturnal/30 relative mb-4 rounded-full">
            <div className="absolute left-0 bottom-0 w-2/3 h-full bg-gradient-to-r from-mint to-saffron rounded-l-full"></div>
            <div className="absolute right-[33%] -bottom-1.5 w-1 h-4 bg-powder shadow-[0_0_10px_rgba(241,240,244,0.5)]"></div>
          </div>
          <div className="flex justify-between text-[10px] font-bold text-powder/40">
            <span>NOMINAL</span>
            <span className="text-saffron">CRITICAL</span>
          </div>
        </div>
      )
    },
    {
      title: "Federated Storage",
      subtitle: "Multi-Cloud Hardlines",
      description: "Direct optical interconnects bypassing the public internet to AWS, GCP, and Azure. Total control over data residency.",
      details: ["Bandwidth: 100Gbps", "Tier: 4 Facility", "TLS 1.3 Routing"],
      icon: <ChartPieIcon className="w-5 h-5 text-powder" />,
      colSpan: "md:col-span-2",
      visual: (
        <div className="w-full h-full bg-[#0a1318] border-t border-nocturnal/30 p-6 md:p-8 font-mono flex flex-col items-center justify-center">
          <div className="flex items-center gap-4 w-full">
            <div className="p-3 border border-nocturnal/40 bg-noir shadow-sm font-bold text-[10px] text-powder/50 w-24 text-center rounded-sm">AWS_S3</div>
            <div className="flex-1 h-[2px] bg-nocturnal/20 relative overflow-hidden">
               <div className="absolute inset-0 bg-mint origin-left animate-[ticker_2s_linear_infinite]" style={{ transform: 'scaleX(0.5)' }}></div>
            </div>
            <div className="p-3 border-2 border-forsythia bg-forsythia/10 shadow-[0_0_15px_rgba(255,200,1,0.1)] text-[10px] text-forsythia font-extrabold w-28 text-center rounded-sm">IROX_CORE</div>
            <div className="flex-1 h-[2px] bg-nocturnal/20 relative overflow-hidden">
               <div className="absolute inset-0 bg-mint origin-right animate-[ticker_2s_linear_infinite_reverse]" style={{ transform: 'scaleX(0.5)' }}></div>
            </div>
            <div className="p-3 border border-nocturnal/40 bg-noir shadow-sm font-bold text-[10px] text-powder/50 w-24 text-center rounded-sm">AZURE_DB</div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="w-full mx-auto">
      <div className="hidden md:grid grid-cols-3 gap-6 lg:gap-8">
        {features.map((feature, idx) => (
          <article 
            key={idx}
            className={`group relative bg-[#050A0D] border border-nocturnal/40 rounded-sm p-8 flex flex-col justify-between h-[450px] transition-all duration-300 hover:-translate-y-1 premium-shadow ${feature.colSpan}`}
            onMouseEnter={() => setActiveIndex(idx)}
          >
            <div className={`absolute inset-0 border-2 transition-colors duration-300 pointer-events-none rounded-sm z-10 ${
              activeIndex === idx ? 'border-mint' : 'border-transparent'
            }`}></div>
            
            <div className="flex justify-between items-start z-20">
              <div className="p-2.5 border border-nocturnal/30 bg-nocturnal/10 rounded-sm shadow-sm">
                {feature.icon}
              </div>
              <div className="text-[10px] font-mono font-bold text-nocturnal">
                0{idx + 1} //
              </div>
            </div>

            <div className="my-8 flex-1 flex items-center justify-center border border-nocturnal/30 z-20 overflow-hidden bg-noir rounded-sm">
              {feature.visual}
            </div>

            <div className="z-20">
              <h3 className="font-mono text-xl uppercase tracking-wide text-powder font-extrabold mb-1.5">{feature.title}</h3>
              <p className="text-[11px] text-mint font-mono uppercase font-bold mb-3 tracking-widest">{feature.subtitle}</p>
              <p className="text-sm text-powder/60 leading-relaxed font-sans pr-4 line-clamp-2">
                {feature.description}
              </p>
            </div>
          </article>
        ))}
      </div>

      <div className="md:hidden flex flex-col gap-4">
        {features.map((feature, idx) => {
          const isOpen = activeIndex === idx;
          return (
            <article 
              key={idx}
              className={`bg-[#050A0D] border transition-all duration-300 rounded-sm ${isOpen ? 'border-mint premium-shadow -translate-y-1' : 'border-nocturnal/40 shadow-sm'}`}
            >
              <button
                onClick={() => setActiveIndex(isOpen ? -1 : idx)}
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                aria-expanded={isOpen}
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 border border-nocturnal/30 bg-nocturnal/10 rounded-sm">
                    {feature.icon}
                  </div>
                  <h3 className="text-[13px] font-mono uppercase tracking-widest text-powder font-extrabold">{feature.title}</h3>
                </div>
                <ChevronDownIcon 
                  className={`w-4 h-4 text-nocturnal/80 transition-transform duration-300 ${
                    isOpen ? 'rotate-180 text-mint' : ''
                  }`} 
                />
              </button>

              <div 
                className="accordion-content grid"
                style={{ 
                  gridTemplateRows: isOpen ? '1fr' : '0fr',
                  opacity: isOpen ? 1 : 0
                }}
              >
                <div className="overflow-hidden">
                  <div className="p-6 pt-0">
                    
                    <div className="h-44 my-6 border border-nocturnal/30 rounded-sm overflow-hidden bg-noir">
                      {feature.visual}
                    </div>
                    
                    <p className="text-[11px] text-mint font-mono uppercase font-bold mb-2 tracking-widest">{feature.subtitle}</p>
                    <p className="text-sm text-powder/70 leading-relaxed font-sans mb-6">
                      {feature.description}
                    </p>

                    <div className="grid grid-cols-1 gap-3 border-t border-nocturnal/40 pt-5">
                      {feature.details.map((detail, dIdx) => (
                        <div key={dIdx} className="font-mono text-[10px] uppercase tracking-wider text-powder/50 font-medium">
                          {detail}
                        </div>
                      ))}
                    </div>

                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
