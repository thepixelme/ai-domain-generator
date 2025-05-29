import React from "react";

interface TldSelectorProps {
  tldOptions: string[];
  selectedTlds: string[];
  toggleTld: (tld: string) => void;
}

const TldSelector: React.FC<TldSelectorProps> = ({ tldOptions, selectedTlds, toggleTld }) => (
  <div className="w-full mb-8">
    <div className="text-white font-semibold mb-2 text-lg">TLDs</div>
    <div className="flex flex-wrap gap-2">
      {tldOptions.map((tld) => (
        <button
          key={tld}
          type="button"
          onClick={() => toggleTld(tld)}
          className={`px-3 py-1 rounded-lg font-mono text-sm border-2 transition-all shadow-sm
            ${selectedTlds.includes(tld)
              ? "border-pink-400 bg-gradient-to-r from-blue-500/80 to-pink-500/80 text-white shadow-lg scale-105"
              : "border-white/20 bg-white/10 text-white/70 hover:bg-white/20"}
          `}
        >
          {tld}
        </button>
      ))}
    </div>
  </div>
);

export default TldSelector;
