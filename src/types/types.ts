export type SavingStrategy = {
  name: string;
  provider: string;
  dual: boolean;
  currency: Currency[];
  programAddress: string;
  apy: number;
};

export type SavingPlan = {
  id: string;
  name: string;
  description: string;
  progress: number;
  target: number;
  current: number;
  image: string;
  strategy: SavingStrategy;
};

export type Currency = {
  name: string;
  symbol: string;
}