"use client";

import { NextUIProvider } from "@nextui-org/system";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import * as React from "react";

import { mainnet, polygon, optimism, arbitrum } from "wagmi/chains";
import { ConnectKitProvider, ConnectKitButton, getDefaultConfig } from "connectkit";
import { WagmiConfig, configureChains, createConfig } from "wagmi";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { ariseChain } from "@/config/web3";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

const alchemyId = "ZHGFfZoK6R2ZeW-Dvo7DcA3lShloPp6s"
const walletConnectProjectId= "b81da339e88312132666831663efe9a7"

const { publicClient, chains } = configureChains(
	[ariseChain],
	[
		jsonRpcProvider({
			rpc: (chain) => ({ http: chain.rpcUrls.default.http[0] }),
		}),
	],
);

const config = createConfig(
  getDefaultConfig({
    appName: "Your App Name",
    walletConnectProjectId,
    chains,
  }),
);



export function Providers({ children, themeProps }: ProvidersProps) {
  const queryClient = new QueryClient();

  return (
    <WagmiConfig config={config}>
      <QueryClientProvider client={queryClient}>
      <ConnectKitProvider >
          <NextUIProvider>
            <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
          </NextUIProvider>
          <ConnectKitButton />
      </ConnectKitProvider>
      </QueryClientProvider>
    </WagmiConfig>
  );
}
