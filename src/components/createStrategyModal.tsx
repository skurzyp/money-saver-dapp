"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle, Info, Link, X } from "lucide-react";
import { Strategy } from '../types/types.ts';

// Sample strategies
const strategies: Strategy[] = [
  {
    name: 'Marinade Liquid Staking', provider: 'Marinade Finance', apy: 6.8,
    providerUrl: '',
  },
  { name: "USDC Lending", provider: "Solend", apy: 4.2, providerUrl: '',},
  { name: "SOL-USDC LP", provider: "Orca", apy: 8.5, providerUrl: '', },
  {  name: "RAY-SOL LP", provider: "Raydium", apy: 12.3, providerUrl: '', },
];

// Sample currencies
const currencies = [
  { id: "usd", name: "USD", symbol: "$" },
  { id: "sol", name: "SOL", symbol: "SOL" },
  { id: "usdc", name: "USDC", symbol: "USDC" },
];

interface CreateStrategyModalProps {
  onClose: () => void;
}

export default function CreateStrategyModal({ onClose }: CreateStrategyModalProps) {
  const [name, setName] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]);
  const [selectedStrategy, setSelectedStrategy] = useState<Strategy | null>(null);
  const [initialAmount, setInitialAmount] = useState("");
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);
  const [showStrategyDropdown, setShowStrategyDropdown] = useState(false);

  // Calculate estimated time to reach goal
  const calculateEstimatedTime = () => {
    if (!selectedStrategy || !targetAmount || !initialAmount) return null;

    const target = Number.parseFloat(targetAmount);
    const initial = Number.parseFloat(initialAmount);

    if (isNaN(target) || isNaN(initial) || initial <= 0 || target <= initial) return null;

    const apy = selectedStrategy.apy / 100;
    const years = Math.log(target / initial) / Math.log(1 + apy);
    const months = Math.ceil(years * 12);

    return months;
  };

  const estimatedMonths = calculateEstimatedTime();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose}></div>

      {/* Modal */}
      <div className="bg-gradient-to-br from-[#4d3c60] to-[#2d1e3e] rounded-xl border border-[#4d3c60] shadow-2xl w-full max-w-lg relative z-10 animate-fade-in max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-full hover:bg-[#4d3c60]/50 transition-colors z-20"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="p-6 border-b border-[#4d3c60]">
          <h2 className="text-2xl font-bold">Create New Saving Plan</h2>
          <p className="text-gray-300 mt-1">Set up your investment strategy and start saving</p>
        </div>

        {/* Form */}
        <div className="p-6">
          <form className="space-y-6">
            {/* Plan Name */}
            <div>
              <label htmlFor="plan-name" className="block text-sm font-medium mb-2">
                Plan Name
              </label>
              <input
                type="text"
                id="plan-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Vacation Fund, New Car, Emergency Fund"
                className="w-full px-4 py-3 bg-[#2d1e3e] border border-[#4d3c60] rounded-md focus:outline-none focus:ring-2 focus:ring-[#0fe0b6] focus:border-transparent"
              />
            </div>

            {/* Target Goal */}
            <div>
              <label htmlFor="target-amount" className="block text-sm font-medium mb-2">
                Target Goal
              </label>
              <div className="relative">
                <input
                  type="number"
                  id="target-amount"
                  value={targetAmount}
                  onChange={(e) => setTargetAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="w-full px-4 py-3 bg-[#2d1e3e] border border-[#4d3c60] rounded-md focus:outline-none focus:ring-2 focus:ring-[#0fe0b6] focus:border-transparent pr-24"
                />
                <div className="absolute inset-y-0 right-0">
                  <button
                    type="button"
                    className="h-full px-4 flex items-center gap-1 border-l border-[#4d3c60] text-gray-300 hover:text-white"
                    onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
                  >
                    {selectedCurrency.symbol} <ChevronDown className="h-4 w-4" />
                  </button>

                  {/* Currency Dropdown */}
                  {showCurrencyDropdown && (
                    <div className="absolute top-full right-0 mt-1 w-32 bg-[#3b2d4d] border border-[#4d3c60] rounded-md shadow-lg z-10">
                      {currencies.map((currency) => (
                        <button
                          key={currency.id}
                          type="button"
                          className="w-full text-left px-4 py-2 hover:bg-[#4d3c60] transition-colors"
                          onClick={() => {
                            setSelectedCurrency(currency);
                            setShowCurrencyDropdown(false);
                          }}
                        >
                          {currency.name} ({currency.symbol})
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Investment Strategy */}
            <div>
              <label htmlFor="strategy" className="block text-sm font-medium mb-2">
                Investment Strategy
              </label>
              <div className="relative">
                <button
                  type="button"
                  id="strategy"
                  className="w-full px-4 py-3 bg-[#2d1e3e] border border-[#4d3c60] rounded-md focus:outline-none focus:ring-2 focus:ring-[#0fe0b6] focus:border-transparent text-left flex justify-between items-center"
                  onClick={() => setShowStrategyDropdown(!showStrategyDropdown)}
                >
                  <span className={selectedStrategy ? "text-white" : "text-gray-500"}>
                    {selectedStrategy ? selectedStrategy.name : "Select a strategy"}
                  </span>
                  <ChevronDown className="h-4 w-4" />
                </button>

                {/* Strategy Dropdown */}
                {showStrategyDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-[#3b2d4d] border border-[#4d3c60] rounded-md shadow-lg z-10">
                    {strategies.map((strategy) => (
                      <button
                        key={strategy.name}
                        type="button"
                        className="w-full text-left px-4 py-3 hover:bg-[#4d3c60] transition-colors border-b border-[#4d3c60] last:border-0"
                        onClick={() => {
                          setSelectedStrategy(strategy);
                          setShowStrategyDropdown(false);
                        }}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="font-medium">{strategy.name}</div>
                            <div className="text-sm text-gray-400">via {strategy.provider}</div>
                          </div>
                          <div className="text-[#0fe0b6] font-medium">{strategy.apy}% APY</div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Estimated Yield */}
            {selectedStrategy && (
              <div className="bg-[#2d1e3e] p-4 rounded-lg">
                <h3 className="text-sm font-medium mb-2 flex items-center gap-1">
                  <Info className="h-4 w-4 text-[#0fe0b6]" /> Estimated Yield
                </h3>
                <p className="text-[#0fe0b6] font-medium text-lg">{selectedStrategy.apy}% APY</p>
                {estimatedMonths && (
                  <p className="text-sm text-gray-300 mt-1">
                    Estimated time to reach goal: <span className="font-medium">{estimatedMonths} months</span>
                  </p>
                )}
              </div>
            )}

            {/* Initial Payment */}
            <div>
              <label htmlFor="initial-amount" className="block text-sm font-medium mb-2">
                Initial Investment
              </label>
              <div className="relative">
                <input
                  type="number"
                  id="initial-amount"
                  value={initialAmount}
                  onChange={(e) => setInitialAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="w-full px-4 py-3 bg-[#2d1e3e] border border-[#4d3c60] rounded-md focus:outline-none focus:ring-2 focus:ring-[#0fe0b6] focus:border-transparent pr-16"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                  <span className="text-gray-400">{selectedCurrency.symbol}</span>
                </div>
              </div>
            </div>

            {/* Disclosure */}
            <div className="bg-[#2d1e3e]/50 p-4 rounded-lg border border-[#4d3c60] text-sm text-gray-300">
              <p className="flex items-start gap-2">
                <Info className="h-4 w-4 mt-0.5 shrink-0 text-[#ff6b8b]" />
                <span>
                  All investment strategies involve risk. Past performance is not indicative of future results. Please
                  read our documentation before investing.
                </span>
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <button
                type="submit"
                className="flex-1 px-4 py-3 bg-[#0fe0b6] hover:bg-[#0cc9a3] text-[#2d1e3e] font-medium rounded-md transition-colors"
              >
                Start Strategy
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-3 bg-white/10 hover:bg-white/20 transition-colors rounded-md text-white font-medium"
              >
                Cancel
              </button>
            </div>

            {/* Documentation Link */}
            <div className="text-center">
              <Link
                href="/docs/strategies"
                className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-[#0fe0b6] transition-colors"
              >
                <HelpCircle className="h-3 w-3" /> Learn more about investment strategies
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
