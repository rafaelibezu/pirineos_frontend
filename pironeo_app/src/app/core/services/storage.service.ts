import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  set<T>(
    key: string,
    value: T
  ): void {

    localStorage.setItem(
      key,
      JSON.stringify(value)
    );
  }

  get<T>(
    key: string
  ): T | null {

    const value =
      localStorage.getItem(key);

    if (!value) {
      return null;
    }

    try {

      return JSON.parse(value) as T;

    } catch {

      return null;
    }
  }

  setString(
    key: string,
    value: string
  ): void {

    localStorage.setItem(
      key,
      value
    );
  }

  getString(
    key: string
  ): string | null {

    return localStorage.getItem(key);
  }

  remove(
    key: string
  ): void {

    localStorage.removeItem(key);
  }

  clear(): void {

    localStorage.clear();
  }
}