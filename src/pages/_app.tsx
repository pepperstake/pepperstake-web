import "../styles/global.css";
import "@rainbow-me/rainbowkit/styles.css";
import type { AppProps } from "next/app";
import Layout from "../components/layout";
import "tailwindcss/tailwind.css";

import {
  RainbowKitProvider,
  getDefaultWallets,
  connectorsForWallets,
} from "@rainbow-me/rainbowkit";
import {
  argentWallet,
  trustWallet,
  ledgerWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import UrqlProvider from "providers/urqlProvider";
import ReactQueryProvider from "providers/ReactQueryProvider";

const { chains, provider, webSocketProvider } = configureChains(
  [chain.goerli],
  [alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY })]
);

const { wallets } = getDefaultWallets({
  appName: "RainbowKit demo",
  chains,
});

const demoAppInfo = {
  appName: "Rainbowkit Demo",
};

const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: "Other",
    wallets: [
      argentWallet({ chains }),
      trustWallet({ chains }),
      ledgerWallet({ chains }),
    ],
  },
]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UrqlProvider>
      <ReactQueryProvider>
        <WagmiConfig client={wagmiClient}>
          <RainbowKitProvider appInfo={demoAppInfo} chains={chains}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </RainbowKitProvider>
        </WagmiConfig>
      </ReactQueryProvider>
    </UrqlProvider>
  );
}

export default MyApp;
