export type Strategy = {
  name: string;
  provider: string;
  providerUrl: string;
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
  strategy: Strategy;
};