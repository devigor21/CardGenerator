import type { Card } from './card';

export type CardStackParamList = {
  CardList: undefined;
  CardDetail: { card: Card; lastUpdate: number };
};
