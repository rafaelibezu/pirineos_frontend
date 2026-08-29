export type ClosingStatus = 'DRAFT' | 'FINALIZED';

export interface WaiterDashboardSummary {
  totalClosingsToday: number;
  totalSales: number;
  totalManual: number;
  totalPayments: number;

  cashDifference: number;
  posDifference: number;
  totalDifference: number;

  hasPendingClosing: boolean;
}

export interface WaiterClosing {
  closingId: number;
  closingAt: string;

  shiftId: number;
  shiftName: string;

  cashRegisterId: number;
  cashRegisterName: string;

  zClosing: number;
  manualAmount: number;
  declaredVisa: number;
  totalPayments: number;

  cashTotal: number;
  realPos: number;

  cashDifference: number;
  posDifference: number;
  totalDifference: number;

  status: ClosingStatus;
}

export interface WaiterMovement {
  movementId: number;
  movementAt: string;

  movementType: 'INCOME' | 'PAYMENT';

  concept: string;

  account: string;
  accountName: string;

  beneficiary?: string | null;

  amount: number;

  shiftName: string;
}

export interface WaiterTransfer {
  transferId: number;
  transferAt: string;

  shiftName: string;

  sourceCashRegisterId: number;
  sourceCashRegisterName: string;

  destinationCashRegisterId: number;
  destinationCashRegisterName: string;

  amount: number;

  reason?: string | null;
}

export interface WaiterDashboard {
  date: string;

  waiterId: number;
  waiterName: string;

  summary: WaiterDashboardSummary;

  todayClosings: WaiterClosing[];
  recentClosings: WaiterClosing[];
  recentMovements: WaiterMovement[];
  recentTransfers: WaiterTransfer[];
}
