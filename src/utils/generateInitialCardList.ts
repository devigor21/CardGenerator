import { generateCard } from './generateCard';
import type { Card } from '../types/card';

export const generateInitialCardList = (): Card[] => {
  const cardList: Card[] = [];

  for (let i = 0; i < 10; i++) {
    cardList.push(generateCard());
  }

  return cardList;
};
