"use client"

import { useState } from "react"
import { Link, Plus } from 'lucide-react';
import { SavingPlan } from '../types/types.ts';
import SavingPlanModal from '../components/savingPlanModal.tsx';
import CreateStrategyModal from '../components/createStrategyModal.tsx';
import { strategies } from '../lib/sampleData.ts';

// Sample saving plan data
const samplePlan: SavingPlan = {
  id: "1",
  name: "Vacation Fund",
  description:
    "Saving for my dream vacation to Bali next summer. This fund will cover flights, accommodations, and activities for a 2-week stay.",
  progress: 65,
  target: 5000,
  current: 3250,
  image: "/placeholder.svg?height=200&width=400",
  strategy: strategies[0],
}

export default function Dashboard() {
  const [selectedPlan, setSelectedPlan] = useState<SavingPlan>()
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [activeSavingPlans, setActiveSavingPlans] = useState<SavingPlan[] | null>([samplePlan])

  return (
    <div className="min-h-screen min-w-screen bg-gradient-to-b from-[#3b2d4d] to-[#2d1e3e] text-white">
      {/* Header */}
      <header className="border-b border-[#4d3c60] p-4">
        <div className="container mx-auto flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-[#0fe0b6]">
            Money Saver
          </Link>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <button
                className="flex items-center gap-1 px-3 py-2 text-sm rounded-md hover:bg-[#4d3c60]/50 transition-colors">
                Documentation
              </button>
            </div>
            <appkit-button />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Your Saving Plans</h1>
          <button
            className="px-4 py-2 bg-[#0fe0b6] hover:bg-[#0cc9a3] text-white hover:text-[#0fe0b6] font-medium rounded-md transition-colors"
            onClick={() => setShowCreateModal(true)}
          >
            Create New Plan
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {/* Render saving plans dynamically */}
          {activeSavingPlans?.map((plan, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-[#4d3c60] to-[#2d1e3e] rounded-xl border border-[#4d3c60] overflow-hidden shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer"
              onClick={() => setSelectedPlan(plan)}
            >
              <div className="relative h-48">
                {/*<Image src={plan.image || "/placeholder.svg"} alt={plan.name} fill className="object-cover" />*/}
                <div className="absolute inset-0 bg-gradient-to-t from-[#2d1e3e] to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h2 className="text-xl font-bold mb-1">{plan.name}</h2>
                  <div className="w-full bg-[#2d1e3e]/50 rounded-full h-2.5">
                    <div
                      className="bg-[#0fe0b6] h-2.5 rounded-full"
                      style={{ width: `${plan.progress}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span>${plan.current}</span>
                    <span>${plan.target}</span>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <p className="text-gray-300 line-clamp-2">{plan.description}</p>
                <div className="flex justify-between items-center mt-3">
                  <div className="text-sm text-[#0fe0b6]">{plan.strategy.apy}% APY</div>
                  <div className="text-xs text-gray-400">via {plan.strategy.provider}</div>
                </div>
              </div>
            </div>
          ))}

          {/* Add New Card */}
          <div
            className="bg-[#3b2d4d]/50 rounded-xl border border-dashed border-[#4d3c60] flex flex-col items-center justify-center p-8 h-[280px] hover:bg-[#4d3c60]/30 transition-colors cursor-pointer"
            onClick={() => setShowCreateModal(true)}
          >
            <div className="w-16 h-16 rounded-full bg-[#4d3c60]/50 flex items-center justify-center mb-4">
              <Plus className="h-8 w-8 text-[#0fe0b6]" />
            </div>
            <h3 className="text-xl font-medium text-center">Create New Saving Plan</h3>
            <p className="text-gray-400 text-center mt-2">Start a new savings journey</p>
          </div>
        </div>

      </main>

      {/* View Strategy Modal */}
      {selectedPlan && <SavingPlanModal
        plan={selectedPlan}
        onClose={() => setSelectedPlan(undefined)}
        activeSavingPlans={activeSavingPlans}
        setActiveSavingPlans={setActiveSavingPlans}
      />}

      {/* Create Strategy Modal */}
      {showCreateModal && (
        <CreateStrategyModal
          onClose={() => setShowCreateModal(false)}
          activeSavingPlans={activeSavingPlans}
          setActiveSavingPlans={setActiveSavingPlans}
        />
      )}
    </div>
  )
}

