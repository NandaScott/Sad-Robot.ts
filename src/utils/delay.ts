/**
 * Basic delay function to make delays easy.
 * @param ms delay in miliseconds
 * @returns A promise that resolves after N miliseconds
 */
export default function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
