'use client';

import { useState, useEffect } from 'react';
import { useAccount, useBalance } from 'wagmi';
import WalletConnect from '../components/WalletConnect';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const { address } = useAccount();
  const { data: balance, isLoading } = useBalance({
    address,
  });

  // Ensure component only renders after mounting on client
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <h1 className="text-4xl font-bold mb-8">TruthChain</h1>
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
          <p className="text-gray-600">Loading...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">TruthChain</h1>
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <WalletConnect />
        {isLoading ? (
          <p className="mt-4 text-gray-600">Loading balance...</p>
        ) : (
          balance && (
            <p className="mt-4 text-gray-600">
              ETH Balance: {balance.formatted} {balance.symbol}
            </p>
          )
        )}
      </div>
    </main>
  );
}