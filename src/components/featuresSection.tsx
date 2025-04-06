import { ChevronDown } from 'lucide-react';

export default function FeaturesSection()  {
  return (
    <section className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="bg-[#3b2d4d] border border-[#4d3c60] rounded-xl overflow-hidden">
          <div className="p-4 border-b border-[#4d3c60]">
            <h2 className="text-xl font-medium">Get Started in 3 Simple Steps</h2>
          </div>

          <div className="divide-y divide-[#4d3c60]">
            <div className="p-4 hover:bg-[#4d3c60]/30 transition-colors cursor-pointer">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#0fe0b6]/20 text-[#0fe0b6] flex items-center justify-center">
                    1
                  </div>
                  <h3 className="font-medium">Connect your wallet</h3>
                </div>
                <ChevronDown className="h-5 w-5" />
              </div>
            </div>

            <div className="p-4 hover:bg-[#4d3c60]/30 transition-colors cursor-pointer">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#0fe0b6]/20 text-[#0fe0b6] flex items-center justify-center">
                    2
                  </div>
                  <h3 className="font-medium">Create a saving plan</h3>
                </div>
                <ChevronDown className="h-5 w-5" />
              </div>
            </div>

            <div className="p-4 hover:bg-[#4d3c60]/30 transition-colors cursor-pointer">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#0fe0b6]/20 text-[#0fe0b6] flex items-center justify-center">
                    3
                  </div>
                  <h3 className="font-medium">Start investing and saving</h3>
                </div>
                <ChevronDown className="h-5 w-5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}