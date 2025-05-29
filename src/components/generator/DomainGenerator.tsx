/**
 * DomainGenerator React component
 *
 * Provides a beautiful UI for generating creative, available domain names using Google Gemini AI.
 * Users can describe their idea, select a name type and TLDs, and receive AI-generated, available domain suggestions.
 *
 * The component sends a prompt to a secure Next.js API route, which calls Gemini and returns results.
 *
 * - All AI and API key logic is handled server-side for security.
 * - Results are parsed and displayed in a styled, modern interface.
 */
'use client';

import { Textarea } from "@heroui/input";
import { Button } from "@heroui/button";
import { useState } from "react";
import NameTypeSelector from "./NameTypeSelector";
import TldSelector from "./TldSelector";
import DomainResults from "./DomainResults";

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
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const toggleTld = (tld: string) => {
    setSelectedTlds((prev) =>
      prev.includes(tld) ? prev.filter((x) => x !== tld) : [...prev, tld]
    );
  };

  // Helper: Build prompt for Gemini
  const buildPrompt = () => {
    return `Generate 10 creative domain name ideas as a JSON array of objects, without checking availability.

Description: ${input}
Name type: ${nameTypes.find(t => t.key === selectedNameType)?.title} (Generate names that fit this style. For example: ${nameTypes.find(t => t.key === selectedNameType)?.example})
TLDs: ${selectedTlds.join(", ")} (Each domain name should use one of these TLDs.)

Return an array of objects with this format: { domain: string }.

Example response:\n[\n  { "domain": "myaiapp.com" },\n  { "domain": "smartaiplanner.io" }\n]`;
  };

  /**
   * Handles the domain generation process:
   * - Builds the prompt
   * - Calls the secure API route
   * - Parses and displays results or errors
   */
  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    setResults([]);
    try {
      const prompt = buildPrompt();
      const res = await fetch('/api/generate-domains', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'API error');
      let domains = [];
      try {
        if (!data.domains && !data.text) throw new Error('No response from API');
        // If the backend returns domains (after Domainr check), use that
        if (data.domains) {
          domains = data.domains;
        } else {
          // Fallback: parse Gemini's raw text (for dev/testing)
          const ideas = JSON.parse(data.text);
          domains = ideas.map((item: any) => ({ domain: item.domain, available: true }));
        }
      } catch {
        setError('Could not parse API response. Try again.');
        setLoading(false);
        return;
      }
      setResults(domains);
    } catch (e: any) {
      setError(e.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
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
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="💡 Describe your idea or keywords"
          className="w-full max-w-lg mb-5 rounded-xl border-2 border-blue-400/60 bg-white/10 text-white placeholder:text-blue-200 focus:ring-2 focus:ring-blue-400 focus:border-blue-500 shadow-lg transition-all duration-200 font-mono text-lg"
          rows={4}
        />
        <NameTypeSelector
          nameTypes={nameTypes}
          selectedNameType={selectedNameType}
          setSelectedNameType={setSelectedNameType}
        />
        <TldSelector
          tldOptions={tldOptions}
          selectedTlds={selectedTlds}
          toggleTld={toggleTld}
        />
        <div className="w-full flex justify-center">
          <Button
            className={`w-full max-w-lg py-3 rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-bold text-lg shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-200 border-none relative overflow-hidden ${loading ? 'animate-pulse bg-gradient-to-r from-blue-700 via-purple-700 to-pink-700' : ''}`}
            color="primary"
            onClick={handleGenerate}
            disabled={loading || !input.trim()}
          >
            {loading && (
              <span className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                <span className="w-6 h-6 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin mr-2"></span>
                <span className="text-blue-100 font-semibold animate-pulse">Generating...</span>
              </span>
            )}
            <span className={`flex items-center gap-2 ${loading ? 'opacity-0' : 'opacity-100'}`}>
              <svg className="w-5 h-5 animate-pulse" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M12 19V6M5 12l7-7 7 7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Generate Domains
            </span>
          </Button>
        </div>
        <DomainResults results={results} error={error} />
      </div>
    </div>
  );
}