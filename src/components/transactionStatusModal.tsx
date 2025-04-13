
import { X, Loader2, CheckCircle, ExternalLink, AlertCircle } from "lucide-react"
import { useState, useEffect } from "react"

export type TransactionStatus = "processing" | "success" | "error"

interface TransactionStatusModalProps {
  status: TransactionStatus
  onClose: () => void
  amount?: number
  txHash?: string
  errorMessage?: string
  explorerUrl?: string
}

export default function TransactionStatusModal({
                                                 status,
                                                 onClose,
                                                 amount,
                                                 txHash,
                                                 errorMessage,
                                                 explorerUrl,
                                               }: TransactionStatusModalProps) {
  const [canClose, setCanClose] = useState(status !== "processing")

  useEffect(() => {
    setCanClose(status !== "processing")
  }, [status])

  const handleClose = () => {
    if (canClose) {
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={canClose ? handleClose : undefined}></div>

      {/* Modal */}
      <div className="bg-gradient-to-br from-[#4d3c60] to-[#2d1e3e] rounded-xl border border-[#4d3c60] shadow-2xl w-full max-w-md relative z-10 animate-fade-in">
        {/* Close button - only visible when transaction is complete */}
        {canClose && (
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-1 rounded-full hover:bg-[#4d3c60]/50 transition-colors z-20"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        )}

        {/* Modal content */}
        <div className="p-6 text-center">
          <div className="flex justify-center mb-4">
            {status === "processing" && <Loader2 className="h-16 w-16 text-[#0fe0b6] animate-spin" />}
            {status === "success" && <CheckCircle className="h-16 w-16 text-[#0fe0b6]" />}
            {status === "error" && <AlertCircle className="h-16 w-16 text-[#ff6b8b]" />}
          </div>

          <h2 className="text-xl font-bold mb-2">
            {status === "processing" && "Processing Transaction"}
            {status === "success" && "Transaction Complete"}
            {status === "error" && "Transaction Failed"}
          </h2>

          {amount !== undefined && (
            <p className="text-lg font-medium mb-2">
              {status === "processing" ? "Sending" : "Sent"} <span className="text-[#0fe0b6]">{amount} SOL</span>
            </p>
          )}

          {status === "processing" && (
            <p className="text-gray-300 mb-6">Please wait while your transaction is being processed...</p>
          )}

          {status === "success" && txHash && (
            <div className="mt-4 mb-6">
              <p className="text-gray-300 mb-2">Transaction Hash:</p>
              <div className="bg-[#2d1e3e] p-3 rounded-md flex items-center justify-between">
                <code className="text-xs text-gray-300 truncate">
                  {txHash.slice(0, 20)}...{txHash.slice(-4)}
                </code>
                {explorerUrl && (
                  <a
                    href={explorerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#0fe0b6] hover:text-[#0cc9a3] ml-2"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                )}
              </div>
            </div>
          )}

          {status === "error" && (
            <p className="text-[#ff6b8b] mt-4 mb-6">
              {errorMessage || "An error occurred while processing your transaction."}
            </p>
          )}

          {canClose && (
            <button
              onClick={handleClose}
              className="px-6 py-2 bg-[#0fe0b6] hover:bg-[#0cc9a3] text-white hover:text-[#0fe0b6] font-medium rounded-md transition-colors"
            >
              {status === "success" ? "Done" : "Close"}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
