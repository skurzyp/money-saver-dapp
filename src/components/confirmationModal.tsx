"use client"

import { X } from "lucide-react"

interface ConfirmationModalProps {
  message: string
  onConfirm: () => void
  onCancel: () => void
}

export default function ConfirmationModal({ message, onConfirm, onCancel }: ConfirmationModalProps) {
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
        <div className="p-6 text-center">
          <h2 className="text-xl font-bold mb-4">Confirm Action</h2>
          <p className="text-gray-300 mb-6">{message}</p>

          <div className="flex justify-center gap-4">
            <button
              onClick={onCancel}
              className="px-4 py-2 bg-[#4d3c60]/40 hover:bg-[#4d3c60]/60 text-gray-300 rounded-md transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-[#ff6b8b]/20 hover:bg-[#ff6b8b]/30 text-[#ff6b8b] border border-[#ff6b8b]/30 rounded-md transition-colors font-medium"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
