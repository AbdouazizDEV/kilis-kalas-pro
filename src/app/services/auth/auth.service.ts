import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { IAuthService } from '../../core/interfaces/i-auth.service';
import { AuthResult, LoginCredentials, RegisterData, ResetPasswordData } from '../../models/auth.model';

@Injectable()
export class AuthService implements IAuthService {
  login(credentials: LoginCredentials): Observable<AuthResult> {
    return throwError(() => new Error('AuthService: backend NestJS non disponible'));
  }

  register(data: RegisterData): Observable<AuthResult> {
    return throwError(() => new Error('AuthService: backend NestJS non disponible'));
  }

  verifyOtp(phone: string, code: string): Observable<AuthResult> {
    return throwError(() => new Error('AuthService: backend NestJS non disponible'));
  }

  forgotPassword(identifier: string): Observable<void> {
    return throwError(() => new Error('AuthService: backend NestJS non disponible'));
  }

  resetPassword(data: ResetPasswordData): Observable<AuthResult> {
    return throwError(() => new Error('AuthService: backend NestJS non disponible'));
  }

  logout(): Observable<void> {
    return throwError(() => new Error('AuthService: backend NestJS non disponible'));
  }
}
