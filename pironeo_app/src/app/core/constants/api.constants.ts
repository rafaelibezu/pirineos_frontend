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
  }

} as const;