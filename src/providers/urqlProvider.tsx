import { PropsWithChildren } from "react";
import { createClient, Provider } from "urql";

const client = createClient({
  url: process.env.NEXT_PUBLIC_SUBGRAPH_URL as string,
});

export default function UrqlProvider({ children }: PropsWithChildren<{}>) {
  return <Provider value={client}>{children}</Provider>;
}
