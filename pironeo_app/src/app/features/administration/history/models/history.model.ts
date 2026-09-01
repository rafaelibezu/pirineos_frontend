export type HistoryItemType =
  | 'MOVEMENT'
  | 'TRANSFER'
  | 'CLOSING';

export interface HistoryItem {
  id: number;
  type: HistoryItemType;
  date: string;
  userId: number;
  userName: string;
  title: string;
  description: string;
  amount: number;
  difference: number | null;
}

export interface History {
  from: string;
  to: string;
  userId: number | null;
  items: HistoryItem[];
}
