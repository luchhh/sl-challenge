export interface Card {
  _id: string;
  name: string;
  imageUrl: string;
  count: {
    total: number;
  };
}
