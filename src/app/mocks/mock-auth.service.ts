import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { IAuthService } from '../core/interfaces/i-auth.service';
import { AuthResult, LoginCredentials, RegisterData, ResetPasswordData } from '../models/auth.model';
import { mockDelay, shouldSimulateError } from './mock-delay';

@Injectable()
export class MockAuthService implements IAuthService {
  login(credentials: LoginCredentials): Observable<AuthResult> {
    if (shouldSimulateError(0.08)) {
      return throwError(() => new Error('Erreur réseau simulée')).pipe(mockDelay());
    }
    return of({
      success: true,
      requiresOtp: !!credentials.phone,
      token: credentials.phone ? undefined : 'mock-jwt-token',
      userId: 'driver-001',
      message: 'Connexion initiée',
    }).pipe(mockDelay());
  }

  register(data: RegisterData): Observable<AuthResult> {
    if (shouldSimulateError(0.05)) {
      return throwError(() => new Error('Inscription impossible')).pipe(mockDelay());
    }
    return of({
      success: true,
      requiresOtp: false,
      userId: `driver-${Date.now()}`,
      message: `Inscription de ${data.firstName} en cours`,
    }).pipe(mockDelay());
  }

  verifyOtp(phone: string, code: string): Observable<AuthResult> {
    const isValid = code.length === 4;
    return of({
      success: isValid,
      token: isValid ? 'mock-jwt-token' : undefined,
      userId: isValid ? 'driver-001' : undefined,
      message: isValid ? 'OTP validé' : 'Code OTP invalide',
    }).pipe(mockDelay(400, 900));
  }

  forgotPassword(identifier: string): Observable<void> {
    return of(void 0).pipe(mockDelay(300, 800));
  }

  resetPassword(data: ResetPasswordData): Observable<AuthResult> {
    const isValid = data.password.length >= 6 && data.code.length === 4;
    return of({
      success: isValid,
      message: isValid ? 'Mot de passe mis à jour' : 'Impossible de réinitialiser le mot de passe',
    }).pipe(mockDelay());
  }

  logout(): Observable<void> {
    return of(void 0).pipe(mockDelay(200, 500));
  }
}
