import { environment } from '../../../environments/environment';

export const API_URL = environment.apiUrl;

export const API_ENDPOINTS = {

  AUTH: {
    LOGIN: `${API_URL}/auth/login`
  },

  DASHBOARD: {
    ADMIN: `${API_URL}/dashboard/admin`,
    WAITER: `${API_URL}/dashboard/waiter`
  },

  USERS: {
    BASE: `${API_URL}/users`,
    WAITERS: `${API_URL}/users/waiters`
  },

  CASH_REGISTERS: {
    BASE: `${API_URL}/cash-registers`,
    ACTIVE: `${API_URL}/cash-registers/active`
  },

  SHIFTS: {
    BASE: `${API_URL}/shifts`,
    ACTIVE: `${API_URL}/shifts/active`
  },

  DISTRIBUTORS: {
    BASE: `${API_URL}/distributors`,
    ACTIVE: `${API_URL}/distributors/active`
  }

} as const;
