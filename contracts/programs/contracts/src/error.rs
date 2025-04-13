// programs/contracts/src/lib.rs (or create src/error.rs and `pub use error::*;`)

use anchor_lang::prelude::*;

#[error_code]
pub enum SavingsError {
    #[msg("The lock period has not yet expired.")]
    PlanLocked,
    #[msg("Deposit amount must be greater than zero.")]
    ZeroAmount,
    #[msg("Timestamp calculation resulted in an error.")]
    TimestampError,
    #[msg("Numerical overflow occurred.")]
    Overflow,
    #[msg("Invalid duration specified.")]
    InvalidDuration,
}