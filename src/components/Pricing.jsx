import React, { useEffect, useRef, useMemo, memo, useCallback } from 'react';

const PRICING_MATRIX = {
  tiers: [
    {
      id: 'sandbox',
      name: 'Sandbox Node',
      baseUSD: 1900,
      specs: [
        { label: "Dedicated Power", value: "0.5 MW" },
        { label: "Active Nodes", value: "24" },
        { label: "Network Link", value: "10 Gbps" },
        { label: "Support SLA", value: "24 Hours" }
      ]
    },
    {
      id: 'operations',
      name: 'Operations Cluster',
      baseUSD: 14500,
      popular: true,
      specs: [
        { label: "Dedicated Power", value: "4.2 MW" },
        { label: "Active Nodes", value: "256" },
        { label: "Network Link", value: "40 Gbps" },
        { label: "Support SLA", value: "4 Hours" }
      ]
    },
    {
      id: 'facility',
      name: 'Dedicated Facility',
      baseUSD: 49000,
      specs: [
        { label: "Dedicated Power", value: "12.4+ MW" },
        { label: "Active Nodes", value: "1,024+" },
        { label: "Network Link", value: "100 Gbps" },
        { label: "Support SLA", value: "Dedicated Ops" }
      ]
    }
  ],
  currencies: {
    USD: { symbol: '$', rate: 1.0, label: 'USD ($)' },
    EUR: { symbol: '€', rate: 0.92, label: 'EUR (€)' },
    INR: { symbol: '₹', rate: 83.0, label: 'INR (₹)' }
  },
  discount: 0.20
};

