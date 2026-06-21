import { Component, inject, signal } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonCheckbox,
  IonCol,
  IonContent,
  IonGrid,
  IonLabel,
  IonRow,
  IonText,
} from '@ionic/angular/standalone';
import { TranslatePipe } from '@ngx-translate/core';
import { AppBackButtonComponent } from '../../../../shared/ui-kit/app-back-button/app-back-button.component';
import { AppInputComponent } from '../../../../shared/ui-kit/app-input/app-input.component';
import { AppPillButtonComponent } from '../../../../shared/ui-kit/app-pill-button/app-pill-button.component';
import { DriverRegistrationStateService } from '../../../driver-registration/services/driver-registration-state.service';

function contactValidator(control: AbstractControl): ValidationErrors | null {
  const value = (control.value as string)?.trim();
  if (!value) {
    return null;
  }

  const isPhone = /^(\+221)?[\d\s-]{9,}$/.test(value);
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  return isPhone || isEmail ? null : { contactInvalid: true };
}

function fullNameValidator(control: AbstractControl): ValidationErrors | null {
  const parts = (control.value as string)?.trim().split(/\s+/).filter(Boolean);
  return parts && parts.length >= 2 ? null : { fullNameInvalid: true };
}

function splitFullName(fullName: string): { firstName: string; lastName: string } {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) {
    return { firstName: '', lastName: '' };
  }
  if (parts.length === 1) {
    return { firstName: parts[0], lastName: parts[0] };
  }
  return {
    firstName: parts[0],
    lastName: parts.slice(1).join(' '),
  };
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonText,
    IonCheckbox,
    IonLabel,
    ReactiveFormsModule,
    TranslatePipe,
    AppBackButtonComponent,
    AppInputComponent,
    AppPillButtonComponent,
  ],
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly registrationState = inject(DriverRegistrationStateService);

  readonly loading = signal(false);
  readonly errorMessage = signal('');

  readonly form = this.fb.nonNullable.group({
    fullName: ['', [Validators.required, Validators.minLength(3), fullNameValidator]],
    contact: ['', [Validators.required, contactValidator]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required]],
    acceptTerms: [false, [Validators.requiredTrue]],
  });

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { confirmPassword, contact, fullName, ...rest } = this.form.getRawValue();
    if (rest.password !== confirmPassword) {
      this.errorMessage.set('DRIVER.REGISTER.PASSWORD_MISMATCH');
      return;
    }

    const trimmedContact = contact.trim();
    const isPhone = /^(\+221)?[\d\s-]{9,}$/.test(trimmedContact);
    const { firstName, lastName } = splitFullName(fullName);

    this.loading.set(true);
    this.errorMessage.set('');
    this.registrationState.updateAccount({
      firstName,
      lastName,
      phone: isPhone ? trimmedContact.replace(/\s/g, '') : '',
      email: isPhone ? '' : trimmedContact,
      password: rest.password,
    });
    this.loading.set(false);
    this.router.navigate(['/driver-registration/transport-mode']);
  }
}
