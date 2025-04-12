import { X } from "lucide-react"
import { useState } from "react"
import ConfirmationModal from './confirmationModal.tsx';

interface TransactionModalProps {
  onConfirm: (amount: number) => void
  onCancel: () => void
  maxAmount?: number
}

export default function TransactionModal({ onConfirm, onCancel, maxAmount }: TransactionModalProps) {
  const [amount, setAmount] = useState<string>("")
  const [error, setError] = useState<string>("")
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);


  const handleConfirm = () => {
    const numAmount = Number.parseFloat(amount)

    if (isNaN(numAmount) || numAmount <= 0) {
      setError("Please enter a valid amount")
      return
    }

    if (maxAmount && numAmount > maxAmount) {
      setError(`Amount cannot exceed ${maxAmount} SOL`)
      return
    }

    onConfirm(numAmount)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onCancel}></div>

      {/* Modal */}
      <div className="bg-gradient-to-br from-[#4d3c60] to-[#2d1e3e] rounded-xl border border-[#4d3c60] shadow-2xl w-full max-w-md relative z-10 animate-fade-in">
        {/* Close button */}
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 p-1 rounded-full hover:bg-[#4d3c60]/50 transition-colors z-20"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal content */}
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4 text-center">Enter Amount</h2>
          <p className="text-gray-300 mb-6 text-center">How much SOL would you like to add?</p>

          <div className="mb-6">
            <div className="relative">
              <input
                type="number"
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value)
                  setError("")
                }}
                placeholder="0.0"
                step="0.01"
                min="0"
                className="w-full bg-[#2d1e3e] border border-[#4d3c60] rounded-md px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#0fe0b6] focus:border-transparent"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                <span className="text-gray-400">SOL</span>
              </div>
            </div>
            {error && <p className="mt-2 text-[#ff6b8b] text-sm">{error}</p>}
          </div>

          <div className="flex justify-center gap-4">
            <button
              onClick={onCancel}
              className="px-4 py-2 bg-[#4d3c60]/40 hover:bg-[#4d3c60]/60 text-gray-300 rounded-md transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              className="px-4 py-2 bg-[#0fe0b6] hover:bg-[#0cc9a3] text-http://localhost:5173/white hover:text-[#0fe0b6] rounded-md transition-colors font-medium"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
      {showConfirmationModal && (
        <ConfirmationModal
          message="Are you sure you want place this transaction?"
          onConfirm={() => {
            setShowConfirmationModal(false);
          }}
          onCancel={() => setShowConfirmationModal(false)}
        />
      )}
    </div>
  )
}
