'use client';

import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { injected } from 'wagmi/connectors';

export default function WalletConnect() {
    const { address, isConnected } = useAccount();
    const { connect } = useConnect();
    const { disconnect } = useDisconnect();

    const handleConnect = () => {
        connect({ connector: injected() }); // Pass connector here
    };

    return (
        <div className="p-4">
            {isConnected ? (
                <div>
                    <p>Connected: {address?.slice(0, 6)}...{address?.slice(-4)}</p>
                    <button
                        onClick={() => disconnect()}
                        className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                        Disconnect
                    </button>
                </div>
            ) : (
                <button
                    onClick={handleConnect} // Use the new handler
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Connect Wallet
                </button>
            )}
        </div>
    );
}