import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular/standalone';
import { TranslatePipe } from '@ngx-translate/core';
import { firstValueFrom } from 'rxjs';
import { IDriverRegistrationService } from '../../../../core/interfaces/i-driver-registration.service';
import { DRIVER_REGISTRATION_SERVICE } from '../../../../core/tokens/driver-registration.token';
import { AppBackButtonComponent } from '../../../../shared/ui-kit/app-back-button/app-back-button.component';
import { AppPillButtonComponent } from '../../../../shared/ui-kit/app-pill-button/app-pill-button.component';
import { DriverRegistrationPayload } from '../../../../models/driver.model';
import { DriverRegistrationStateService } from '../../services/driver-registration-state.service';

interface ConfettiPiece {
  left: number;
  delay: number;
  duration: number;
  rotate: number;
  drift: number;
  color: string;
  width: number;
  height: number;
  shape: 'rect' | 'circle';
}

const CONFETTI_COLORS = ['#10B981', '#34D399', '#FDD835', '#1E88E5', '#FB8C00', '#E53935', '#43A047'];

@Component({
  selector: 'app-registration-complete',
  standalone: true,
  imports: [IonContent, TranslatePipe, AppBackButtonComponent, AppPillButtonComponent],
  templateUrl: './registration-complete.page.html',
  styleUrls: ['./registration-complete.page.scss'],
})
export class RegistrationCompletePage {
  private readonly router = inject(Router);
  private readonly registrationService = inject<IDriverRegistrationService>(DRIVER_REGISTRATION_SERVICE);
  readonly registrationState = inject(DriverRegistrationStateService);

  readonly loading = signal(false);
  readonly errorMessage = signal('');
  readonly confettiPieces = this.buildConfetti();

  get firstName(): string {
    return this.registrationState.draft$().firstName || '';
  }

  get welcomeName(): string {
    return this.firstName || 'Chauffeur';
  }

  async finish(): Promise<void> {
    if (this.loading()) {
      return;
    }

    this.loading.set(true);
    this.errorMessage.set('');

    try {
      await this.submitIfNeeded();
    } catch {
      this.errorMessage.set('DRIVER.COMPLETE.ERROR');
    }

    await this.router.navigate(['/driver/home'], { replaceUrl: true });
    this.loading.set(false);
  }

  private async submitIfNeeded(): Promise<void> {
    const d = this.registrationState.draft$();

    if (d.driverId || !d.transportMode) {
      return;
    }

    const payload: DriverRegistrationPayload = {
      firstName: d.firstName,
      lastName: d.lastName,
      phone: d.phone,
      email: d.email || undefined,
      password: d.password || undefined,
      transportMode: d.transportMode,
      nationalIdFront: d.nationalIdFront ?? undefined,
      nationalIdBack: d.nationalIdBack ?? undefined,
      licenseFront: d.licenseFront ?? undefined,
      licenseBack: d.licenseBack ?? undefined,
      insuranceDocument: d.insuranceDocument ?? undefined,
      vehicleBrand: d.vehicleBrand,
      vehicleModel: d.vehicleModel,
      vehiclePlate: d.vehiclePlate,
      vehicleColor: d.vehicleColor,
      vehicleYear: d.vehicleYear ?? undefined,
      profilePhoto: d.profilePhoto ?? undefined,
    };

    const result = await firstValueFrom(this.registrationService.submitDocuments(payload));
    if (result.success && result.driverId) {
      this.registrationState.setDriverId(result.driverId);
    }
  }

  private buildConfetti(): ConfettiPiece[] {
    return Array.from({ length: 56 }, (_, index) => ({
      left: (index * 17 + (index % 5) * 11) % 100,
      delay: (index % 9) * 0.055,
      duration: 2.4 + (index % 7) * 0.22,
      rotate: (index * 47) % 360,
      drift: ((index % 2 === 0 ? 1 : -1) * (18 + (index % 6) * 7)),
      color: CONFETTI_COLORS[index % CONFETTI_COLORS.length],
      width: 5 + (index % 4) * 2,
      height: 8 + (index % 5) * 2,
      shape: index % 3 === 0 ? 'circle' : 'rect',
    }));
  }
}
