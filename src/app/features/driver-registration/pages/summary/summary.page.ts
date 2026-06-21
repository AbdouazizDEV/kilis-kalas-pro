import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent, IonText } from '@ionic/angular/standalone';
import { TranslatePipe } from '@ngx-translate/core';
import { firstValueFrom } from 'rxjs';
import { DRIVER_REGISTRATION_SERVICE } from '../../../../core/tokens/driver-registration.token';
import { AppAvatarComponent } from '../../../../shared/ui-kit/app-avatar/app-avatar.component';
import { AppBackButtonComponent } from '../../../../shared/ui-kit/app-back-button/app-back-button.component';
import { AppButtonComponent } from '../../../../shared/ui-kit/app-button/app-button.component';
import { AppCardComponent } from '../../../../shared/ui-kit/app-card/app-card.component';
import { DriverRegistrationPayload } from '../../../../models/driver.model';
import { DriverRegistrationStateService } from '../../services/driver-registration-state.service';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [
    IonContent,
    IonText,
    TranslatePipe,
    AppAvatarComponent,
    AppBackButtonComponent,
    AppButtonComponent,
    AppCardComponent,
  ],
  templateUrl: './summary.page.html',
  styleUrls: ['./summary.page.scss'],
})
export class SummaryPage {
  private readonly router = inject(Router);
  private readonly registrationService = inject(DRIVER_REGISTRATION_SERVICE);
  readonly registrationState = inject(DriverRegistrationStateService);

  readonly loading = signal(false);
  readonly errorMessage = signal('');

  readonly draft = this.registrationState.draft$;

  transportLabelKey(): string {
    const mode = this.draft().transportMode;
    const map: Record<string, string> = { moto: 'MOTO', taxi: 'VOITURE' };
    return mode ? `DRIVER.TRANSPORT.${map[mode]}` : '';
  }

  async submit(): Promise<void> {
    const d = this.draft();
    if (!d.transportMode) {
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

    this.loading.set(true);
    this.errorMessage.set('');

    try {
      const result = await firstValueFrom(this.registrationService.submitDocuments(payload));
      if (result.success && result.driverId) {
        this.registrationState.setDriverId(result.driverId);
        this.router.navigate(['/verification-pending'], { replaceUrl: true });
      } else {
        this.errorMessage.set(result.message ?? 'DRIVER.SUMMARY.ERROR');
      }
    } catch {
      this.errorMessage.set('DRIVER.SUMMARY.ERROR');
    } finally {
      this.loading.set(false);
    }
  }
}
