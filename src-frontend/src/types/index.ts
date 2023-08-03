export interface SnakeCardUpdate {
  id: string;
  stage: number;
  bid: number;
  previousId: string;
}

export interface SnakeCardData {
  id: string;
  stage: number;
  bids: Array<number>;
  hasInitialized: boolean;
}
