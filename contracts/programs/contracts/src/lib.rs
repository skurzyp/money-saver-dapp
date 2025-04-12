use anchor_lang::prelude::*;
use anchor_lang::system_program::{transfer, Transfer};

pub mod state;
pub mod error;
pub use state::*;
pub use error::*;

declare_id!("DSHajjmDyBY5sSBjfnikcctMVPuM8czc5b9Y8WHgtNLb");

#[program]
pub mod savings_plan {
    use super::*;

    pub fn create_plan(ctx: Context<CreatePlan>, amount: u64, duration_seconds: i64) -> Result<()> {
        // Validations
        require!(amount > 0, SavingsError::ZeroAmount);
        require!(duration_seconds > 0, SavingsError::InvalidDuration);

        let clock = Clock::get()?;
        let current_timestamp = clock.unix_timestamp;

        // Calculate unlock time
        let unlock_timestamp = current_timestamp
            .checked_add(duration_seconds)
            .ok_or(SavingsError::TimestampError)?;

        // Calculate APR based on duration
        const MIN_APR: u64 = 100; // 1% in basis points
        const MAX_APR: u64 = 1000; // 10% in basis points
        const MIN_DURATION: i64 = 86400; // 1 day in seconds
        const MAX_DURATION: i64 = 31536000; // 365 days in seconds

        let apr = if duration_seconds <= MIN_DURATION {
            MIN_APR
        } else if duration_seconds >= MAX_DURATION {
            MAX_APR
        } else {
            let duration_range = (MAX_DURATION - MIN_DURATION) as u64;
            let apr_range = MAX_APR - MIN_APR;
            let duration_offset = (duration_seconds - MIN_DURATION) as u64;
            MIN_APR + (duration_offset * apr_range) / duration_range
        };

        // Calculate expected interest (simple interest: I = P * r * t)
        const SECONDS_PER_YEAR: u64 = 31536000;
        let interest = amount
            .checked_mul(apr)
            .ok_or(SavingsError::Overflow)?
            .checked_mul(duration_seconds as u64)
            .ok_or(SavingsError::Overflow)?
            .checked_div(10000) // Convert basis points to decimal
            .ok_or(SavingsError::Overflow)?
            .checked_div(SECONDS_PER_YEAR)
            .ok_or(SavingsError::Overflow)?;

        // Transfer SOL from owner to the dedicated vault PDA
        let cpi_accounts = Transfer {
            from: ctx.accounts.owner.to_account_info(),
            to: ctx.accounts.sol_vault.to_account_info(),
        };
        let cpi_context = CpiContext::new(
            ctx.accounts.system_program.to_account_info(),
            cpi_accounts,
        );
        transfer(cpi_context, amount)?;

        // Initialize the SavingsPlan state account
        let plan = &mut ctx.accounts.savings_plan;
        plan.owner = ctx.accounts.owner.key();
        plan.amount_deposited = amount;
        plan.unlock_timestamp = unlock_timestamp;
        plan.vault_bump = ctx.bumps.sol_vault;
        plan.apr = apr;
        plan.expected_interest = interest;

        msg!(
            "Savings plan created for owner: {}",
            ctx.accounts.owner.key()
        );
        msg!("Amount locked: {} lamports", amount);
        msg!("Unlock timestamp: {}", unlock_timestamp);
        msg!("Expected APR: {} basis points ({}%)", apr, apr / 100);
        msg!("Estimated interest: {} lamports", interest);

        Ok(())
    }

    pub fn withdraw(ctx: Context<Withdraw>) -> Result<()> {
        let plan = &ctx.accounts.savings_plan;

        // Check if the lock period has expired
        let clock = Clock::get()?;
        require!(
            clock.unix_timestamp >= plan.unlock_timestamp,
            SavingsError::PlanLocked
        );

        // Prepare PDA signer seeds for the vault
        let plan_key = plan.key();
        let seeds = &[
            b"sol_vault".as_ref(),
            plan_key.as_ref(),
            &[plan.vault_bump],
        ];
        let signer_seeds = &[&seeds[..]];

        // Check vault balance
        let expected_amount = plan.amount_deposited;
        let vault_balance = ctx.accounts.sol_vault.lamports();
        require!(vault_balance > 0, SavingsError::ZeroAmount);

        if vault_balance < expected_amount {
            msg!(
                "Warning: Vault balance ({}) is less than expected deposit ({}). Withdrawing available amount.",
                vault_balance,
                expected_amount
            );
        }

        // Transfer SOL from the vault PDA back to the owner
        let cpi_accounts = Transfer {
            from: ctx.accounts.sol_vault.to_account_info(),
            to: ctx.accounts.owner.to_account_info(),
        };
        let cpi_context = CpiContext::new_with_signer(
            ctx.accounts.system_program.to_account_info(),
            cpi_accounts,
            signer_seeds,
        );
        transfer(cpi_context, vault_balance)?;

        // Log withdrawal details, including simulated interest
        msg!(
            "Withdrawal successful for owner: {}",
            ctx.accounts.owner.key()
        );
        msg!("Withdrawn amount: {} lamports", vault_balance);
        msg!(
            "Estimated interest (based on {}% APR): {} lamports",
            plan.apr / 100,
            plan.expected_interest
        );

        Ok(())
    }

    pub fn get_plan_details(_ctx: Context<GetPlanDetails>) -> Result<()> {
        // No state changes; frontend fetches SavingsPlan account
        Ok(())
    }
}

#[derive(Accounts)]
#[instruction(amount: u64, duration_seconds: i64)]
pub struct CreatePlan<'info> {
    #[account(mut)]
    pub owner: Signer<'info>,
    #[account(
        init,
        payer = owner,
        space = 8 + SavingsPlan::INIT_SPACE,
        seeds = [b"savings_plan", owner.key().as_ref()],
        bump
    )]
    pub savings_plan: Account<'info, SavingsPlan>,
    /// CHECK: Vault PDA derived from the savings plan account.
    #[account(
        mut,
        seeds = [b"sol_vault", savings_plan.key().as_ref()],
        bump
    )]
    pub sol_vault: AccountInfo<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Withdraw<'info> {
    #[account(mut)]
    pub owner: Signer<'info>,
    #[account(
        mut,
        seeds = [b"savings_plan", owner.key().as_ref()],
        bump,
        constraint = savings_plan.owner == owner.key(),
        close = owner
    )]
    pub savings_plan: Account<'info, SavingsPlan>,
    /// CHECK: Vault PDA holding the SOL.
    #[account(
        mut,
        seeds = [b"sol_vault", savings_plan.key().as_ref()],
        bump = savings_plan.vault_bump
    )]
    pub sol_vault: AccountInfo<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct GetPlanDetails<'info> {
    #[account(
        seeds = [b"savings_plan", owner.key().as_ref()],
        bump
    )]
    pub savings_plan: Account<'info, SavingsPlan>,
    pub owner: Signer<'info>,
}