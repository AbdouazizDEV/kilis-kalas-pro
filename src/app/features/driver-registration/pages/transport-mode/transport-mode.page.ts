import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonCol, IonContent, IonGrid, IonRow, IonText } from '@ionic/angular/standalone';
import { TranslatePipe } from '@ngx-translate/core';
import { AppBackButtonComponent } from '../../../../shared/ui-kit/app-back-button/app-back-button.component';
import { AppPillButtonComponent } from '../../../../shared/ui-kit/app-pill-button/app-pill-button.component';
import { AppTransportOptionCardComponent } from '../../../../shared/ui-kit/app-transport-option-card/app-transport-option-card.component';
import { TransportMode } from '../../../../models/vehicle.model';
import { DriverRegistrationStateService } from '../../services/driver-registration-state.service';

interface TransportOptionConfig {
  mode: TransportMode;
  iconSrc: string;
  labelKey: string;
  brandLine1Key: string;
  brandLine2Key: string;
  flipIcon?: boolean;
}

@Component({
  selector: 'app-transport-mode',
  standalone: true,
  imports: [
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonText,
    TranslatePipe,
    AppBackButtonComponent,
    AppPillButtonComponent,
    AppTransportOptionCardComponent,
  ],
  templateUrl: './transport-mode.page.html',
  styleUrls: ['./transport-mode.page.scss'],
})
export class TransportModePage implements OnInit {
  private readonly router = inject(Router);
  private readonly registrationState = inject(DriverRegistrationStateService);

  readonly options: TransportOptionConfig[] = [
    {
      mode: 'moto',
      iconSrc: 'assets/icon/Motorcycle.png',
      labelKey: 'DRIVER.TRANSPORT.MOTO',
      brandLine1Key: 'DRIVER.TRANSPORT.MOTO_BRAND_LINE1',
      brandLine2Key: 'DRIVER.TRANSPORT.MOTO_BRAND_LINE2',
    },
    {
      mode: 'taxi',
      iconSrc: 'assets/icon/Vehicle.png',
      labelKey: 'DRIVER.TRANSPORT.VOITURE',
      brandLine1Key: 'DRIVER.TRANSPORT.VOITURE_BRAND_LINE1',
      brandLine2Key: 'DRIVER.TRANSPORT.VOITURE_BRAND_LINE2',
      flipIcon: true,
    },
  ];

  selectedMode: TransportMode | null = this.registrationState.draft$().transportMode;

  ngOnInit(): void {
    if (!this.selectedMode) {
      this.selectMode('moto');
    }
  }

  selectMode(mode: TransportMode): void {
    this.selectedMode = mode;
    this.registrationState.setTransportMode(mode);
  }

  continue(): void {
    if (!this.selectedMode) {
      return;
    }
    this.router.navigate(['/driver-registration/profile-photo']);
  }
}
