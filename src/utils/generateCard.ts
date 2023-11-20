import { generateRandomText } from './generateRandomText';
import type { Card } from '../types/card';

export const generateCard = (): Card => {
  const fields: string[] = [];

  for (let i = 0; i < 5; i++) {
    fields.push(generateRandomText());
  }

  return {
    id: generateRandomText(),
    fields,
    lastUpdate: 0,
    intervalId: null,
  };
};
