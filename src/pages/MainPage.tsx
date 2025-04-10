import { useState } from "react"
import { ChevronDown, Info, Link } from 'lucide-react';
import GettingStartedDrawer from '../components/gettingStartedDrawer.tsx';
import FeaturesSection from '../components/featuresSection.tsx';
import { useNavigate } from 'react-router-dom';


export default function StartingScreen() {
  const [showGettingStarted, setShowGettingStarted] = useState(false)
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-screen bg-gradient-to-b from-[#3b2d4d] to-[#2d1e3e] text-white">
      {/* Header */}
      <header className="border-b border-[#4d3c60] p-4">
        <div className="container mx-auto flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-[#0fe0b6]">
            Money Saver
          </Link>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <button
                className="flex items-center gap-1 px-3 py-2 text-sm rounded-md hover:bg-[#4d3c60]/50 transition-colors"
                onClick={() => setShowGettingStarted(!showGettingStarted)}
                aria-expanded={showGettingStarted}
              >
                Getting started <ChevronDown className="h-4 w-4" />
              </button>
              <button
                className="flex items-center gap-1 px-3 py-2 text-sm rounded-md hover:bg-[#4d3c60]/50 transition-colors"
                onClick={() => navigate('/dashboard')}
              >
                Dashboard
              </button>
              <button
                className="flex items-center gap-1 px-3 py-2 text-sm rounded-md hover:bg-[#4d3c60]/50 transition-colors">
                Documentation
              </button>
            </div>
            <appkit-button />
          </div>
        </div>
      </header>

      {/* Getting Started Drawer */}
      {showGettingStarted && <GettingStartedDrawer onClose={() => setShowGettingStarted(false)} />}

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Simplify your <br />
              <span className="text-[#0fe0b6]">onchain saving</span>
            </h1>
            <p className="text-lg text-gray-300 max-w-md">
              Start your Solana savings journey with a secure, easy-to-use platform designed for both beginners and
              experienced users.
            </p>
            <div className="pt-4 space-y-4">
              <button
                className="px-6 py-3 bg-white/10 hover:bg-white/20 transition-colors rounded-md text-white font-medium">
                Learn more
              </button>
              <p className="text-sm text-gray-400 flex items-center gap-2">
                <Info className="h-4 w-4" /> Connect your wallet to start saving on Solana
              </p>
            </div>
          </div>

          <div className="relative">
            <div
              className="absolute -z-10 w-72 h-72 bg-[#0fe0b6]/30 rounded-full blur-3xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <FeaturesSection/>
    </div>
  )
}

