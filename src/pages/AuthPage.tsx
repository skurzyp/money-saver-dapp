import { Card } from '../components/ui/card.tsx';
import ReownModal from '../components/reownModal.tsx';
import { useAppKitAccount } from '@reown/appkit/react'
import { Button } from '../components/ui/button.tsx';
import { useNavigate } from 'react-router-dom';

const AuthPage  = () => {

  const { isConnected } = useAppKitAccount();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-screen bg-black text-white flex flex-col md:flex-row bg-gradient-to-br from-[#3b2d4d] to-[#2d1e3e]">
      {/* Left side with logo and slogan */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center ">
        <div className="max-w-md space-y-6">
          <div className="flex items-center space-x-3">
            <div className="relative w-12 h-12">
              <img
                src="/sol-logo.png"
                alt="Solana Logo"
                className="w-12 h-12 object-contain"
              />
            </div>
            <h1
              className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
            earnify.sol
            </h1>
          </div>

          <p className="text-xl text-gray-300">Take care for your brighter future on chain.</p>

          <div className="mt-8 space-y-4">
            <p className="text-gray-400">
              Connect your Solana wallet to access your decentralized finance dashboard, manage your assets, and start
              saving for your future.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
              <div className="bg-gray-800 p-4 rounded-lg">
                <h3 className="font-medium text-purple-400">Secure Storage</h3>
                <p className="text-sm text-gray-400">Your assets are secured by blockchain technology</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg">
                <h3 className="font-medium text-blue-400">DeFi Integration</h3>
                <p className="text-sm text-gray-400">Access the best yields across Solana ecosystem</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side with login */}
      <div className="w-full md:w-1/2 flex justify-center items-center p-8 ">
        <Card className="w-full max-w-md p-8 bg-gray-900 border-gray-800">
          <div className="space-y-6">
            <div className="text-center">
              <p className="text-gray-400 mt-2">Connect your wallet to continue</p>
            </div>

            <div className="flex flex-col items-center space-y-4">
              <div className="w-full flex items-center justify-center">
                <ReownModal/>
              </div>
              {isConnected &&  <Button onClick={() => navigate('/main')}>Go to Main Screen</Button>}
            </div>


            <div className="text-center text-xs text-gray-500 mt-8">
              <p>By connecting your wallet, you agree to our</p>
              <p>
                <a href="#" className="text-blue-400 hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-blue-400 hover:underline">
                  Privacy Policy
                </a>
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default AuthPage;