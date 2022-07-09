import { useMemo } from 'react';
import words from '../words';

const mulberry32 = (seed: number) => {
  let t = seed += 0x6D2B79F5;
  t = Math.imul(t ^ t >>> 15, t | 1);
  t ^= t + Math.imul(t ^ t >>> 7, t | 61);
  return ((t ^ t >>> 14) >>> 0) / 4294967296;
}

const useDailyWord = () => {
  const word = useMemo(() => {
    const seed = Math.floor(new Date().getTime() / 86400000) * 86400000;
    return words[Math.floor(mulberry32(seed) * words.length)]
  }, [])

  return word;
}

export default useDailyWord;