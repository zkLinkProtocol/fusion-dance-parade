import bignumber from 'bignumber.js';
import { formatUnits } from 'viem';

export function findClosestMultiplier(
  arr: {
    multiplier: number;
    timestamp: number;
  }[],
) {
  const currentTime = Date.now();
  let closestMultiplier = null;
  let timeDiff = Infinity;

  for (let i = 0; i < arr.length; i++) {
    const { timestamp, multiplier } = arr[i];
    const diff = currentTime - timestamp * 1000;

    if (diff > 0 && diff < timeDiff) {
      timeDiff = diff;
      closestMultiplier = multiplier;
    }
  }

  return closestMultiplier;
}

export function isSameAddress(a: string, b: string) {
  return a && b && a.toLowerCase() === b.toLowerCase();
}

export function formatBalance(balance: bigint, decimals: number, fixed: number = 8) {
  const v = new bignumber(new bignumber(formatUnits(balance ?? BigInt(0), decimals)).toFixed(fixed, 1)).toNumber(); //use 1 to round_down
  return v;
}
