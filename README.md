# Sol Saver
Sol Saver (temporary name until a final one is chosen) is a user-friendly application designed to help users achieve their financial goals.
By connecting a Solana wallet, users can create personalized saving plans that define goals, target amounts, and select from multiple investment strategies.
Once the plan is set up, users make an initial deposit to kick off their saving journey.
Additional deposits can be made to accelerate progress toward the goal, and funds can be withdrawn when the target is reached
(a small fee based on the investment amount will apply).

## How to run the app
### Locally
1. **Environment Setup:**
Create an `.env` file based on the provided `.env.example`.
2. **Install dependencies**
```shell
pnpm install
```
3. **Start the app**
```shell
pnpm run dev
```
4. **Access the App:**
Visit http://localhost:5173/

### Hosted version
You can also access the app on Vercel:  https://money-saver-dapp.vercel.app/

## Buissness plan
The Sol Saver platform will generate revenue by applying fees to user earnings. The fee structure will be based on tiered rates that vary according to the size of the user’s investment, ensuring that larger investors are subject to appropriate fee margins.

Additionally, if a user decides to close their saving pool before reaching the targeted goal, an extra penalty fee will be imposed. This penalty is designed to discourage premature withdrawals and promote long-term savings.

_Note:_ Specific fee percentages, tier details, and early closure penalty parameters are still under development and will be finalized in subsequent iterations of the platform.



## Implementation details
### Tech stack
- **Frontend**: Built with React and Vite.
- **Backend**: There is no dedicated backend for this proof of concept. Active saving plans are stored in Firestore.
- **Wallet Connection**: Secured using Reown (formerly WalletConnect).

### Frontend
The frontend was developed with assistance from AI tools, which allowed us to rapidly prototype the application.
We acknowledge that further refactoring and adherence to clean code standards will be necessary.

## Current Functionality
- **Mocked Investment Strategies:**
The available investment strategies (e.g., providing liquidity on DEXs, liquid staking tokens, interacting with yield aggregators) are currently hard-coded within the app. They serve as examples of potential user interactions but are not implemented as fully functional smart contracts.

- **Deposit Simulation:**
Deposits to saving plans are simulated through SOL transactions on the Solana Devnet. These transactions mimic the user experience and can be verified on the Solana Devnet Explorer.

- **Smart Contracts:**
Smart contract functionality is in a development phase

## Smart Contract Overview

The smart contract, written using the Anchor framework for Solana, defines the basic logic for creating and withdrawing from a timelocked savings plan. This is a minimal prototype for locking user funds (in SOL) for a specified time to simulate interest-based savings.
Key Features Implemented

    Time-locked deposits: Users lock SOL into a vault PDA for a fixed duration.

    Dynamic APR calculation: Interest is estimated based on how long the funds are locked.

    Simulated interest: While actual yield is not generated, interest is calculated and logged.

    Withdrawal: Funds are only withdrawable after the time lock expires.

    Secure ownership: Only the user who created the plan can withdraw it.

### create_plan

This instruction initializes a new savings plan:

    Validates input: Ensures that the deposit amount and duration are both non-zero.

    Time lock: Calculates unlock_timestamp using the current time + duration.

    APR calculation:

        APR is scaled between 1% to 10% based on lock duration (1 day to 1 year).

        Simple interest is estimated:
        Interest=P×APR×tSeconds per year×10000
        Interest=Seconds per year×10000P×APR×t​

    Transfers funds: Moves SOL from the user's wallet to a vault PDA.

    Initializes SavingsPlan:

        Stores amount, unlock time, APR, estimated interest, and owner.

### withdraw

This instruction allows the owner to withdraw locked funds:

    Time check: Ensures current time ≥ unlock time.

    Transfers SOL: Vault balance is returned to the owner.

    Interest Simulation: Logs the expected interest, although no real interest is added to the balance.

    Closes account: Closes the SavingsPlan account to reclaim rent.

### Future Upgrade Ideas

    Multiple strategies: Store strategy types in the plan and add a new field like strategy_type: u8.

    Top-ups.

    Diffrent locking strategies. 

    Smart contract upgrades for dynamic fee logic and yield integrations.

    Custom fee tiers, early withdrawal penalties,.



## Further development and improvements
1. **Smart Contract Implementation:**
Develop and integrate the necessary Solana programs to support the core functionalities.

2. **Backend Development:**
Consider switching from Firestore to a more robust backend solution to better handle user data.

3. **Frontend Refactoring:**
Revise and clean up the frontend code to improve maintainability and performance.

4. **Expand Investment Strategies:**
Increase the number of available investment strategies for users.

5. **On-Ramping Solution:**
Integrate an on-ramping solution, as suggested during the demo day, to simplify the process of funding saving plans.

6. **ETF-Like Strategies:**
Introduce ETF-like investment strategies, such as investing in the top 10 cryptocurrencies by market cap (suggested on demo day).

6. **Blik integration:**
Introduce Blik for simple payments on polish markets (suggested on demo day).

