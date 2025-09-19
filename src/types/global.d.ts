declare global {
  interface Navigator {
    wallets?: any[];
  }

  interface Window {
    ethereum?: any;
    phantom?: any;
    solana?: any;
  }
}

export {};
