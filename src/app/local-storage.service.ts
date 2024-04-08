import { Injectable } from '@angular/core';
import * as jose from 'jose'
@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  getItem(key: string): string | null {
    return localStorage.getItem(key);
  }

  setItem(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }
  getUsuario(): string {
    const token = this.getItem('JWT_TOKEN');
    if (token) {
      const decode = jose.decodeJwt(token);
      return (decode['role'] as string)
    } else {
      return 'null'
    }
  }
}
