import { JsonRpcBatchProvider } from "@ethersproject/providers";

export const readProvider = new JsonRpcBatchProvider(
  process.env.NEXT_PUBLIC_GOERLI_RPC_PROVIDER_URL,
  "goerli"
);
