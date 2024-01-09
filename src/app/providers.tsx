"use client";
import { ariseChain } from "@/config/web3";
import {
  Chain,
  RainbowKitProvider,
  connectorsForWallets,
  getDefaultWallets,
} from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import "@rainbow-me/rainbowkit/styles.css";
import { metaMaskWallet } from "@rainbow-me/rainbowkit/wallets";
type Props = {
  children: React.ReactNode;
};

const { publicClient, chains } = configureChains(
  [ariseChain],
  [publicProvider()]
);

const connectors = connectorsForWallets([
  {
    groupName: "METAMASK",
    wallets: [
      metaMaskWallet({
        projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
        chains,
      }),
    ],
  },
]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

export default function Providers({ children }: Props) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>{children}</RainbowKitProvider>
    </WagmiConfig>
  );
}
