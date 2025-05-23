// Sample strategies
import { Currency, SavingStrategy } from '../types/types.ts';

// Sample currencies
export const currencies: Currency[] = [
  { name: "USD", symbol: "$" },
  { name: "SOL", symbol: "SOL" },
  { name: "USDC", symbol: "USDC" },
  { name: "Dog Wif Hat", symbol: "WIF" },
];


export const strategies: SavingStrategy[] = [
  {
    name: 'Marinade Liquid USD', provider: 'Marinade Finance', apy: 6.8,
    programAddress: 'AdQiFcbNHV63bJT9Nm9KpcQAaGcsejjLPBaCCwGdvZUr',
    dual: false,
    currency: [currencies[0]]
  },
  { name: "SOL-USDC LP", provider: "Solend", apy: 4.2, programAddress: 'AdQiFcbNHV63bJT9Nm9KpcQAaGcsejjLPBaCCwGdvZUr', dual: true, currency: [currencies[1], currencies[2]] },
  { name: "WIF-USDC LP", provider: "Orca", apy: 8.5, programAddress: 'AdQiFcbNHV63bJT9Nm9KpcQAaGcsejjLPBaCCwGdvZUr', dual: true, currency: [currencies[2], currencies[3]] },
  { name: "Lending WIF", provider: "Raydium", apy: 12.3, programAddress: 'AdQiFcbNHV63bJT9Nm9KpcQAaGcsejjLPBaCCwGdvZUr',  dual: false, currency: [currencies[3]]},
];

