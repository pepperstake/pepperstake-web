import { createClient, Provider } from "urql";

const client = createClient({
  url: process.env.NEXT_PUBLIC_SUBGRAPH_URL as string,
});

export const UrqlProvider = ({ children }) => {
  return <Provider value={client}>{children}</Provider>;
};