const Pricing = memo(function Pricing() {
  const priceRefs = {
    sandbox: useRef(null),
    operations: useRef(null),
    facility: useRef(null)
  };

  const symbolRefs = {
    sandbox: useRef(null),
    operations: useRef(null),
    facility: useRef(null)
  };

  const billingLabelRefs = {
    sandbox: useRef(null),
    operations: useRef(null),
    facility: useRef(null)
  };

  const billingCheckboxRef = useRef(null);
  const activeCurrencyRef = useRef('USD'); 

  const currencyBtnRefs = {
    USD: useRef(null),
    EUR: useRef(null),
    INR: useRef(null)
  };

  const { tiers, currencies, discount } = useMemo(() => PRICING_MATRIX, []);

  const calculatePrice = useCallback((baseUSD, currencyCode, isAnnual) => {
    const currency = currencies[currencyCode];
    let price = baseUSD * currency.rate;
    if (isAnnual) price = price * (1 - discount);
    return Math.round(price).toLocaleString();
  }, [currencies, discount]);

  const updatePrices = useCallback(() => {
    if (!billingCheckboxRef.current) return;
    const isAnnual = billingCheckboxRef.current.checked;
    const currencyCode = activeCurrencyRef.current;
    const currencyData = currencies[currencyCode];

    tiers.forEach((tier) => {
      const calculated = calculatePrice(tier.baseUSD, currencyCode, isAnnual);
      
      if (priceRefs[tier.id].current) {
        priceRefs[tier.id].current.textContent = calculated;
      }
      if (symbolRefs[tier.id].current) {
        symbolRefs[tier.id].current.textContent = currencyData.symbol;
      }
      if (billingLabelRefs[tier.id].current) {
        billingLabelRefs[tier.id].current.textContent = isAnnual 
          ? `BILLED ANNUALLY (-20%)` 
          : `BILLED MONTHLY`;
      }
    });
  }, [tiers, currencies, calculatePrice]);

  const handleCurrencyChange = useCallback((currencyCode) => {
    if (activeCurrencyRef.current === currencyCode) return;
    
    const oldCode = activeCurrencyRef.current;
    if (currencyBtnRefs[oldCode].current) {
      currencyBtnRefs[oldCode].current.className = "px-4 py-2 font-mono text-[10px] uppercase tracking-wider text-powder/50 hover:text-powder transition-colors duration-150 bg-transparent";
    }
    
    activeCurrencyRef.current = currencyCode;
    if (currencyBtnRefs[currencyCode].current) {
      currencyBtnRefs[currencyCode].current.className = "px-4 py-2 font-mono text-[10px] uppercase tracking-wider bg-powder text-noir font-bold transition-colors duration-150 shadow-sm rounded-sm";
    }

    updatePrices();
  }, [updatePrices]);

  useEffect(() => {
    updatePrices();
    const checkbox = billingCheckboxRef.current;
    const handleCheckboxChange = () => updatePrices();

    if (checkbox) checkbox.addEventListener('change', handleCheckboxChange);
    return () => {
      if (checkbox) checkbox.removeEventListener('change', handleCheckboxChange);
    };
  }, [updatePrices]);

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row items-end md:items-center justify-between gap-6 mb-16 border-b border-nocturnal/40 pb-8">
        <div className="w-full md:w-auto text-left max-w-2xl">
          <h2 className="fluid-section-title font-mono font-extrabold uppercase text-powder">Compute <span className="text-nocturnal">Tariffs</span></h2>
          <p className="font-sans text-base text-powder/80 mt-4 leading-relaxed border-l-2 border-nocturnal/40 pl-4">Dynamic facility leasing metrics mapped to global node availability. Transparent hardware allocation costs with no hidden ingress fees.</p>
        </div>

        <div className="flex flex-col sm:flex-row items-end sm:items-center gap-6 w-full md:w-auto mt-8 md:mt-0">
          <div className="flex bg-nocturnal/10 backdrop-blur-md border border-nocturnal/30 premium-shadow rounded-sm p-1">
            {Object.keys(currencies).map((code) => (
              <button 
                key={code}
                ref={currencyBtnRefs[code]} 
                onClick={() => handleCurrencyChange(code)} 
                className={code === 'USD' 
                  ? "px-4 py-2 font-mono text-[10px] uppercase tracking-wider bg-powder text-noir font-bold transition-colors duration-150 shadow-sm rounded-sm"
                  : "px-4 py-2 font-mono text-[10px] uppercase tracking-wider text-powder/50 hover:text-powder transition-colors duration-150 bg-transparent rounded-sm"
                }
              >
                {code}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 bg-nocturnal/10 backdrop-blur-md border border-nocturnal/30 premium-shadow rounded-sm px-5 py-2.5">
            <span className="font-mono text-[10px] uppercase tracking-wider text-powder/70 font-semibold">MTH</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" ref={billingCheckboxRef} className="sr-only peer" />
              <div className="w-10 h-5 bg-nocturnal/30 border border-nocturnal/50 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-powder after:border-nocturnal/20 after:border after:rounded-full after:h-[14px] after:w-[16px] after:transition-transform peer-checked:bg-mint transition-colors duration-300"></div>
            </label>
            <span className="font-mono text-[10px] uppercase tracking-wider text-mint font-bold flex items-center gap-2">
              ANN <span className="bg-mint/10 text-mint px-1.5 py-0.5 border border-mint/20 rounded-sm">-20%</span>
            </span>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
        {tiers.map((tier) => (
          <article key={tier.id} className="relative flex flex-col justify-between bg-[#0a1318] border border-nocturnal/30 p-8 md:p-10 hover:-translate-y-1 transition-transform duration-300 premium-shadow rounded-sm">
            {tier.popular && (
              <div className="absolute -top-3 -right-2 bg-forsythia text-noir font-mono text-[9px] font-bold px-3 py-1.5 uppercase tracking-widest shadow-[0_0_15px_rgba(255,200,1,0.3)]">
                Highest Capacity
              </div>
            )}
            
            <div className="mb-8">
              <div className="font-mono text-[10px] text-mint uppercase tracking-widest mb-3 flex items-center gap-2 font-bold">
                <span className="w-1.5 h-1.5 bg-mint/50 rounded-full"></span> 
                Tier // 0{tier.id === 'sandbox' ? '1' : tier.id === 'operations' ? '2' : '3'}
              </div>
              <h3 className="font-mono text-2xl font-extrabold uppercase text-powder">{tier.name}</h3>
            </div>

            <div className="mb-10 border-y border-nocturnal/30 py-8 bg-nocturnal/10 -mx-8 px-8 md:-mx-10 md:px-10">
              <div className="flex items-baseline gap-1">
                <span ref={symbolRefs[tier.id]} className="font-mono text-2xl text-mint/50 font-medium">$</span>
                <span ref={priceRefs[tier.id]} className="font-mono text-5xl font-extrabold tracking-tighter text-powder">-</span>
              </div>
              <div ref={billingLabelRefs[tier.id]} className="font-mono text-[10px] text-mint uppercase tracking-widest mt-2 font-medium">
                BILLED MONTHLY
              </div>
            </div>

            <div className="flex-1 mb-10">
              <table className="w-full text-left font-mono text-[11px] md:text-xs">
                <tbody>
                  {tier.specs.map((spec, sIdx) => (
                    <tr key={sIdx} className="border-b border-nocturnal/20 last:border-0">
                      <td className="py-3.5 text-powder/50">{spec.label}</td>
                      <td className="py-3.5 text-powder text-right font-bold">{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <button className={`w-full py-4 font-mono text-xs uppercase tracking-widest font-extrabold transition-all duration-300 border rounded-sm ${
              tier.popular 
                ? 'bg-forsythia text-noir border-forsythia hover:bg-powder shadow-[0_0_15px_rgba(255,200,1,0.15)] hover:shadow-[0_0_20px_rgba(241,240,244,0.3)]' 
                : 'bg-transparent text-powder border-nocturnal/40 hover:border-powder hover:bg-nocturnal/20'
            }`}>
              Request Allocation
            </button>
          </article>
        ))}
      </div>
    </div>
  );
});

export default Pricing;
