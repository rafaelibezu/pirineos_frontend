export interface AdminDashboardSummary {
  totalClosings: number;

  totalSales: number;
  totalManual: number;

  totalCash: number;
  totalDeclaredVisa: number;
  totalRealPos: number;

  totalDistributorPayments: number;

  totalCashDifference: number;
  totalPosDifference: number;
  totalDifference: number;
}

export interface DashboardShift {
  shiftId: number;
  shiftCode: string;
  shiftName: string;

  totalClosings: number;

  totalSales: number;
  totalManual: number;
  totalCash: number;
  totalPayments: number;
}

export interface DashboardCashRegister {
  cashRegisterId: number;
  cashRegisterCode: string;
  cashRegisterName: string;

  totalClosings: number;

  totalSales: number;
  totalCash: number;
  totalDifference: number;
}

export interface DashboardWaiter {
  waiterId: number;
  waiterName: string;

  totalClosings: number;

  totalSales: number;
  totalManual: number;

  cashDifference: number;
  posDifference: number;
  totalDifference: number;
}

export interface DashboardDistributor {
  distributorId: number;
  distributorName: string;

  totalInvoices: number;
  totalPaid: number;
}

export interface AdminDashboard {
  from: string;
  to: string;

  summary: AdminDashboardSummary;

  shifts: DashboardShift[];

  cashRegisters: DashboardCashRegister[];

  waiters: DashboardWaiter[];

  distributors: DashboardDistributor[];
}