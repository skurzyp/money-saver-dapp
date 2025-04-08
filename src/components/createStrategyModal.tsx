"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle, Info, Link, X } from "lucide-react";
import { SavingPlan, Strategy } from '../types/types.ts';
import { strategies } from '../lib/sampleData.ts';


interface CreateStrategyModalProps {
  onClose: () => void;
  activeSavingPlans: SavingPlan[] | null;
  setActiveSavingPlans: React.Dispatch<React.SetStateAction<SavingPlan[] | null>>;
}

export default function CreateStrategyModal({ onClose, activeSavingPlans, setActiveSavingPlans }: CreateStrategyModalProps) {
  const [name, setName] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [selectedStrategy, setSelectedStrategy] = useState<Strategy | null>(null);
  const [showStrategyDropdown, setShowStrategyDropdown] = useState(false);

  const isFormValid = name.trim() !== "" && targetAmount.trim() !== "" && selectedStrategy !== null;


  // Calculate estimated time to reach goal
  const calculateEstimatedTime = () => {
    if (!selectedStrategy || !targetAmount) return null;

    const target = Number.parseFloat(targetAmount);

    if (isNaN(target)) return null;

    const apy = selectedStrategy.apy / 100;
    const years = Math.log(target / 100) / Math.log(1 + apy);
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
                <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                  <span className="text-gray-400">{selectedStrategy?.currency[0].symbol}</span>
                </div>
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
                    Estimated time to reach goal starting with 100 {selectedStrategy.currency[0].symbol}: <span className="font-medium">{estimatedMonths>0?estimatedMonths:0} months</span>
                  </p>
                )}
              </div>
            )}

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
                disabled={!isFormValid}
                className={`flex-1 px-4 py-3 font-medium rounded-md transition-colors
                            ${isFormValid
                                          ? 'bg-[#0fe0b6] text-white hover:bg-[#0cc9a3] hover:text-[#0fe0b6]'
                                          : 'bg-[#4d3c60] text-gray-500 cursor-not-allowed'}
                          `}
                onClick={(e) => {
                  e.preventDefault(); // prevent form reload

                  if (!name || !targetAmount || !selectedStrategy) return;

                  const newPlan: SavingPlan = {
                    id: new Date().getTime().toString(),
                    name,
                    target: parseFloat(targetAmount),
                    current: 0, // assume starting amount
                    progress: (100 / parseFloat(targetAmount)) * 100,
                    description: `Investing in ${selectedStrategy.name} via ${selectedStrategy.provider}`,
                    image: '',
                    strategy: selectedStrategy
                  };

                  setActiveSavingPlans([...activeSavingPlans as SavingPlan[], newPlan]);
                  onClose();
                }}
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
