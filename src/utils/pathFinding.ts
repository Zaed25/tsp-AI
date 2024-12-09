import { City } from '../types';

export const calculateDistance = (city1: City, city2: City): number => {
  const dx = (city1.x - city2.x) * 100;
  const dy = (city1.y - city2.y) * 100;
  return Math.sqrt(dx * dx + dy * dy);
};

