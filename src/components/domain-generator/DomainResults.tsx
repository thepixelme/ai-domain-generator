import React from "react";

interface DomainResult {
  domain: string;
  available: boolean;
}

interface DomainResultsProps {
  results: DomainResult[];
  error: string | null;
}

const DomainResults: React.FC<DomainResultsProps> = ({ results, error }) => (
  <div className="w-full mt-8">
    {error && <div className="text-red-400 text-center mb-4">{error}</div>}
    {results.length > 0 && (
      <div className="grid grid-cols-1 gap-3">
        {results.map((item, idx) => (
          <div key={item.domain + idx} className={`flex items-center justify-between px-4 py-3 rounded-xl border-2 shadow-md font-mono text-lg transition-all
            ${item.available ? "border-green-400 bg-green-900/30 text-green-200" : "border-red-400 bg-red-900/30 text-red-200"}
          `}>
            <span>{item.domain}</span>
            <span className={`ml-4 px-2 py-1 rounded text-xs font-bold
              ${item.available ? "bg-green-500/80 text-white" : "bg-red-500/80 text-white"}
            `}>
              {item.available ? "Available" : "Taken"}
            </span>
          </div>
        ))}
      </div>
    )}
  </div>
);

export default DomainResults;
