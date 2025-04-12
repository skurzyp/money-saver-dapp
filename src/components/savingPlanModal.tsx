'use client';

import { ExternalLink, HelpCircle, X, Link } from 'lucide-react';
import type { SavingPlan } from '../types/types.ts';
import React, { useEffect } from 'react';
import { useState } from 'react';
import ConfirmationModal from '../components/confirmationModal';
import TransactionStatusModal, { type TransactionStatus } from '../components/transactionStatusModal';
import { deleteSavingPlan, updateSavingPlan } from '../lib/firebase/repository/SavingPlansRepository.ts';
import TransactionModal from './transactionModal.tsx';

interface SavingPlanModalProps {
  plan: SavingPlan;
  onClose: () => void;
  activeSavingPlans: SavingPlan[] | null;
  setActiveSavingPlans: React.Dispatch<React.SetStateAction<SavingPlan[] | null>>;
  walletAddress: string | undefined;
  sendSol: (programAddress: string, amount: number) => Promise<string>;
}

export default function SavingPlanModal({
                                          plan,
                                          onClose,
                                          activeSavingPlans,
                                          setActiveSavingPlans,
                                          walletAddress,
                                          sendSol,
                                        }: SavingPlanModalProps) {
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showAmountInputModal, setShowAmountInputModal] = useState(false);
  const [transactionAmount, setTransactionAmount] = useState<number | undefined>();
  const [transactionStatus, setTransactionStatus] = useState<TransactionStatus | null>(null);
  const [transactionHash, setTransactionHash] = useState<string | undefined>();
  const [transactionError, setTransactionError] = useState<string | undefined>();

  const handleAddFunds = () => {
    setShowAmountInputModal(true);
  };

  const handleAmountConfirm = (amount: number) => {
    setTransactionAmount(amount);
    setShowAmountInputModal(false);
    setShowConfirmationModal(true);
  };

  const handleTransactionConfirm = async () => {
    setShowConfirmationModal(false);
    setTransactionStatus('processing');

    try {
      const txHash = await sendSol(plan.strategy.programAddress, transactionAmount!);
      setTransactionHash(txHash);
      setTransactionStatus('success');
    } catch (error) {
      console.error('Transaction error:', error);
      setTransactionError(typeof error === 'string' ? error : 'Transaction failed. Please try again.');
      setTransactionStatus('error');
    }
  };

  const handleTransactionClose = () => {
    setTransactionStatus(null);
    setTransactionAmount(undefined);
    setTransactionHash(undefined);
    setTransactionError(undefined);
  };

  function removePlan(
    plan: SavingPlan,
    activeSavingPlans: SavingPlan[] | null,
    setActiveSavingPlans: React.Dispatch<React.SetStateAction<SavingPlan[] | null>>,
    walletAddress: string | undefined,
  ): boolean {
    if (activeSavingPlans !== null && plan !== null && walletAddress !== undefined) {
      deleteSavingPlan(walletAddress, plan).then((resp) => console.log(`Removal ${resp ? 'successful' : 'unsuccessful'}`));
      setActiveSavingPlans(
        activeSavingPlans.filter(activePlan => plan.id !== activePlan.id),
      );
      return true;
    }
    throw ('Error removing plan.');
  }

  useEffect(() => {
    if (transactionStatus === 'success' && transactionAmount !== undefined) {
      plan.current += transactionAmount;
      plan.progress += (plan.current / plan.target) * 100;
      updateSavingPlan(walletAddress, plan).then(() => console.log(`Plan: ${plan.name} filled with ${transactionAmount}. Current progress: ${plan.progress}`));
    }
  }, [transactionStatus]);

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose}></div>

        {/* Modal */}
        <div
          className="bg-gradient-to-br from-[#4d3c60] to-[#2d1e3e] rounded-xl border border-[#4d3c60] shadow-2xl w-full max-w-lg relative z-10 animate-fade-in">
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
            {/* <Image src={plan.image || "/placeholder.svg"} alt={plan.name} className="object-cover rounded-t-xl" /> */}
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
                  href={plan.strategy.programAddress}
                  target="_blank"
                  className="flex items-center gap-1 text-sm text-[#0fe0b6] hover:underline"
                >
                  {plan.strategy.provider} <ExternalLink className="h-3 w-3" />
                </Link>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 mb-4">
              <button
                className="flex-1 px-4 py-3 bg-[#0fe0b6] hover:bg-[#0cc9a3] text-white hover:text-[#0fe0b6] font-medium rounded-md transition-colors"
                onClick={handleAddFunds}
              >
                Add Funds
              </button>
              <button
                className="flex-1 px-4 py-3 bg-[#ff6b8b]/20 hover:bg-[#ff6b8b]/30 text-[#ff6b8b] transition-colors rounded-md font-medium border border-[#ff6b8b]/30"
                onClick={() => setShowConfirmationModal(true)}
              >
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

      {/* Confirmation Modal for ending strategy */}
      {showConfirmationModal && !transactionAmount && (
        <ConfirmationModal
          message="Are you sure you want to end this strategy?"
          onConfirm={() => {
            removePlan(plan, activeSavingPlans, setActiveSavingPlans, walletAddress);
            setShowConfirmationModal(false);
            onClose();
          }}
          onCancel={() => setShowConfirmationModal(false)}
        />
      )}

      {/* Amount Input Modal */}
      {showAmountInputModal && (
        <TransactionModal onConfirm={handleAmountConfirm} onCancel={() => setShowAmountInputModal(false)} />
      )}

      {/* Transaction Confirmation Modal */}
      {showConfirmationModal && transactionAmount && (
        <ConfirmationModal
          message={`Are you sure you want to add ${transactionAmount} SOL to this strategy?`}
          onConfirm={handleTransactionConfirm}
          onCancel={() => {
            setShowConfirmationModal(false);
            setTransactionAmount(undefined);
          }}
        />
      )}

      {/* Transaction Status Modal */}
      {transactionStatus && (
        <TransactionStatusModal
          status={transactionStatus}
          amount={transactionAmount}
          txHash={transactionHash}
          errorMessage={transactionError}
          explorerUrl={transactionHash ? `https://explorer.solana.com/tx/${transactionHash}?cluster=devnet` : undefined}
          onClose={handleTransactionClose}
        />
      )}
    </>
  );
}
