export const BANGLADESH_DIVISIONS = [
  'Dhaka',
  'Chattogram',
  'Rajshahi',
  'Khulna',
  'Barishal',
  'Sylhet',
  'Rangpur',
  'Mymensingh',
] as const;

export type BangladeshDivision = (typeof BANGLADESH_DIVISIONS)[number];

export const SHIPPING_RATES = {
  INSIDE_DHAKA_MINOR: 6000, // ৳60.00 in poisha
  OUTSIDE_DHAKA_MINOR: 12000, // ৳120.00 in poisha
  FREE_SHIPPING_THRESHOLD_MINOR: 200000, // ৳2000.00 in poisha
} as const;

export function takaToPoisha(taka: number): number {
  return Math.round(taka * 100);
}

export function poishaToTaka(poisha: number | bigint): number {
  return Number(poisha) / 100;
}

export function formatTaka(poisha: number | bigint): string {
  const taka = poishaToTaka(poisha);
  return `৳${taka.toLocaleString('en-BD', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
}
