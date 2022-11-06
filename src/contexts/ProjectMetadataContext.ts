import { BigNumber } from "ethers";
import { createContext } from "react";

export type ProjectMetadataContextType = {
  name: string | undefined;
  description: string | undefined;
  imageUrl: string | undefined;
};

export const ProjectMetadataContext = createContext<ProjectMetadataContextType>({
  name: undefined,
  description: undefined,
  imageUrl: undefined,
});
