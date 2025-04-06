"use client"

import { ExternalLink, HelpCircle, X, Link } from "lucide-react"
import { SavingPlan } from '../types/types.ts';


interface SavingPlanModalProps {
  plan: SavingPlan
  onClose: () => void
}

export default function SavingPlanModal({ plan, onClose }: SavingPlanModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose}></div>

      {/* Modal */}
      <div className="bg-gradient-to-br from-[#4d3c60] to-[#2d1e3e] rounded-xl border border-[#4d3c60] shadow-2xl w-full max-w-lg relative z-10 animate-fade-in">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-full hover:bg-[#4d3c60]/50 transition-colors z-20"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Plan image */}
        <div className="relative h-48">
          {/*<Image src={plan.image || "/placeholder.svg"} alt={plan.name} className="object-cover rounded-t-xl" />*/}
          <div className="absolute inset-0 bg-gradient-to-t from-[#2d1e3e] to-transparent"></div>
        </div>

        {/* Plan details */}
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">{plan.name}</h2>

          {/* Progress bar */}
          <div className="mb-6">
            <div className="flex justify-between text-sm mb-1">
              <span>Progress: {plan.progress}%</span>
              <span>
                ${plan.current} of ${plan.target}
              </span>
            </div>
            <div className="w-full bg-[#2d1e3e] rounded-full h-3">
              <div className="bg-[#0fe0b6] h-3 rounded-full" style={{ width: `${plan.progress}%` }}></div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Description</h3>
            <p className="text-gray-300">{plan.description}</p>
          </div>

          {/* Investment Strategy */}
          <div className="mb-6 bg-[#2d1e3e] p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-2">Investment Strategy</h3>
            <div className="flex justify-between items-center mb-2">
              <div>
                <p className="font-medium">{plan.strategy.name}</p>
                <p className="text-sm text-gray-300">
                  Current APY: <span className="text-[#0fe0b6]">{plan.strategy.apy}%</span>
                </p>
              </div>
              <Link
                href={plan.strategy.providerUrl}
                target="_blank"
                className="flex items-center gap-1 text-sm text-[#0fe0b6] hover:underline"
              >
                {plan.strategy.provider} <ExternalLink className="h-3 w-3" />
              </Link>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 mb-4">
            <button className="flex-1 px-4 py-3 bg-[#0fe0b6] hover:bg-[#0cc9a3] text-[#2d1e3e] font-medium rounded-md transition-colors">
              Add Funds
            </button>
            <button className="flex-1 px-4 py-3 bg-[#ff6b8b]/20 hover:bg-[#ff6b8b]/30 text-[#ff6b8b] transition-colors rounded-md font-medium border border-[#ff6b8b]/30">
              End Strategy
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
        </div>
      </div>
    </div>
  )
}

