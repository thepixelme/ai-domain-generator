import React from "react";

interface NameType {
  key: string;
  title: string;
  desc: string;
  example: string;
}

interface NameTypeSelectorProps {
  nameTypes: NameType[];
  selectedNameType: string;
  setSelectedNameType: (key: string) => void;
}

const NameTypeSelector: React.FC<NameTypeSelectorProps> = ({ nameTypes, selectedNameType, setSelectedNameType }) => (
  <div className="w-full mb-6">
    <div className="text-white font-semibold mb-2 text-lg">Name Type</div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {nameTypes.map((type) => (
        <button
          key={type.key}
          type="button"
          onClick={() => setSelectedNameType(type.key)}
          className={`text-left rounded-xl p-4 transition-all border-2 shadow-md backdrop-blur-md bg-white/10 hover:bg-white/20 focus:outline-none font-mono
            ${selectedNameType === type.key
              ? "border-blue-500 bg-gradient-to-r from-blue-600/80 to-purple-600/80 text-white shadow-xl scale-[1.03]"
              : "border-white/20 text-white/80"}
          `}
        >
          <div className="font-bold text-base mb-1">{type.title}</div>
          <div className="text-sm mb-1 text-white/80">{type.desc}</div>
          <div className="text-xs text-blue-200 italic">{type.example}</div>
        </button>
      ))}
    </div>
  </div>
);

export default NameTypeSelector;
