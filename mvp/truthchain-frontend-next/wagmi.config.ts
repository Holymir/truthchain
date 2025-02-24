import { createConfig, http } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';

export const config = createConfig({
    chains: [mainnet, sepolia], // Add chains you want to support
    transports: {
        [mainnet.id]: http(),
        [sepolia.id]: http(),
    },
});