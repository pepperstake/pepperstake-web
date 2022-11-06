import namehash from "eth-ens-namehash";
import { ethers } from "ethers";
import { findAddresses } from "utils/address";
import { readProvider } from "constants/provider";

const REVERSE_RECORD_CONTRACT_ADDRESS = {
  ropsten: "0x5bBFe410e18DCcaebbf5fD7A00844d4255615258",
  rinkeby: "0x196eC7109e127A353B709a20da25052617295F6f",
  goerli: "0x333Fc8f550043f239a2CF79aEd5e9cF4A20Eb41e",
  mainnet: "0x3671aE578E63FdF66ad4F3E12CC0c0d71Ac7510C",
};

const abi = [
  "function getNames(address[] calldata addresses) external view returns (string[] memory r)",
];

const provider = readProvider;

export const ensReverseLookup = async (
  address: string
): Promise<string | null> => {
  try {
    const ensName = await provider.lookupAddress(address);
    return ensName;
  } catch (error) {
    return null;
  }
};

export const ensReverseLookupMany = async (addresses: string[]) => {
  const reverseRecords = new ethers.Contract(
    REVERSE_RECORD_CONTRACT_ADDRESS["goerli"],
    abi,
    provider
  );
  const allNames = await reverseRecords.getNames(addresses);
  const validNames = allNames.filter(
    (n: string) => namehash.normalize(n) === n
  );
  // zip the names and addresses together so we can look them up by address
  const ensMap = addresses.reduce((acc, address, index) => {
    acc[address] = validNames[index];
    return acc;
  }, {});
  return ensMap;
};

export const replaceAddressWithEns = async (text: string) => {
  const addresses = findAddresses(text);
  const ensMap = await ensReverseLookupMany(addresses);
  const formattedText = text.replace(/0x[a-fA-F0-9]{40}/g, (address) =>
    ensMap[address] !== "" ? ensMap[address] : address
  );
  return formattedText;
};
