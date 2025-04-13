use anchor_lang::prelude::*;

#[account]
#[derive(InitSpace)]
pub struct SavingsPlan {
    /// The user who owns this savings plan.
    pub owner: Pubkey,
    /// The amount of SOL initially deposited and locked.
    pub amount_deposited: u64,
    /// The Unix timestamp (seconds since epoch) when the funds can be withdrawn.
    pub unlock_timestamp: i64,
    /// The bump seed for the vault PDA associated with this plan.
    pub vault_bump: u8,
    /// The expected APR in basis points (e.g., 500 for 5%).
    pub apr: u64,
    /// The estimated interest in lamports based on APR and duration.
    pub expected_interest: u64,
}