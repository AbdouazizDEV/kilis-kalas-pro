import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent, IonText } from '@ionic/angular/standalone';
import { TranslatePipe } from '@ngx-translate/core';
import { AppButtonComponent } from '../../../../shared/ui-kit/app-button/app-button.component';
import { AppInputComponent } from '../../../../shared/ui-kit/app-input/app-input.component';
import { DriverRegistrationStateService } from '../../../driver-registration/services/driver-registration-state.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    IonContent,
    IonText,
    ReactiveFormsModule,
    TranslatePipe,
    AppButtonComponent,
    AppInputComponent,
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
    firstName: ['', [Validators.required, Validators.minLength(2)]],
    lastName: ['', [Validators.required, Validators.minLength(2)]],
    phone: ['', [Validators.required, Validators.pattern(/^(\+221)?[0-9]{9}$/)]],
    email: ['', [Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required]],
  });

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { confirmPassword, ...data } = this.form.getRawValue();
    if (data.password !== confirmPassword) {
      this.errorMessage.set('DRIVER.REGISTER.PASSWORD_MISMATCH');
      return;
    }

    this.loading.set(true);
    this.errorMessage.set('');
    this.registrationState.updateAccount(data);
    this.loading.set(false);
    this.router.navigate(['/driver-registration/transport-mode']);
  }
}
