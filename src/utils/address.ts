export function findAddresses(text: string): string[] {
  const addresses = text.match(/0x[a-fA-F0-9]{40}/g);
  return addresses ? addresses : [];
}
