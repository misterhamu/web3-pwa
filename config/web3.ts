import { Chain } from "wagmi";

export const ariseChain: Chain = {
    id: 4833,
    name: 'Arise Testnet',
    nativeCurrency: {
        decimals: 18,
		name: 'Arise',
		symbol: 'Arise',
    },
	rpcUrls: {
		public: {
			http: ['https://aster-rpc-nonprd.arisetech.dev'],
		},
		default: {
			http: ['https://aster-rpc-nonprd.arisetech.dev'],
		},
	},
	

	blockExplorers:{
		default: { name: "SnowTrace", url: "https://snowtrace.io" },

	},
    testnet: true,
}