'use client';

import { Textarea } from "@heroui/input";
import { Button } from "@heroui/button";
import { useState } from "react";

export const DomainGenerator = () => {
  const nameTypes = [
    {
      key: "brandable",
      title: "Brandable Names",
      desc: "Unique, catchy names",
      example: "Examples: Google, Quora, Uber",
    },
    {
      key: "two-word",
      title: "Two-Word Combination",
      desc: "Descriptive word pairs",
      example: "Examples: Facebook, YouTube, DoorDash",
    },
    {
      key: "portmanteau",
      title: "Portmanteau",
      desc: "Blending two words",
      example: "Examples: Pinterest, Instagram, Fedex",
    },
    {
      key: "alternate",
      title: "Alternate Spellings",
      desc: "Creative spelling variations",
      example: "Examples: Lyft, Fiverr, Dribbble",
    },
  ];

  const tldOptions = [
    ".com", ".org", ".ai", ".io", ".app", ".co", ".net", ".dev", ".me", ".tech", ".site", ".xyz"
  ];

  const [selectedNameType, setSelectedNameType] = useState("brandable");
  const [selectedTlds, setSelectedTlds] = useState([".com"]);

  const toggleTld = (tld: string) => {
    setSelectedTlds((prev) =>
      prev.includes(tld) ? prev.filter((x) => x !== tld) : [...prev, tld]
    );
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full min-h-screen bg-gradient-to-br from-[#0f2027] via-[#2c5364] to-[#232526] p-6">
      <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8 flex flex-col items-center w-full max-w-xl">
        
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-3 text-white text-center drop-shadow-lg">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Generate creative, available domain names
            </span>
          </h1>
          <p className="text-center font-medium text-white/70">
            powered by <span className="font-semibold text-blue-300">AI</span>
          </p>
        </div>
        
        <Textarea
          placeholder="💡 Describe your idea or keywords"
          className="w-full max-w-lg mb-5 rounded-xl border-2 border-blue-400/60 bg-white/10 text-white placeholder:text-blue-200 focus:ring-2 focus:ring-blue-400 focus:border-blue-500 shadow-lg transition-all duration-200 font-mono text-lg"
          rows={4}
        />

        {/* Name Type Selection */}
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

        {/* TLD Selection */}
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
        
        <div className="w-full flex justify-center">
          <Button
            className="w-full max-w-lg py-3 rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-bold text-lg shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-200 border-none"
            color="primary"
          >
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5 animate-pulse" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M12 19V6M5 12l7-7 7 7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Generate Domains
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
}