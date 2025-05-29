'use client';

import { Textarea } from "@heroui/input";
import { Button } from "@heroui/button";

export const DomainGenerator = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full min-h-screen bg-gradient-to-br from-[#0f2027] via-[#2c5364] to-[#232526] p-6">
      <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8 flex flex-col items-center w-full max-w-xl">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-3 text-white text-center drop-shadow-lg">
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Generate creative, available domain names
          </span>
          <br />
          <span className="text-base font-medium text-white/70">
            powered by <span className="font-semibold text-blue-300">AI</span>
          </span>
        </h1>
        <Textarea
          placeholder="💡 Describe your idea or keywords (e.g. 'AI travel planner', 'smart recipes')"
          className="w-full max-w-lg mb-5 rounded-xl border-2 border-blue-400/60 bg-white/10 text-white placeholder:text-blue-200 focus:ring-2 focus:ring-blue-400 focus:border-blue-500 shadow-lg transition-all duration-200 font-mono text-lg"
          rows={4}
        />
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
        <div className="mt-6 text-xs text-white/50 text-center">
          Powered by AI. Enter a description and get creative, available domain ideas instantly!
        </div>
      </div>
    </div>
  );
}