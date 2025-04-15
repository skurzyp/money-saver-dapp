import { useState } from "react"
import { BarChart3, PiggyBank, Play, Wallet, ChevronRight } from 'lucide-react';
import { Accordion, AccordionContent, AccordionTrigger, AccordionItem } from '../components/ui/accordion.tsx';
import { Button } from '../components/ui/button.tsx';
import { useNavigate } from 'react-router-dom';


export default function Documentation() {
  const [activeStep, setActiveStep] = useState<number | null>(null)
  const [hoveredStep, setHoveredStep] = useState<number | null>(null)
  const navigate = useNavigate();

  const roadmapSteps = [
    {
      id: 1,
      title: "Connect Solana Wallet",
      icon: <Wallet className="h-6 w-6" />,
      description: "Connect your Solana wallet to get started with your saving journey.",
      details: [
        "Our application supports multiple Solana wallets including Phantom, Solflare, and Sollet.",
        "Click on the 'Connect Wallet' button in the top right corner of the application.",
        "Select your preferred wallet from the available options.",
        "Follow the prompts in your wallet extension to authorize the connection.",
        "Once connected, your wallet address will be displayed, indicating a successful connection.",
      ],
    },
    {
      id: 2,
      title: "Create Saving Plan",
      icon: <PiggyBank className="h-6 w-6" />,
      description: "Set up your personalized saving plan with specific goals and strategies.",
      details: [
        "Navigate to the 'Create Plan' section in the dashboard.",
        "Enter a name for your saving plan to easily identify it later.",
        "Specify your saving goal in your preferred currency (USDC, SOL, etc.).",
        "Select a saving strategy that aligns with your risk tolerance and financial goals.",
        "Review the estimated returns and timeframe based on your selected strategy.",
        "Confirm your plan details to create your saving plan.",
      ],
    },
    {
      id: 3,
      title: "Start Saving Plan",
      icon: <Play className="h-6 w-6" />,
      description: "Activate your saving plan by depositing tokens and confirming your strategy.",
      details: [
        "Select the saving plan you wish to activate from your dashboard.",
        "Choose the tokens you want to deposit into your saving plan.",
        "Specify the amount of tokens you wish to contribute.",
        "Review the transaction details and submit it.",
        "Confirm the transaction using your connected wallet.",
        "Once confirmed, your saving plan will be activated and your tokens will start working for you.",
      ],
    },
    {
      id: 4,
      title: "Monitor and Cash Out",
      icon: <BarChart3 className="h-6 w-6" />,
      description: "Track your savings growth and withdraw funds when you reach your goals.",
      details: [
        "Access your active saving plans from the dashboard to monitor their performance.",
        "View detailed analytics on your token growth, including APY and goal progress",
        "Add more tokens to your saving plan at any time by selecting the 'Add Funds' option.",
        "Withdraw the tokens after reaching the goal (currently not supported)",
        "Confirm the withdrawal transaction using your connected wallet.",
        "Your tokens will be transferred back to your wallet, along with any earned returns.",
      ],
    },
  ]

  return (
    <div className="min-h-screen w-screen bg-gradient-to-b from-[#3b2d4d] to-[#2d1e3e]">

      {/* Header */}
      <header className="border-b border-[#4d3c60] p-4 ">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex row items-center gap-4 cursor-pointer" onClick={() => navigate('/main')}>
            <h1 className="text-2xl font-bold text-[#0fe0b6]">earnify.sol</h1>
            <img
              src="/digital-logo.png"
              alt="Solana Logo"
              className="w-16 h-16 object-contain"
            />
          </div>


          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <button
                className="flex items-center gap-1 px-3 py-2 text-sm rounded-md hover:bg-[#4d3c60]/50 transition-colors"
                onClick={() => navigate('/dashboard')}
              >
                Dashboard
              </button>
              <button
                className="flex items-center gap-1 px-3 py-2 text-sm rounded-md hover:bg-[#4d3c60]/50 transition-colors"
                onClick={() => navigate('/main')}
              >
                Home
              </button>
            </div>
            <appkit-button />
          </div>
        </div>
      </header>
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <h1 className="text-3xl font-bold mb-8 text-center text-white">Solana Saving App Documentation</h1>

        {/* Roadmap Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-white">User Journey Roadmap</h2>
          <p className="mb-6 text-white">
            Follow these steps to make the most of our Solana Saving App and achieve your financial goals.
          </p>

          <div className="space-y-6">
            {roadmapSteps.map((step) => (
              <div
                key={step.id}
                className={`
                  relative transition-all duration-500 ease-in-out
                  ${activeStep === step.id ? "scale-[1.02]" : "scale-100"}
                  ${hoveredStep === step.id ? "shadow-lg" : "shadow-md"}
                `}
                onMouseEnter={() => setHoveredStep(step.id)}
                onMouseLeave={() => setHoveredStep(null)}
                onClick={() => setActiveStep(activeStep === step.id ? null : step.id)}
              >
                <div
                  className={`
                    bg-gradient-to-r from-purple-50 to-white rounded-lg p-6 
                    border-l-4 cursor-pointer transition-all duration-300 ease-in-out
                    ${activeStep === step.id ? "border-purple-800" : "border-purple-400"}
                    ${hoveredStep === step.id ? "shadow-xl" : "shadow"}
                  `}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div
                      className={`
                        p-3 rounded-full transition-all duration-300 ease-in-out
                        ${activeStep === step.id ? "bg-purple-800 text-white" : "bg-purple-100 text-purple-600"}
                        ${hoveredStep === step.id ? "rotate-12" : "rotate-0"}
                      `}
                    >
                      {step.icon}
                    </div>
                    <h3 className="font-semibold text-xl text-purple-900 flex items-center gap-2">
                      {step.title}
                      <ChevronRight
                        className={`h-5 w-5 transition-transform duration-300 ease-in-out ${
                          activeStep === step.id ? "rotate-90" : "rotate-0"
                        }`}
                      />
                    </h3>
                  </div>

                  <p className="text-purple-700 mb-4">{step.description}</p>

                  <div
                    className={`
                      overflow-hidden transition-all duration-500 ease-in-out
                      ${activeStep === step.id ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
                    `}
                  >
                    <div className="bg-purple-50 p-4 rounded-lg border border-purple-200 mt-2">
                      <h4 className="font-medium mb-2 text-purple-800">How to:</h4>
                      <ul className="list-disc pl-5 space-y-2 text-purple-700">
                        {step.details.map((detail, idx) => (
                          <li
                            key={idx}
                            className={`
                              transition-all duration-300 ease-in-out
                              ${activeStep === step.id ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"}
                            `}
                            style={{ transitionDelay: `${idx * 100}ms` }}
                          >
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 text-center text-sm text-purple-500">
            Click on each step to view detailed instructions
          </div>
        </section>

        {/* Saving Strategies Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-6 text-white">Saving Strategies</h2>
          <p className="mb-6 text-white">
            Our platform offers multiple strategies to help you grow your Solana tokens. Each strategy comes with its
            own risk profile and potential returns.
          </p>

          <Accordion type="single" collapsible className="w-full space-y-4">
            <AccordionItem
              value="sol-staking"
              className="border-purple-200 bg-white rounded-lg overflow-hidden shadow-md"
            >
              <AccordionTrigger className="text-lg font-medium py-4 px-6 text-white hover:bg-purple-50 bg-gradient-to-br from-[#4d3c60] to-[#2d1e3e]">
                Sol Staking
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6 pt-2 bg-purple-50">
                <div className="space-y-4">
                  <p className="text-purple-700">
                    Sol Staking is a process where you lock up your SOL tokens to support the Solana network's
                    operations and security. In return, you earn rewards in the form of additional SOL tokens.
                  </p>

                  <div className="bg-white p-4 rounded-lg border border-purple-200">
                    <h4 className="font-medium mb-2 text-purple-800">Benefits</h4>
                    <ul className="list-disc pl-5 space-y-1 text-purple-700">
                      <li>Relatively low risk compared to other strategies</li>
                      <li>Consistent returns (currently averaging 5-7% APY)</li>
                      <li>Contributes to the security and decentralization of the Solana network</li>
                      <li>No impermanent loss risk</li>
                    </ul>
                  </div>

                  <div className="bg-white p-4 rounded-lg border border-purple-200">
                    <h4 className="font-medium mb-2 text-purple-800">Risks</h4>
                    <ul className="list-disc pl-5 space-y-1 text-purple-700">
                      <li>Locked staking periods (typically 2-3 days for unstaking)</li>
                      <li>Returns are subject to network changes and validator performance</li>
                      <li>Value fluctuation of SOL token itself</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2 text-purple-800">How it works in our app</h4>
                    <p className="text-purple-700">
                      When you select Sol Staking as your strategy, we delegate your SOL tokens to a diversified set of
                      reliable validators with proven track records (no implemented yet). Our system automatically compounds your staking
                      rewards to maximize your returns over time. You can monitor your staking rewards in real-time
                      through your dashboard.
                    </p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="liquidity-pools"
              className="border-purple-200 bg-white rounded-lg overflow-hidden shadow-md"
            >
              <AccordionTrigger className="text-lg font-medium py-4 px-6 text-white hover:bg-purple-50 bg-gradient-to-br from-[#4d3c60] to-[#2d1e3e]" >
                Liquidity Pools
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6 pt-2 bg-purple-50">
                <div className="space-y-4">
                  <p className="text-purple-700">
                    Liquidity Pools involve providing pairs of tokens to decentralized exchanges (DEXs) on Solana, such
                    as Raydium or Orca. By contributing to these pools, you enable token swaps for other users and earn
                    a portion of the trading fees (not implemented yet).
                  </p>

                  <div className="bg-white p-4 rounded-lg border border-purple-200">
                    <h4 className="font-medium mb-2 text-purple-800">Benefits</h4>
                    <ul className="list-disc pl-5 space-y-1 text-purple-700">
                      <li>Higher potential returns compared to staking (can range from 10-100%+ APY)</li>
                      <li>Earn trading fees from every swap that uses your provided liquidity</li>
                      <li>Some pools offer additional incentives in the form of governance tokens</li>
                      <li>Immediate liquidity (no unstaking period)</li>
                    </ul>
                  </div>

                  <div className="bg-white p-4 rounded-lg border border-purple-200">
                    <h4 className="font-medium mb-2 text-purple-800">Risks</h4>
                    <ul className="list-disc pl-5 space-y-1 text-purple-700">
                      <li>Impermanent loss risk when token prices in the pair diverge significantly</li>
                      <li>Smart contract risks</li>
                      <li>Higher volatility in returns</li>
                      <li>Requires providing two tokens in a specific ratio</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2 text-purple-800">How it works in our app</h4>
                    <p className="text-purple-700">
                      Our application simplifies the process of participating in liquidity pools. When you select this
                      strategy, we help you convert your tokens into the appropriate pair and deposit them into
                      carefully selected pools with favorable risk-reward profiles. We monitor the pools for impermanent
                      loss risks and can automatically rebalance your position if needed. Your dashboard displays
                      real-time data on your earnings from trading fees and any additional rewards.
                    </p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="yield-aggregators"
              className="border-purple-200 bg-white rounded-lg overflow-hidden shadow-md"
            >
              <AccordionTrigger className="text-lg font-medium py-4 px-6 text-white hover:bg-purple-50 bg-gradient-to-br from-[#4d3c60] to-[#2d1e3e]">
                Yield Aggregators
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6 pt-2 bg-purple-50">
                <div className="space-y-4">
                  <p className="text-purple-700">
                    Yield Aggregators are protocols that automatically move your funds between different
                    yield-generating strategies to maximize returns. They continuously search for the highest-yielding
                    opportunities across the Solana ecosystem.
                  </p>

                  <div className="bg-white p-4 rounded-lg border border-purple-200">
                    <h4 className="font-medium mb-2 text-purple-800">Benefits</h4>
                    <ul className="list-disc pl-5 space-y-1 text-purple-700">
                      <li>Optimized returns through automated strategy switching</li>
                      <li>Reduced gas fees and time spent manually moving between protocols</li>
                      <li>Professional management of complex DeFi strategies</li>
                      <li>Diversification across multiple protocols</li>
                    </ul>
                  </div>

                  <div className="bg-white p-4 rounded-lg border border-purple-200">
                    <h4 className="font-medium mb-2 text-purple-800">Risks</h4>
                    <ul className="list-disc pl-5 space-y-1 text-purple-700">
                      <li>Compounded smart contract risks from multiple protocols</li>
                      <li>Strategy risks if the aggregator makes poor decisions</li>
                      <li>Performance fees may reduce overall returns</li>
                      <li>More complex to understand the underlying mechanisms</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2 text-purple-800">How it works in our app</h4>
                    <p className="text-purple-700">
                      Our application integrates with leading yield aggregators on Solana such as Tulip Protocol and
                      Francium. When you choose this strategy, your tokens are deposited into these aggregators which
                      then automatically allocate them to the most profitable opportunities. Our dashboard provides
                      transparency by showing you exactly where your funds are deployed and the current APY. We
                      carefully vet all aggregators for security and performance before including them in our platform.
                    </p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        {/* Call to Action */}
        <section className="mt-12 text-center">
          <div className="bg-gradient-to-br from-[#4d3c60] to-[#2d1e3e] text-white rounded-lg shadow-lg">
            <div className="p-8">
              <h2 className="text-2xl font-bold mb-4">Ready to Start Your Saving Journey?</h2>
              <p className="mb-6">
                Connect your wallet now and take the first step towards achieving your financial goals with our Solana
                Saving App.
              </p>
              <Button className="bg-white text-white hover:bg-purple-50">Connect Wallet</Button>
            </div>
          </div>
        </section>  
      </div>
    </div>
  )
}
