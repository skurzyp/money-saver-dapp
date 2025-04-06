import { X } from "lucide-react"

interface GettingStartedDrawerProps {
  onClose: () => void
}

export default function GettingStartedDrawer({ onClose }: GettingStartedDrawerProps) {
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex justify-end">
      <div
        className="bg-[#2d1e3e] w-full max-w-md h-full overflow-y-auto animate-slide-in"
        style={{ animationDuration: "0.3s" }}
      >
        <div className="sticky top-0 bg-[#3b2d4d] p-4 border-b border-[#4d3c60] flex justify-between items-center">
          <h2 className="text-xl font-medium">Getting Started</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-[#4d3c60]/50 transition-colors"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="bg-gradient-to-br from-[#4d3c60] to-[#2d1e3e] p-6 rounded-2xl border border-[#4d3c60] shadow-xl">
            <div className="bg-gradient-to-br from-[#ff6b8b] to-[#5f27cd] p-6 rounded-xl mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-[#5f27cd] rounded-full"></div>
                </div>
                <div className="font-large">Solana Money Saver</div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <h3 className="font-medium">How it works?</h3>
                <p className="text-sm text-gray-300">
                  Learn ideas behind the project, what it offers and decide what suits you best
                </p>
              </div>

              <div className="space-y-1">
                <h3 className="font-medium">How to start?</h3>
                <p className="text-sm text-gray-300">How to create your first saving plan</p>
              </div>

              <div className="space-y-1">
                <h3 className="font-medium">Invest your money and make the plan risk free</h3>
                <p className="text-sm text-gray-300">
                  The investment opportunities aggregated by this page are risk free.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 space-y-6">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Additional Resources</h3>
              <p className="text-sm text-gray-300">
                Explore these resources to learn more about saving and investing on Solana.
              </p>
            </div>

            <div className="grid gap-4">
              <a
                href="https://solana.com/pl/docs/intro/quick-start"
                className="block p-4 bg-[#3b2d4d] rounded-lg border border-[#4d3c60] hover:bg-[#4d3c60]/50 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <h4 className="font-medium mb-1">Beginner's Guide to Solana</h4>
                <p className="text-sm text-gray-300">Learn the basics of Solana blockchain and how it works.</p>
              </a>

              <a
                href="#"
                className="block p-4 bg-[#3b2d4d] rounded-lg border border-[#4d3c60] hover:bg-[#4d3c60]/50 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <h4 className="font-medium mb-1">Investment Strategies</h4>
                <p className="text-sm text-gray-300">Discover different strategies for growing your assets.</p>
              </a>

              <a
                href="#"
                className="block p-4 bg-[#3b2d4d] rounded-lg border border-[#4d3c60] hover:bg-[#4d3c60]/50 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <h4 className="font-medium mb-1">Security Best Practices</h4>
                <p className="text-sm text-gray-300">Keep your assets safe with these security tips.</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}