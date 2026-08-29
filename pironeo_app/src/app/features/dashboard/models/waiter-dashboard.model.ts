export interface WaiterDashboardModel {
  todaySales: number;
  todayPayments: number;
  pendingClosing: boolean;
  lastClosingDate?: string;
}
