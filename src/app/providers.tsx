"use client";

import { NextUIProvider } from "@nextui-org/system";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import * as React from "react";

import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";

import {
  connectorsForWallets,
  RainbowKitProvider
} from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";

import { metaMaskWallet } from "@rainbow-me/rainbowkit/wallets";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

const walletConnectProjectId =
  process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!;

const ariseChain: any = {
  id: 4833,
  name: "Arise Testnet",
  iconUrl: `${process.env.NEXT_PUBLIC_URL}/images/arise-network.png`,
  iconBackground: "#fff",
  nativeCurrency: {
    decimals: 18,
    name: "Arise",
    symbol: "Arise",
  },
  rpcUrls: {
    public: {
      http: ["https://aster-rpc-nonprd.arisetech.dev"],
    },
    default: {
      http: ["https://aster-rpc-nonprd.arisetech.dev"],
    },
  },
  testnet: true,
};

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [ariseChain],
  [
    jsonRpcProvider({
      rpc: (chain) => ({ http: chain.rpcUrls.default.http[0] }),
    }),
  ]
);

const connectors = connectorsForWallets([
  {
    groupName: "Meta Mask Wallet",
    wallets: [metaMaskWallet({ chains,projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID })],
  },
]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

const appInfo = {
  appName: "POC Web3 PWA",
};

export function Providers({ children, themeProps }: ProvidersProps) {
  const queryClient = new QueryClient();

  return (
    <WagmiConfig config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider appInfo={appInfo} chains={chains}>
          <NextUIProvider>
            <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
          </NextUIProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiConfig>
  );
}
