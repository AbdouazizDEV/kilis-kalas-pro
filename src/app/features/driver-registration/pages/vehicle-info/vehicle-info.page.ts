import { Component, computed, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular/standalone';
import { TranslatePipe } from '@ngx-translate/core';
import { AppBackButtonComponent } from '../../../../shared/ui-kit/app-back-button/app-back-button.component';
import {
  AppColorPaletteComponent,
  ColorPaletteOption,
} from '../../../../shared/ui-kit/app-color-palette/app-color-palette.component';
import { AppPillButtonComponent } from '../../../../shared/ui-kit/app-pill-button/app-pill-button.component';
import { AppRegistrationProgressComponent } from '../../../../shared/ui-kit/app-registration-progress/app-registration-progress.component';
import { DriverRegistrationStateService } from '../../services/driver-registration-state.service';

const MOTO_BRANDS = ['Yamaha', 'Honda', 'TVS', 'Bajaj', 'Suzuki', 'Autre'];
const CAR_BRANDS = ['Toyota', 'Hyundai', 'Peugeot', 'Renault', 'Mercedes', 'Autre'];

const VEHICLE_COLORS: ColorPaletteOption[] = [
  { id: 'red', hex: '#E53935', label: 'Rouge' },
  { id: 'black', hex: '#212121', label: 'Noir' },
  { id: 'white', hex: '#FAFAFA', label: 'Blanc' },
  { id: 'blue', hex: '#1E88E5', label: 'Bleu' },
  { id: 'green', hex: '#43A047', label: 'Vert' },
  { id: 'yellow', hex: '#FDD835', label: 'Jaune' },
  { id: 'gray', hex: '#9E9E9E', label: 'Gris' },
  { id: 'orange', hex: '#FB8C00', label: 'Orange' },
  { id: 'brown', hex: '#6D4C41', label: 'Marron' },
  { id: 'silver', hex: '#B0BEC5', label: 'Argent' },
];

function resolveColorId(color: string): string {
  if (!color) {
    return '';
  }
  const byId = VEHICLE_COLORS.find((option) => option.id === color);
  if (byId) {
    return color;
  }
  return VEHICLE_COLORS.find((option) => option.label === color)?.id ?? '';
}

@Component({
  selector: 'app-vehicle-info',
  standalone: true,
  imports: [
    IonContent,
    ReactiveFormsModule,
    TranslatePipe,
    AppBackButtonComponent,
    AppPillButtonComponent,
    AppRegistrationProgressComponent,
    AppColorPaletteComponent,
  ],
  templateUrl: './vehicle-info.page.html',
  styleUrls: ['./vehicle-info.page.scss'],
})
export class VehicleInfoPage {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly registrationState = inject(DriverRegistrationStateService);

  readonly registrationStep = 4;
  readonly totalSteps = 5;
  readonly colorOptions = VEHICLE_COLORS;

  readonly transportMode = computed(() => this.registrationState.draft$().transportMode);

  readonly brandOptions = computed(() =>
    this.transportMode() === 'moto' ? MOTO_BRANDS : CAR_BRANDS,
  );

  readonly form = this.fb.nonNullable.group({
    vehiclePlate: [this.registrationState.draft$().vehiclePlate, Validators.required],
    vehicleBrand: [this.registrationState.draft$().vehicleBrand, Validators.required],
    vehicleModel: [this.registrationState.draft$().vehicleModel, Validators.required],
    vehicleColor: [resolveColorId(this.registrationState.draft$().vehicleColor), Validators.required],
  });

  selectedColorHex(): string {
    const colorId = this.form.controls.vehicleColor.value;
    return VEHICLE_COLORS.find((color) => color.id === colorId)?.hex ?? '#eeeded';
  }

  transportLabelKey(): string {
    return this.transportMode() === 'moto' ? 'DRIVER.TRANSPORT.MOTO' : 'DRIVER.TRANSPORT.VOITURE';
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const raw = this.form.getRawValue();
    const colorLabel = VEHICLE_COLORS.find((color) => color.id === raw.vehicleColor)?.label ?? '';

    this.registrationState.setVehicleInfo({
      vehiclePlate: raw.vehiclePlate.toUpperCase(),
      vehicleBrand: raw.vehicleBrand,
      vehicleModel: raw.vehicleModel,
      vehicleColor: colorLabel,
    });

    this.router.navigate(['/driver-registration/insurance-photo']);
  }
}
