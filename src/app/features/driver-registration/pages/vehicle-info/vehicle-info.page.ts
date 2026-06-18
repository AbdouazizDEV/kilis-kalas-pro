import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular/standalone';
import { TranslatePipe } from '@ngx-translate/core';
import { AppBackButtonComponent } from '../../../../shared/ui-kit/app-back-button/app-back-button.component';
import { AppButtonComponent } from '../../../../shared/ui-kit/app-button/app-button.component';
import { AppInputComponent } from '../../../../shared/ui-kit/app-input/app-input.component';
import { DriverRegistrationStateService } from '../../services/driver-registration-state.service';

@Component({
  selector: 'app-vehicle-info',
  standalone: true,
  imports: [
    IonContent,
    ReactiveFormsModule,
    TranslatePipe,
    AppBackButtonComponent,
    AppButtonComponent,
    AppInputComponent,
  ],
  templateUrl: './vehicle-info.page.html',
  styleUrls: ['./vehicle-info.page.scss'],
})
export class VehicleInfoPage {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly registrationState = inject(DriverRegistrationStateService);

  readonly draft = this.registrationState.draft$();

  readonly form = this.fb.nonNullable.group({
    vehicleBrand: [this.draft.vehicleBrand, Validators.required],
    vehicleModel: [this.draft.vehicleModel, Validators.required],
    vehiclePlate: [this.draft.vehiclePlate, Validators.required],
    vehicleColor: [this.draft.vehicleColor, Validators.required],
    vehicleYear: [this.draft.vehicleYear?.toString() ?? ''],
  });

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const raw = this.form.getRawValue();
    this.registrationState.setVehicleInfo({
      vehicleBrand: raw.vehicleBrand,
      vehicleModel: raw.vehicleModel,
      vehiclePlate: raw.vehiclePlate.toUpperCase(),
      vehicleColor: raw.vehicleColor,
      vehicleYear: raw.vehicleYear ? Number(raw.vehicleYear) : null,
    });
    this.router.navigate(['/driver-registration/profile-photo']);
  }
}
